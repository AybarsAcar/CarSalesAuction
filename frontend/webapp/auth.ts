import NextAuth, {Profile} from "next-auth"
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"
import {OIDCConfig} from "@auth/core/providers";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        DuendeIDS6Provider({
            id: "id-server",
            clientId: "nextApp", // this has to match the ClientId in the Config.cs in IdentityService
            clientSecret: "secret",
            issuer: "http://localhost:5001", // this is the IdentityService URL
            authorization: {
                params: {scope: "openid profile auctionApp"}
            },
            idToken: true
        } as OIDCConfig<Profile>)
    ],
});
