"use client";

import {Button} from "flowbite-react";
import {signIn} from "next-auth/react";

export function LoginButton() {

    const onLoginButtonClicked = () => {
        signIn("id-server", {redirectTo: "/"}, {prompt: "login"});
    }

    return (
        <Button outline onClick={onLoginButtonClicked}>
            Login
        </Button>
    );
}
