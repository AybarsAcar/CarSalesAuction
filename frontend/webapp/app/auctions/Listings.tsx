'use client';

import AuctionCard from "@/app/auctions/AuctionCard";
import {AppPagination} from "@/app/components/AppPagination";
import {getData} from "@/app/actions/auctionActions";
import {useEffect, useState} from "react";
import {Auction, PagedResult} from "@/types";
import Filters from "@/app/auctions/Filters";
import {useParamStore} from "@/hooks/useParamStore";
import {useShallow} from "zustand/react/shallow";
import qs from "query-string"
import {EmptyFilter} from "@/app/components/EmptyFilter";


export default function Listings() {

    const [data, setData] = useState<PagedResult<Auction>>();

    const params = useParamStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner,
    })));

    const setParams = useParamStore(state => state.setParams);

    const url = qs.stringifyUrl({url: "", query: params}, {skipEmptyString: true});

    const setPageNumber = (pageNumber: number) => {
        setParams({pageNumber: pageNumber})
    }

    /**
     * executed when pageNumber changes
     */
    useEffect(() => {
        getData(url).then(data => {
            setData(data);
        })
    }, [url])

    if (!data) {
        return <h3>Loading...</h3>
    }

    return (
        <>
            <Filters/>

            {data && data.totalCount === 0 ? (
                <EmptyFilter showReset={true}/>
            ) : (
                <>
                    <div className="grid grid-cols-4 gap-6">
                        {data && data.results.map(auction => (
                            <AuctionCard key={auction.id} auction={auction}/>
                        ))}
                    </div>

                    <div className="flex justify-center mt-4">
                        <AppPagination
                            pageChanged={setPageNumber}
                            currentPage={params.pageNumber}
                            pageCount={data.pageCount}
                        />
                    </div>
                </>
            )}
        </>
    );
}
