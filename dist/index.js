"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightyAuth = void 0;
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
class LightyAuth {
    constructor(params) {
        this.clientId = params.clientId;
        this.clientSecret = params.clientSecret;
        this.redirectUri = params.redirectUri;
    }
    getAuthUrl(scope = "openid email profile") {
        const params = querystring_1.default.stringify({
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            response_type: "code",
            scope,
            access_type: "offline",
            prompt: "consent",
        });
        return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    }
    async getToken(code) {
        const url = "https://oauth2.googleapis.com/token";
        const body = querystring_1.default.stringify({
            code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            grant_type: "authorization_code",
        });
        const { data } = await axios_1.default.post(url, body, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        return data;
    }
    async fetchUser(accessToken) {
        const url = "https://openidconnect.googleapis.com/v1/userinfo";
        const { data } = await axios_1.default.get(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return data;
    }
}
exports.LightyAuth = LightyAuth;
//# sourceMappingURL=index.js.map