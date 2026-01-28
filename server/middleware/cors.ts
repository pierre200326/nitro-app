import { defineEventHandler } from "h3"

// server/middleware/cors.ts
export default defineEventHandler((event) => {
    event.node.res.setHeader('Access-Control-Allow-Origin', '*')
    event.node.res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,DELETE,OPTIONS'
    )
    event.node.res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    )

    if (event.node.req.method === 'OPTIONS') {
        event.node.res.statusCode = 204
        return ''
    }

    return
})