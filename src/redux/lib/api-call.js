import axios from 'axios';

export default class Api {
    static getBaseURL() {
        return '';
    }
    static async headers() {
        //const state = store.getState() as { user: { firebaseToken: string}};
        //const token = state.user.firebaseToken;
        return {
            //'Authorization': 'Bearer '+ token,
            'Content-Type': 'application/json'
        };
    }

    static get(route, params = null) {
        return this.xhr(route, params, 'GET');
    }

    static post(route, params) {
        return this.xhr(route, params, 'POST');
    }

    static put(route, params) {
        return this.xhr(route, params, 'PUT');
    }

    static patch(route, params) {
        return this.xhr(route, params, 'PATCH');
    }

    static delete(route, params) {
        return this.xhr(route, params, 'DELETE');
    }

    static encodeUrlParams(url, params) {
        let paramString = '';
        // console.log('params',params);
        if (params && params.length > 0) {
            params.forEach((param, index) => {
                paramString += (index > 0) ? '&' + param.key + '=' + param.value : '?' + param.key + '=' + param.value
            })
        }
        url += paramString;
        return url;
    }

    static async xhr(route, params, verb){

        let url = Api.getBaseURL() + route;
        if (verb === 'GET' && params) {
            url = this.encodeUrlParams(url, params);
            params = null;
        }
        const headers = await Api.headers();
        let options;

        options = Object.assign({ method: verb, headers: headers, url: url }, params ? { data: params } : null);
        return axios(options).then(resp => {
            const header = resp.headers;
            if (resp.status === 200 || resp.status === 201 || resp.status === 204) {
                return resp;
            } else {
                throw resp;
            }
        }).catch(error => {
            throw error;
        });
    }
}