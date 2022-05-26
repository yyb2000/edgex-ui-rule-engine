import * as Config from '@/config'
import axios from 'axios'

/**
 * 封装post请求
 * @param path
 * @param data
 * @param success
 * @param error
 * @param final
 */
export const post = function (path, data, success, error, final) {
    let result = axios
        .post(path, data, Config.config)
        .then(res => {
            if (res.status.toString().startsWith('2')) {
                success(res.data)
            } else {
                error(res?.statusText)
                throw res?.statusText
            }
        })
        .catch(err => {
            error(err?.message)
            throw err?.message
        })
        .finally(() => {
            if (typeof final === 'function') final()
        })

    return result
}

/**
 * 封装get请求
 * @param path
 * @param data
 * @param success
 * @param error
 * @param final
 */
export const get = function (path, data, success, error, final) {
    let result = axios
        .get(path, Config.config)
        .then(res => {
            if (res.status.toString().startsWith('2')) {
                success(res.data)
            } else {
                error(res?.statusText)
                throw res?.statusText
            }
        })
        .catch(err => {
            error(err?.message)
            throw err?.message
        })
        .finally(() => {
            if (typeof final === 'function') final()
        })

    return result
}

/**
 * 封装delete请求
 * @param path
 * @param data
 * @param success
 * @param error
 * @param final
 */
export const delete1 = function (path, success, error, final) {
    let result = axios
        .delete(path, Config.config)
        .then(res => {
            if (res.status.toString().startsWith('2')) {
                success(res.data)
            } else {
                error(res?.statusText)
                throw res?.statusText
            }
        })
        .catch(err => {
            error(err?.message)
            throw err?.message
        })
        .finally(() => {
            if (typeof final === 'function') final()
        })

    return result
}

/**
 * 封装put请求
 * @param path
 * @param data
 * @param success
 * @param error
 * @param final
 */
export const put = function (path, data, success, error, final) {
    let config = {
        body: data,
        responseType: 'text',
        headers: {
            'Content-type': 'application/json',
            Authorization: Config.config.headers.Authorization
        }
    }
    let result = axios
        .put(path, data,config)
        .then(res => {
            if (res.status.toString().startsWith('2')) {
                success(res.data)
            } else {
                error(res?.statusText)
                throw res?.statusText
            }
        })
        .catch(err => {
            error(err?.message)
            throw err?.message
        })
        .finally(() => {
            if (typeof final === 'function') final()
        })

    return result
}
