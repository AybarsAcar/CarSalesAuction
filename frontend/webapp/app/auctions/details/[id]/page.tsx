type DetailsPageParams = {
    params: {
        id: Promise<string>;
    }
}

export default async function Details({params}: DetailsPageParams) {

    const id = await params.id;

    return (
        <div>
            Details for {id}
        </div>
    );
}
