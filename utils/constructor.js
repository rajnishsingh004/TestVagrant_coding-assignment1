
const obj_payloads = require('../api/info/payload')
class Service {
    constructor(endpoint, method, {needparams = false, params = null, needpayload = false, payload = null}={}) {
        const payload_verbs = ['POST', 'PUT', 'PATCH', 'DELETE'];
        this.endpoint = endpoint;
        this.method = method;
        this.queryParams = params;
        this.needparams = needparams;
        this.needpayload = (payload_verbs.indexOf(method.toUpperCase()) >= 0) ? true : needpayload;
        if (typeof payload === 'string') {
            this.payload = obj_payloads[payload]
        } else {
            this.payload = payload;
        }
    }
}

module.exports = {
    "Service": Service
}