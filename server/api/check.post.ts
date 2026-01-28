import { defineEventHandler, readBody, createError } from "h3";
import { pool } from "../db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { plat, pays } = body;

    if (!plat || !pays) {
        throw createError({
            statusCode: 400,
            statusMessage: "plat et pays requis",
        });
    }

    try {
        const result = await pool.query(
            `
      SELECT id
      FROM plats
      WHERE plat = $1
        AND pays = $2
      LIMIT 1
      `,
            [plat, pays]
        );

        return {
            correct: result.rows.length > 0
        };
    } catch (err) {
        console.error("Erreur API /plats/check :", err);
        throw createError({
            statusCode: 500,
            statusMessage: "Server Error",
        });
    }
});
