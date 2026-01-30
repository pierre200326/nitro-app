import { defineEventHandler, createError } from "h3";
import { pool } from "../db";

export default defineEventHandler(async () => {
    try {
        const result = await pool.query(
            `
      SELECT id, pseudo, best_score
      FROM users
      ORDER BY scoreFR DESC
      LIMIT 10
      `
        );

        return result.rows;
    } catch (err) {
        console.error("Erreur API /users/top :", err);
        throw createError({ statusCode: 500, statusMessage: "Server Error" });
    }
});
