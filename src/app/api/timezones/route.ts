import {NextResponse} from "next/server";
const API_KEY = '6ITU12IVND61'
export async function GET() {
    console.log('req is here')
    const data = await fetch(`http://api.timezonedb.com/v2.1/list-time-zone?key=${API_KEY}&format=json`).then(res => res.json())
    return NextResponse.json({ data })
}
