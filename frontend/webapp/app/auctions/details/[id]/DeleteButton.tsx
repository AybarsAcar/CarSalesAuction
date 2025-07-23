"use client";

import {useState} from "react";
import {deleteAuction} from "@/app/actions/auctionActions";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {Button, Spinner} from "flowbite-react";

type Props = {
    id: string,
}

export function DeleteButton({id}: Props) {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false)

    function handleDelete() {
        setLoading(true);
        deleteAuction(id)
            .then((res) => {
                if (res.error) {
                    throw res.error;
                }
                router.push("/");
            })
            .catch((err) => {
                toast.error(err.status + " " + err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Button outline color="red" onClick={handleDelete} disabled={loading}>
            {loading && <Spinner size="sm" className="mr-3"/>}
            Delete Auction
        </Button>
    );
}
