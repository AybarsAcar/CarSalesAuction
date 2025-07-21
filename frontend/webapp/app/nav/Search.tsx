"use client";

import {FaSearch} from "react-icons/fa";
import {useParamStore} from "@/hooks/useParamStore";
import {ChangeEvent, useEffect, useState} from "react";

export function Search() {

    const setParams = useParamStore(state => state.setParams);
    const searchTerm = useParamStore(state => state.searchTerm);

    const [value, setValue] = useState("");

    useEffect(() => {
        if (searchTerm == "") {
            setValue("");
        }
    }, [searchTerm])

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    function handleSearch() {
        setParams({searchTerm: value});
    }

    return (
        <div className="flex w-[50%] items-center border-2 border-gray-300 rounded-full py-2 shadow-sm">

            <input
                onChange={handleInputChange}
                value={value}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}

                type="text"
                placeholder="Search for cars by make, model, or colour"
                className="flex-grow pl-5 bg-transparent focus:outline-none border-transparent focus:border-transparent focus:ring-0 text-sm text-gray-600"
            />

            <button onClick={handleSearch}>
                <FaSearch size={34} className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"/>
            </button>

        </div>
    );
}
