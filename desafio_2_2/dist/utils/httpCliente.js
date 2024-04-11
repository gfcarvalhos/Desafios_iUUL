"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = void 0;
/**
 * Chamada da API utilizando fetch
 */
class httpClient {
    get(url, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return fetch(`${url}/${params[0]}/pair/${params[1]}/${params[2]}`)
                .then((response) => { return response.json(); })
                .catch((err) => { return err; });
        });
    }
}
exports.httpClient = httpClient;
