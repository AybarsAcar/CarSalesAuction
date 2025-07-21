"use client";

import {AiOutlineCar} from "react-icons/ai";
import {useParamStore} from "@/hooks/useParamStore";

export function Logo() {

    const reset = useParamStore(state => state.reset);

    return (
        <div
            onClick={reset}
            className="flex items-center gap-2 text-3xl font-semibold text-red-500 cursor-pointer"
        >
            <AiOutlineCar size={34}/>
            <div>Car Sales Auctions</div>
        </div>
    );
}
