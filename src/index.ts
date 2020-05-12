import { Loader, SyncLoader, has_promise, is_promise } from './common'
export * from './common'
export * from './loaders/default'
export * from './loaders/json'
export * from './loaders/env'

export function loadConfig<T>(...loaders: SyncLoader<T>[]): Partial<T>
export function loadConfig<T>(...loaders: Loader<T>[]): Promise<Partial<T>>
export function loadConfig<T>(...loaders: Loader<T>[]): Partial<T> | Promise<Partial<T>> {
    const configs = loaders.map(x => x())
    if (has_promise<Partial<T>>(configs)) {
        return Promise.all(configs).then(configs => merge<T>(...configs))
    }
    return merge(...configs as Partial<T>[])
}

function merge<T, P = Partial<T>>(full: T, ...configs: P[]): T
function merge<T, P = Partial<T>>(...configs: P[]): P
function merge<T, P = Partial<T>>(...configs: P[]): T | P {
    const config: T = {} as any
    for (const item of configs) {
        Object.assign(config, item)
    }
    return config
}

export function loadConfigWithDefault<T>(defaultValue: T, ...loaders: SyncLoader<T>[]): T
export function loadConfigWithDefault<T>(defaultValue: T, ...loaders: Loader<T>[]): Promise<T>
export function loadConfigWithDefault<T>(defaultValue: T, ...loaders: Loader<T>[]): T | Promise<T> {
    const partial = loadConfig(...loaders)
    if (is_promise(partial)) {
        return partial.then(x => merge(defaultValue, x))
    }
    return merge(defaultValue, partial)
}
