"use client"

import {FieldValues, useForm} from "react-hook-form";
import {Button, Spinner} from "flowbite-react";
import {useRouter} from "next/navigation";
import {Input} from "@/app/components/Input";
import {useEffect} from "react";
import {DateInput} from "@/app/components/DateInput";
import {createAuction} from "@/app/actions/auctionActions";
import toast from "react-hot-toast";

export function AuctionForm() {

    const router = useRouter();

    const {control, handleSubmit, setFocus, formState: {isSubmitting, isValid, isDirty}} = useForm({
        mode: "onTouched"
    });

    useEffect(() => {
        setFocus("make");
    }, [setFocus]);

    async function onSubmit(data: FieldValues) {
        try {
            const res = await createAuction(data);

            if (res.error) {
                throw new Error(res.error);
            }

            router.push(`/auctions/details/${res.id}`);

        } catch (e: any) {
            toast.error(e.status + " " + e.message);
        }
    }

    return (
        <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>

            <Input label="Make" name="make" control={control} rules={{required: "Make is required"}}/>

            <Input label="Model" name="model" control={control} rules={{required: "Model is required"}}/>

            <Input label="Colour" name="colour" control={control} rules={{required: "Colour is required"}}/>

            <Input label="Image URL" name="imageUrl" control={control} rules={{required: "Image URL is required"}}/>


            <div className="grid grid-cols-2 gap-3">

                <Input label="Year" name="year" type="number" control={control} rules={{required: "Year is required"}}/>
                <Input label="Mileage" name="mileage" type="number" control={control}
                       rules={{required: "Mileage is required"}}/>

            </div>

            <div className="grid grid-cols-2 gap-3">

                <Input label="Reserve Price (enter 0 if no reserve)" type="number" name="reservePrice" control={control}
                       rules={{required: "Reserve Price is required"}}/>

                <DateInput
                    label="Auction End"
                    name="auctionEnd"
                    control={control}

                    showTimeSelect
                    dateFormat="dd MMM yyyy h:mm a"
                />

            </div>


            <div className="flex justify-between">
                <Button color="alternative" onClick={() => router.push("/")}>
                    Cancel
                </Button>

                <Button outline color="green" type="submit" disabled={!isValid || !isDirty || isSubmitting}>
                    {isSubmitting && <Spinner size="sm"/>}
                    Submit
                </Button>
            </div>

        </form>
    )
        ;
}
