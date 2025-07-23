"use client"

import {Button, Spinner} from "flowbite-react";
import {useState} from "react";
import {updateAuctionTest} from "@/app/actions/auctionActions";

type TestResult = {
    status: number;
    message: string;
}

export function AuthTest() {

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<TestResult | null>(null);

    function handleUpdate() {
        setResult(null);
        setLoading(true);

        updateAuctionTest()
            .then(result => {
                setResult(result);
            })
            .catch(error => {
                setResult(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="flex items-center gap-4">

            <Button onClick={handleUpdate} outline disabled={loading}>
                {loading && <Spinner size="sm" className="me-3" light/>}
                Test Auth
            </Button>

            <div>
                {JSON.stringify(result, null, 2)}
            </div>

        </div>
    );
}
