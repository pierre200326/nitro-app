import { pool } from "../db";
import { createError, defineEventHandler, readBody, setHeader } from "h3";

export default defineEventHandler(async (event) => {

    setHeader(event, 'Access-Control-Allow-Origin', '*'); // ou ton front : http://127.0.0.1:5500
    setHeader(event, 'Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type');

    // Gérer la préflight request (OPTIONS)
    if (event.req.method === 'OPTIONS') {
        event.res.statusCode = 200;
        return 'OK';
    }

    try {
        const body = await readBody(event);
        const { pseudo, mdp } = body;

        const result = await pool.query(
            "INSERT INTO users (pseudo, mdp) VALUES ($1, $2) RETURNING id, pseudo, best_score",
            [pseudo, mdp]
        );

        return result.rows[0];
    } catch (err) {
        console.error('Erreur API /user :', err);
        throw createError({ statusCode: 500, statusMessage: "Server Error" });
    }
});
