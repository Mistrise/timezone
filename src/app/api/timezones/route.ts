import {NextResponse} from "next/server";
const API_KEY = '6ITU12IVND61'

let requests: Record<string, Promise<Response>> = {}
function fetchWithCache(url: string, ttlMs: number) {
    // @ts-ignore
    if (requests[url]) {
        console.log('cache hit')
        return requests[url];
    }
    const fetchRequest = fetch(url).then(res => res.json())
    console.log('fetch')
    requests[url] = fetchRequest;
    fetchRequest.catch(() => {
        delete requests[url];
    })
    setTimeout(() => {
        console.log('cache cleared')
        delete requests[url];
    }, ttlMs)
    return fetchRequest;
}
export async function GET() {
    const data = await fetchWithCache(`http://api.timezonedb.com/v2.1/list-time-zone?key=${API_KEY}&format=json`, 10000)
    return NextResponse.json(data.zones)
}