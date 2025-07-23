type UpdatePageParams = {
    params: {
        id: Promise<string>;
    }
}

export default async function Update({params}: UpdatePageParams) {

    const id = await params.id;

    return (
        <>Update Auction Page for {await params}</>
    );
}
