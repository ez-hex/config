# @ez-hex/config

Load Config from any place and merge it into one.

## Install

``` bash
npm install --save @ez-hex/config
# or
yarn add @ez-hex/config
```

## Usage

### Base

``` typescript
interface MyConfig {
    // defined your config struct
    keyA: string
    keyB: number
    keyC: boolean
}
// config is Partial<MyConfig>
const config = loadConfig<MyConfig>(defaultLoader({
    keyA: 'default A',
    keyC: false,
}), jsonLoader('./simple.json'), envLoader('AAA_'))

// config is MyConfig
const config = loadConfigWithDefault<MyConfig>({
    keyA: 'default A',
    keyB: 1,
    keyC: false,
}, jsonLoader('./simple.json'), envLoader('AAA_'))
```

### Implement Your Own Loader

There are two type: `SyncLoader` and `AsyncLoader`

``` typescript
type Loader<T> = SyncLoader<T> | AsyncLoader<T>
type SyncLoader<T> = () => Partial<T>
type AsyncLoader<T> = () => Promise<Partial<T>>
```

If all args of `loadConfig` or `loadConfigWithDefault` is `SyncLoader`, then return the value directly, else your will get a Promise.

``` typescript
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

// config is Promise<Partial<T>>
const config = loadConfig<Config>(jsonLoader('./simple.json'), envLoader('AAA_'), load_with_async_fs<Config>('./aaa'))

// config2 is Promise<T>
const config2 = loadConfigWithDefault<MyConfig>({
    keyA: 'default A',
    keyB: 1,
    keyC: false,
}, jsonLoader('./simple.json'), envLoader('AAA_'), load_with_async_fs<Config>('./aaa'))
```

### Loaders

#### defaultLoader

> `SyncLoader`

It just return the argument

#### envLoaderr

> `SyncLoader`

It will load all env which has special prefix and parse the value with `JSON.parse`

``` typescript
// env.js
const result = envLoaderr('A_')()
console.log(result)
```

``` bash
A_KEYA=aaa node env.js
# {KEYA: "aaa"}
```

#### jsonLoaderr

> `SyncLoader`

load the file and parse the content with `JSON.parse`
