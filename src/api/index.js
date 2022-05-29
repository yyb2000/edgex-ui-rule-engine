import * as Config from '@/config'
import {post, get, delete1, put} from '@/api/http-request' // eslint-disable-line no-unused-vars

const endpoint = '/rules-engine';
const version = '';
const urlPrefixV2 = `${Config.HTTP_SERVER}${endpoint}${version}`;
const pingUrl = `${urlPrefixV2}/ping`;
const streamUrl = `${urlPrefixV2}/streams`;
const ruleUrl = `${urlPrefixV2}/rules`;

export function allStreams(success, error, final) {
    return get(streamUrl, null, success, error, final)
}

export function ping(success, error, final) {
    return get(pingUrl, null, success, error, final)
}

export function addStream(streamSql, success, error, final) {
    let body = JSON.stringify(
        {
            'sql': streamSql
        }
    )

    return post(
        `${streamUrl}`,
        body,
        res => {
            console.log(res)
        },
        err => {
            console.log('addStream error:', err)
            error(err)
            throw err
        },
        final
    )
}

export function deleteOneStreamById(id, success, error, final) {
    let url = `${streamUrl}/${id}`;
    return delete1(
        url,
        res => {
            console.log(res)
        },
        err => {
            console.log('deleteOneStreamById error:', err);
            error(err);
            throw err
        },
        final
    )
}

export function updateStream(sqlformatOfStreamData, streamNameOrID, success, error, final) {
    let body = JSON.stringify(
        {
            'sql': sqlformatOfStreamData
        }
    )

    let url = `${streamUrl}/${streamNameOrID}`;
    return put(
        url,
        body,
        res => {
            console.log(res)
        },
        err => {
            console.log('updateStream error:', err)
            error(err)
            throw err
        },
        final
    )
}

export function findStreamByName(name, success, error, final) {
    let url = `${streamUrl}/${name}`;
    return get(url, null, success, error, final)
}

export function addRule(rule, success, error, final) {
    return post(
        `${ruleUrl}`,
        rule,
        res => {
            res = res[0]
            if (res.statusCode.toString().startsWith('2')) {
                success(res)
            } else {
                error(res?.message)
                throw res?.message
            }
        },
        err => {
            console.log('addStream error:', err)
            error(err)
            throw err
        },
        final
    )
}

export function deleteOneRuleById(id, success, error, final) {
    let url = `${ruleUrl}/${id}`;
    return delete1(
        url,
        res => {
            console.log(res)
        },
        err => {
            console.log('deleteOneStreamById error:', err);
            error(err);
            throw err
        },
        final
    )
}

export function allRules(success, error, final) {
    return get(ruleUrl, null, success, error, final)
}

export function getRuleStatusMetricsById(id, success, error, final) {
    let url = `${ruleUrl}/${id}/status`;
    return get(url, null, success, error, final)
}

export function startRule(id, success, error, final) {
    let url = `${ruleUrl}/${id}/start`;
    return post(
        url,
        null,
        res => {
            res = res[0]
            if (res.statusCode.toString().startsWith('2')) {
                success(res)
            } else {
                error(res?.message)
                throw res?.message
            }
        },
        err => {
            console.log('startRule error:', err)
            error(err)
            throw err
        },
        final
    )
}

export function restartRule(id, success, error, final) {
    let url = `${ruleUrl}/${id}/restart`;
    return post(
        url,
        null,
        res => {
            res = res[0]
            if (res.statusCode.toString().startsWith('2')) {
                success(res)
            } else {
                error(res?.message)
                throw res?.message
            }
        },
        err => {
            console.log('restartRule error:', err)
            error(err)
            throw err
        },
        final
    )
}

export function stopRule(id, success, error, final) {
    let url = `${ruleUrl}/${id}/stop`;
    return post(
        url,
        null,
        res => {
            res = res[0]
            if (res.statusCode.toString().startsWith('2')) {
                success(res)
            } else {
                error(res?.message)
                throw res?.message
            }
        },
        err => {
            console.log('stopRule error:', err)
            error(err)
            throw err
        },
        final
    )
}

export function findRuleById(id, success, error, final) {
    let url = `${ruleUrl}/${id}`;
    return get(url, null, success, error, final)
}

export function updateRule(rule, success, error, final) {
    let url = `${ruleUrl}/${rule.id}`;
    return put(
        url,
        JSON.stringify(rule),
        res => {
            res = res[0]
            if (res.statusCode.toString().startsWith('2')) {
                success(res)
            } else {
                error(res?.message)
                throw res?.message
            }
        },
        err => {
            console.log('updateRule error:', err)
            error(err)
            throw err
        },
        final
    )
}

export function getRuleTopoById(id, success, error, final) {
    let url = `${ruleUrl}/${id}/topo`;
    return get(url, null, success, error, final)
}

export class SinkBaseProperties {
    constructor(concurrency, bufferLength, runAsync, retryInterval, retryCount, cacheLength, cacheSaveInterval, omitIfEmpty, sendSingle, dataTemplate ) {
        this.concurrency = concurrency
        this.bufferLength = bufferLength
        this.runAsync = runAsync
        this.retryInterval = retryInterval
        this.retryCount = retryCount
        this.cacheLength = cacheLength
        this.cacheSavaInterval = cacheSaveInterval
        this.omitIfEmpty = omitIfEmpty
        this.sendSingle = sendSingle
        this.dataTemplate = dataTemplate
    }
}

// export class Sink {
//
//     uuid?: string, // kuiper's sink model doesn't have a uuid,here designed by EdgeXGUI, used as an assistant for array operation.
//     mqtt: MQTTSink,
//     log: LogSink,
//     nop: NopSink,
// }

// export class MQTTSink extends SinkBaseProperties {
//
//
//     server: string,
//     topic: string,
//     clientId: string,
//     protocolVersion: string,
//     username: string,
//     password: string,
//     qos: number,
//     retained: boolean,
//
//     certificationPath: string,
//     privateKeyPath: string,
//     rootCaPath: string,
//     insecureSkipVerify: boolean,
//
//     connectionSelector: string,
// }

export class LogSink extends SinkBaseProperties {
    constructor() {
        super();
    }
}

// export class NopSink extends SinkBaseProperties {
//     log: boolean //true/false - print the sink result to log or not. By default is false, that will not print the result to log file.
// }




