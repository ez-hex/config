import { loadConfig, envLoader, jsonLoader, defaultLoader, loadConfigWithDefault } from '..'
import { readFile } from 'fs'

interface Config {
    // defined your config struct
    keyA: string
    keyB: number
    keyC: boolean
}

const config = loadConfig<Config>(defaultLoader({
    keyA: 'default A',
    keyB: 1,
    keyC: false,
}), jsonLoader('./simple.json'), envLoader('AAA_'))

function load_with_async_fs<T>(path: string): () => Promise<T> {
    return () => {
        return new Promise<T>((resolve, reject) => {
            readFile(path, 'utf-8', (err, data) => {
                try {
                    resolve(JSON.parse(data))
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
}

const config2 = loadConfig<Config>(jsonLoader('./simple.json'), envLoader('AAA_'), load_with_async_fs<Config>('./aaa'))
const config3 = loadConfigWithDefault<Config>({
    keyA: 'default A',
    keyB: 1,
    keyC: false,
}, jsonLoader('./simple.json'), envLoader('AAA_'), load_with_async_fs<Config>('./aaa'))
