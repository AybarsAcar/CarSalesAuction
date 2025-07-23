import NextAuth, {Profile} from "next-auth"
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"
import {OIDCConfig} from "@auth/core/providers";

export const {handlers, signIn, signOut, auth} = NextAuth({
    session: {
        strategy: "jwt"
    },
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
        } as OIDCConfig<Omit<Profile, 'username'>>)
    ],
    callbacks: {

        /**
         * if the user is not authorised they are redirected to the login page
         * if they go to a page they are not authorised
         * @param auth
         */
        async authorized({auth}) {
            return !!auth;
        },

        async jwt({token, profile, account}) {

            if (account && account.access_token) {
                token.accessToken = account.access_token;
            }

            if (profile) {
                token.username = profile.username;
            }

            return token;
        },

        async session({session, token}) {
            if (token) {
                session.user.username = token.username;
                session.accessToken = token.accessToken;
            }

            return session;
        },
    }
});
