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
    return post(
        `${streamUrl}`,
        streamSql,
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

export function deleteOneStreamById(id, success, error, final) {
    let url = `${streamUrl}/${id}`;
    return delete1(
        url,
        res => {
            res = res[0];
            if (res.statusCode.toString().startsWith('2')) {
                success(res)
            } else {
                error(res?.message);
                throw res?.message
            }
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
    let url = `${streamUrl}/${streamNameOrID}`;
    return put(
        url,
        sqlformatOfStreamData,
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
            res = res[0];
            if (res.statusCode.toString().startsWith('2')) {
                success(res)
            } else {
                error(res?.message);
                throw res?.message
            }
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





