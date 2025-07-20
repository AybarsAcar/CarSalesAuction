import Image from "next/image";

type Props = {
    auction: any
}

export default function AuctionCard({auction}: Props) {
    return (
        <a href="#">
            <div className="relative w-full bg-gray-200 aspect-video rounded-lg overflow-hidden">
                <Image src={auction.imageUrl} alt="Auction Image" fill className="object-cover" />
            </div>
        </a>
    );
}
