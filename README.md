# LightyAuth

LightyAuth is a simple, lightweight wrapper around **Google OAuth 2.0** that makes it easy to authenticate users in your app.  
It handles generating the authorization URL, exchanging authorization codes for access tokens, and fetching user profile data.

---

##  Features

- Simple Google OAuth 2.0 integration
- Get user profile data with minimal setup
- TypeScript support
- Promise-based API
- Ideal for backend integrations and Express apps

---

##  Installation

```bash
npm install lighty-auth
```
or
```bash
yarn add lighty-auth
```

---

##  Usage

### 1. Initialize LightyAuth

```ts
import LightyAuth from "lighty-auth";

const auth = new LightyAuth({
  clientId: "YOUR_GOOGLE_CLIENT_ID",
  clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
  redirectUri: "http://localhost:3000/auth/callback",
});
```

---

### 2. Get Authorization URL

Redirect users to the authorization URL so they can grant access.

```ts
const url = auth.getAuthUrl();
console.log("Visit:", url);
```

When users log in and consent, Google redirects them to your `redirectUri` with a `code` parameter.

---

### 3. Exchange Code for Token

Use the code from the callback to obtain an access token.

```ts
const tokenData = await auth.getToken("AUTH_CODE_FROM_CALLBACK");
console.log(tokenData);
```

This returns an object similar to:
```json
{
  "access_token": "ya29.a0AfH6SM...",
  "expires_in": 3599,
  "refresh_token": "1//0gdf2w...",
  "scope": "openid email profile",
  "token_type": "Bearer"
}
```

---

### 4. Fetch User Info

Once you have the access token, retrieve user information.

```ts
const user = await auth.fetchUser(tokenData.access_token);
console.log(user);
```

Example response:
```json
{
  "sub": "1029384756",
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "picture": "https://lh3.googleusercontent.com/a-/AOh14GgXx.jpg"
}
```

---

##  How It Works

1. You create an OAuth Client in your Google Cloud Console.
2. Initialize `LightyAuth` with your client credentials.
3. Redirect users to the Google login page.
4. Google redirects them back with an authorization code.
5. Exchange that code for an access token.
6. Use the access token to fetch user profile data.

---

##  Example Express Setup

```ts
import express from "express";
import LightyAuth from "lighty-auth";

const app = express();
const auth = new LightyAuth({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: "http://localhost:3000/auth/callback",
});

app.get("/auth/google", (req, res) => {
  res.redirect(auth.getAuthUrl());
});

app.get("/auth/callback", async (req, res) => {
  const code = req.query.code as string;
  const token = await auth.getToken(code);
  const user = await auth.fetchUser(token.access_token);
  res.json(user);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

---

##  License

MIT License © 2025 LightyAuth
