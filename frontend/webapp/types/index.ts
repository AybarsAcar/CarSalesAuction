export type PagedResult<T> = {
    results: T[];
    pageCount: number;
    totalCount: number;
}

export interface Auction {
    reservePrice?: number;
    seller: string;
    winner?: string;
    soldAmount?: number;
    currentHighBid?: number;
    createdAt: string;
    updatedAt: string;
    auctionEnd: string;
    status: string;
    make: string;
    model: string;
    year: number;
    colour: string;
    mileage: number;
    imageUrl: string;
    id: string;
}
