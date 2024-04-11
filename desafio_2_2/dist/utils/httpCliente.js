"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = void 0;
class httpClient {
    get(url, params) {
        const response = fetch('https://v6.exchangerate-api.com/v6/846abafcbdf7d8dafdb65df5/pair/EUR/GBP')
            .then((response) => { return response.json(); })
            .then((data) => { console.log(data); })
            .catch((err) => { return err; });
        return response;
    }
}
exports.httpClient = httpClient;
