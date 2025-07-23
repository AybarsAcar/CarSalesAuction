"use client"

import {useParamStore} from "@/hooks/useParamStore";
import {Heading} from "@/app/components/Heading";
import {Button} from "flowbite-react";
import {signIn} from "next-auth/react";

type Props = {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    showLogin?: boolean;
    callbackUrl?: string;
}

export function EmptyFilter(
    {
        title = "No matches for this filter",
        subtitle = "Try changing the filter or search term",
        showReset,
        showLogin,
        callbackUrl,
    }: Props
) {

    const reset = useParamStore(state => state.reset);

    return (
        <div className="flex flex-col items-center justify-center h-[40v] shadow-lg">
            <Heading title={title} subtitle={subtitle} center/>
            <div className="mt-4">

                {showReset && (
                    <Button outline onClick={reset}>
                        Remove filters
                    </Button>
                )}

                {showLogin && (
                    <Button outline onClick={() => signIn("id-server", {redirectTo: callbackUrl})}>
                        Login
                    </Button>
                )}

            </div>
        </div>
    );
}
