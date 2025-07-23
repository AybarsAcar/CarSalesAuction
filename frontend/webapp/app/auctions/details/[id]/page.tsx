import {getAuctionDetails} from "@/app/actions/auctionActions";
import {Heading} from "@/app/components/Heading";
import CountdownTimer from "@/app/auctions/CountdownTimer";
import CarImage from "@/app/auctions/CarImage";
import {DetailedSpecs} from "@/app/auctions/details/[id]/DetailedSpecs";
import {EditButton} from "@/app/auctions/details/[id]/EditButton";
import {getCurrentUser} from "@/app/actions/authActions";
import {DeleteButton} from "@/app/auctions/details/[id]/DeleteButton";

type DetailsPageParams = {
    params: {
        id: Promise<string>;
    }
}

export default async function Details({params}: DetailsPageParams) {

    const currentAuction = await getAuctionDetails(await params.id)
    const user = await getCurrentUser();

    return (
        <>
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <Heading title={`${currentAuction.make} ${currentAuction.model}`}/>
                    {user?.username === currentAuction.seller && (
                        <>
                            <EditButton id={currentAuction.id}/>
                            <DeleteButton id={currentAuction.id}/>
                        </>
                    )}
                </div>

                <div className="flex gap-3">
                    <h3 className="text-2xl font-semibold">Time remaining:</h3>
                    <CountdownTimer auctionEnd={currentAuction.auctionEnd}/>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-3">
                <div className="relative w-full bg-gray-200 aspect-[4/3] rounded-lg overflow-hidden">
                    <CarImage imageUrl={currentAuction.imageUrl}/>
                </div>
                <div className="border-2 rounded-lg p-2 bg-gray-200">
                    <Heading title="Bids"/>
                </div>
            </div>

            <div className="mt-3 grid grid-cols-1 rounded-lg">
                <DetailedSpecs auction={currentAuction}/>
            </div>
        </>
    );
}
