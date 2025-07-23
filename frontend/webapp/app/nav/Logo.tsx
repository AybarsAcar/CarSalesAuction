"use client";

import {AiOutlineCar} from "react-icons/ai";
import {useParamStore} from "@/hooks/useParamStore";
import {usePathname, useRouter} from "next/navigation";

export function Logo() {

    const router = useRouter();
    const pathname = usePathname();

    const reset = useParamStore(state => state.reset);

    function handleReset() {
        if (pathname !== "/") {
            router.push("/");
        }
        reset();
    }

    return (
        <div
            onClick={handleReset}
            className="flex items-center gap-2 text-3xl font-semibold text-red-500 cursor-pointer"
        >
            <AiOutlineCar size={34}/>
            <div>Car Sales Auctions</div>
        </div>
    );
}
