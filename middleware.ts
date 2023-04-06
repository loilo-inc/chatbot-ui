import {NextRequest, NextResponse} from "next/server";

const Buffer = require('buffer').Buffer;
const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || "user";
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD || "password";

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === '/api/health_check') {
        return NextResponse.next()
    }

    const basicAuth = req.headers.get("authorization");

    if (basicAuth) {
        const auth = basicAuth.split(" ")[1];
        const [user, password] = Buffer.from(auth, 'base64').toString().split(":");
        if (user === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD) {
            return NextResponse.next();
        }

    }

    return new Response('Auth required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Restricted Area", charset="UTF-8"'
        }
    })

}