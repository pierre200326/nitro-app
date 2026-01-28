import { pool } from "../db";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
    const { pseudo, mdp } = await readBody(event);

    const result = await pool.query(
        "INSERT INTO users (pseudo, mdp) VALUES ($1, $2) RETURNING id, pseudo, best_score",
        [pseudo, mdp]
    );

    return result.rows[0];
});
