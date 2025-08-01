import {auth} from "@/auth";

const BASE_URL = "http://localhost:6001/";

async function get(urlString: string) {

    const requestOptions = {
        method: "GET",
        headers: await getHeaders()
    };

    const response = await fetch(BASE_URL + urlString, requestOptions);

    return handleResponse(response);
}

async function put(urlString: string, body: unknown) {

    const requestOptions = {
        method: "PUT",
        headers: await getHeaders(),
        body: JSON.stringify(body)
    };

    const response = await fetch(BASE_URL + urlString, requestOptions);

    return handleResponse(response);
}

async function post(urlString: string, body: unknown) {

    const requestOptions = {
        method: "POST",
        headers: await getHeaders(),
        body: JSON.stringify(body)
    };

    const response = await fetch(BASE_URL + urlString, requestOptions);

    return handleResponse(response);
}

async function del(urlString: string) {

    const requestOptions = {
        method: "DELETE",
        headers: await getHeaders(),
    };

    const response = await fetch(BASE_URL + urlString, requestOptions);

    return handleResponse(response);
}

async function getHeaders(): Promise<Headers> {

    const session = await auth();
    const headers = new Headers();

    headers.set("Content-Type", "application/json");

    if (session) {
        headers.set("Authorization", `Bearer ${session.accessToken}`);
    }

    return headers;
}

async function handleResponse(response: Response) {

    const text = await response.text();

    const data = text && JSON.parse(text);

    if (response.ok) {
        return data || response.statusText;
    }

    const error = {
        status: response.status,
        message: response.statusText,
    }

    return {error}
}

export const httpClient = {
    get,
    post,
    put,
    del
}