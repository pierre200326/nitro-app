import { pool } from "../db";
import { createError, defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
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
