"use client"

import {FieldValues, useForm} from "react-hook-form";
import {Button, Spinner} from "flowbite-react";
import {usePathname, useRouter} from "next/navigation";
import {Input} from "@/app/components/Input";
import {useEffect} from "react";
import {DateInput} from "@/app/components/DateInput";
import {createAuction, updateAuction} from "@/app/actions/auctionActions";
import toast from "react-hot-toast";
import {Auction} from "@/types";

type Props = {
    auction?: Auction
}

export function AuctionForm({auction}: Props) {

    const router = useRouter();
    const pathname = usePathname();

    const {control, handleSubmit, setFocus, reset, formState: {isSubmitting, isValid, isDirty}} = useForm({
        mode: "onTouched"
    });

    useEffect(() => {
        if (auction) {
            // editing the auction
            const {make, model, colour, mileage, year} = auction;

            // so populate the values
            reset({make, model, colour, mileage, year});
        }

        setFocus("make");
    }, [setFocus, auction, reset]);

    async function onSubmit(data: FieldValues) {
        try {
            let id = "";
            let res;

            if (isCreatePage()) {
                res = await createAuction(data);
                id = res.id;
            } else {
                if (auction) {
                    res = await updateAuction(data, auction.id);
                    id = auction.id;
                }
            }

            if (res.error) {
                throw new Error(res.error);
            }

            router.push(`/auctions/details/${id}`);

        } catch (e: any) {
            toast.error(e.status + " " + e.message);
        }
    }

    function isCreatePage(): boolean {
        return pathname === "/auctions/create"
    }

    return (
        <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>

            <Input label="Make" name="make" control={control} rules={{required: "Make is required"}}/>

            <Input label="Model" name="model" control={control} rules={{required: "Model is required"}}/>

            <Input label="Colour" name="colour" control={control} rules={{required: "Colour is required"}}/>

            <div className="grid grid-cols-2 gap-3">

                <Input label="Year" name="year" type="number" control={control} rules={{required: "Year is required"}}/>
                <Input label="Mileage" name="mileage" type="number" control={control}
                       rules={{required: "Mileage is required"}}/>

            </div>

            {isCreatePage() && (
                <>
                    <Input label="Image URL" name="imageUrl" control={control}
                           rules={{required: "Image URL is required"}}/>

                    <div className="grid grid-cols-2 gap-3">

                        <Input label="Reserve Price (enter 0 if no reserve)" type="number" name="reservePrice"
                               control={control}
                               rules={{required: "Reserve Price is required"}}/>

                        <DateInput
                            label="Auction End"
                            name="auctionEnd"
                            control={control}

                            showTimeSelect
                            dateFormat="dd MMM yyyy h:mm a"
                        />

                    </div>
                    <Input label="Image URL" name="imageUrl" control={control}
                           rules={{required: "Image URL is required"}}/>

                    <div className="grid grid-cols-2 gap-3">

                        <Input label="Reserve Price (enter 0 if no reserve)" type="number" name="reservePrice"
                               control={control}
                               rules={{required: "Reserve Price is required"}}/>

                        <DateInput
                            label="Auction End"
                            name="auctionEnd"
                            control={control}

                            showTimeSelect
                            dateFormat="dd MMM yyyy h:mm a"
                        />

                    </div>
                </>
            )}

            <div className="flex justify-between">
                <Button color="gray" onClick={() => router.push("/")}>
                    Cancel
                </Button>

                <Button outline color="green" type="submit" disabled={!isValid || !isDirty || isSubmitting}>
                    {isSubmitting && <Spinner size="sm"/>}
                    Submit
                </Button>
            </div>

        </form>
    );
}
