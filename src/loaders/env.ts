import { SyncLoader } from '../common'

function parseValue(value: any): any {
    try {
        return JSON.parse(value)
    } catch (e) {
        return value
    }
}
export function envLoader<T>(prefix: string = ''): SyncLoader<T> {
    return () => {
        const config = {} as any
        const prefix_len = prefix.length
        for (const [key, value] of Object.entries(process.env)) {
            if (key.startsWith(prefix)) {
                config[key.slice(prefix_len)] = parseValue(value)
            }
        }
        return config  
    }
}
