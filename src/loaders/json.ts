import * as fs from 'fs'
import { SyncLoader } from '../common'

export function jsonLoader<T>(filename: string): SyncLoader<T> {
    return () => {
        if (!fs.existsSync(filename)) {
            return {}
        }
        try {
            return JSON.parse(fs.readFileSync(filename, 'utf-8'))
        } catch (e) {
            return {}
        }
    }
}
