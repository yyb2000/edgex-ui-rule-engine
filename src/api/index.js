import * as Config from '@/config'
import { post, get } from '@/api/http-request' // eslint-disable-line no-unused-vars

const endpoint = '/rules-engine';
const version = '';
const urlPrefixV2 = `${Config.HTTP_SERVER}${endpoint}${version}`;
const pingUrl = `${urlPrefixV2}/ping`;
const streamUrl = `${urlPrefixV2}/streams`;

export function allStreams(success, error, final) {
    return get(streamUrl,null, success, error, final)
}

export function ping(success, error, final) {
    return get(pingUrl, null, success, error, final)
}


