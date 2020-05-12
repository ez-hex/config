import { SyncLoader } from '../common'

export function defaultLoader<T>(defaultConfig: Partial<T>): SyncLoader<T> {
    return () => {
        return defaultConfig
    }
}
