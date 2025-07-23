import {auth} from "@/auth";

export {auth as middleware} from "@/auth"

export const config = {
    matcher: [
        "/session",
    ],
    pages: {
        signIn : "/api/auth/signin",
    }
}


// export default auth((req) => {
//     if (!req.auth && req.nextUrl.pathname === "/session") {
//         const newUrl = new URL("api/signin", req.nextUrl.origin);
//         return Response.redirect(newUrl);
//     }
// });