interface TokenResponse {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    id_token?: string;
    token_type: string;
}
interface UserProfile {
    sub: string;
    email: string;
    name: string;
    picture: string;
}
export declare class LightyAuth {
    private clientId;
    private clientSecret;
    private redirectUri;
    constructor(params: {
        clientId: string;
        clientSecret: string;
        redirectUri: string;
    });
    getAuthUrl(scope?: string): string;
    getToken(code: string): Promise<TokenResponse>;
    fetchUser(accessToken: string): Promise<UserProfile>;
}
export {};
//# sourceMappingURL=index.d.ts.map