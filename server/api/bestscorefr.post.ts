import { defineEventHandler, readBody, createError } from "h3";
import { pool } from "../db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { userId, score } = body;

    if (!userId || typeof score !== "number") {
        throw createError({ statusCode: 400, statusMessage: "userId et score requis" });
    }

    try {
        const result = await pool.query(
            `
      UPDATE users
      SET scorefr = GREATEST(scorefr, $1)
      WHERE id = $2
      RETURNING id, pseudo, best_score
      `,
            [score, userId]
        );

        if (result.rows.length === 0) {
            throw createError({ statusCode: 404, statusMessage: "Utilisateur non trouvé" });
        }

        return result.rows[0];
    } catch (err) {
        console.error("Erreur API /user/bestscore :", err);
        throw createError({ statusCode: 500, statusMessage: "Server Error" });
    }
});
