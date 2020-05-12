
export type Loader<T> = SyncLoader<T> | AsyncLoader<T>
export type SyncLoader<T> = () => Partial<T>
export type AsyncLoader<T> = () => Promise<Partial<T>>

export function is_promise<T>(obj: any): obj is Promise<T> {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

export function has_promise<T>(array: Array<Promise<T>|T>): array is Promise<T>[] {
    return array.some(is_promise)
}
