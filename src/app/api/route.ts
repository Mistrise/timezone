import {NextResponse} from "next/server";
const API_KEY = '6ITU12IVND61'

export async function OPTIONS(request: Request) {
    const allowedOrigin = request.headers.get("origin");
    return new NextResponse(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": allowedOrigin || "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
                "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
            "Access-Control-Max-Age": "86400",
        },
    });
}
export async function GET() {
    console.log('req is here')
    const data = await fetch(`https://api.timezonedb.com/v2.1/list-time-zone?key=${API_KEY}&format=json`).then(res => res.json())
    return NextResponse.json({ data })
}
