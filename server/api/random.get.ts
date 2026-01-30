import { defineEventHandler, createError } from "h3";
import { pool } from "../db";

export default defineEventHandler(async () => {
    try {
        const result = await pool.query(
            "SELECT id, pays, plat FROM europe ORDER BY RANDOM()"
        );

        if (result.rows.length === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: "Aucun plat trouvé",
            });
        }

        return result.rows; // tableau de plats mélangés
    } catch (err) {
        console.error("Erreur API /plats/random :", err);
        throw createError({
            statusCode: 500,
            statusMessage: "Server Error",
        });
    }
});
