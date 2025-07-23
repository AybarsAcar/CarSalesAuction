import {EmptyFilter} from "@/app/components/EmptyFilter";

/**
 * following is our custom sign in to identity server page to duende
 * @param searchParams params from the url
 * @constructor
 */
export default function SignIn({searchParams}: { searchParams: { callbackUrl: string } }) {
    return (
        <EmptyFilter
            title="You need to be logged in to continue"
            subtitle="Please click below to login"
            showLogin
            callbackUrl={searchParams.callbackUrl}

        />
    );
}
