import {Button} from "flowbite-react";
import Link from "next/link";

export function UserActions() {
    return (
        <Button>
            <Link href="/session">Session</Link>
        </Button>
    );
}
