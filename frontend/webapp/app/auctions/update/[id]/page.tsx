import {getAuctionDetails} from "@/app/actions/auctionActions";
import {Heading} from "@/app/components/Heading";
import {AuctionForm} from "@/app/auctions/AuctionForm";

type UpdatePageParams = {
    params: {
        id: Promise<string>;
    }
}

export default async function Update({params}: UpdatePageParams) {

    const currentAuction = await getAuctionDetails(await params.id)

    return (
        <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
            <Heading
                title="Update your auction"
                subtitle="Please update the details of your car (only these auction properties can be updated)"
            />

            <AuctionForm auction={currentAuction}/>
        </div>
    );
}
