'use server';

import {Auction, PagedResult} from "@/types";
import {httpClient} from "@/lib/fetchWrapper";
import {FieldValues} from "react-hook-form";

export async function getData(query: string): Promise<PagedResult<Auction>> {
    return await httpClient.get(`search${query}`);
}

export async function createAuction(data: FieldValues) {
    return await httpClient.post('auctions', data);
}

/**
 * Test update http request
 * should return 200 when logged in as bob Pass123$
 * should return unauthorised 401 when logged in as alice Pass123$
 */
export async function updateAuctionTest(): Promise<{ status: number, message: string }> {

    const data = {
        mileage: Math.floor(Math.random() * 10000) + 1,
    }

    const urlString = "auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c";

    return await httpClient.put(urlString, data);
}