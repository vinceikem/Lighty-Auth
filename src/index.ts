import axios from "axios";
import querystring from "querystring";

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

export class LightyAuth {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor(params: { clientId: string; clientSecret: string; redirectUri: string }) {
    this.clientId = params.clientId;
    this.clientSecret = params.clientSecret;
    this.redirectUri = params.redirectUri;
  }

  getAuthUrl(scope: string = "openid email profile"): string {
    const params = querystring.stringify({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: "code",
      scope,
      access_type: "offline",
      prompt: "consent",
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  }

  async getToken(code: string): Promise<TokenResponse> {
    const url = "https://oauth2.googleapis.com/token";

    const body = querystring.stringify({
      code,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
      grant_type: "authorization_code",
    });

    const { data } = await axios.post(url, body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return data;
  }

  async fetchUser(accessToken: string): Promise<UserProfile> {
    const url = "https://openidconnect.googleapis.com/v1/userinfo";
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  }
}
