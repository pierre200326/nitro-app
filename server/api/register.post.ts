import { pool } from "../db";
import { createError, defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { pseudo, mdp } = body;

        if (!pseudo || !mdp) {
            throw createError({ statusCode: 400, statusMessage: "Pseudo et mot de passe requis" });
        }

        // 1️⃣ Vérifier si le pseudo existe déjà
        const exists = await pool.query(
            "SELECT 1 FROM users WHERE pseudo = $1 LIMIT 1",
            [pseudo]
        );

        if (exists.rows.length > 0) {
            throw createError({ statusCode: 409, statusMessage: "Pseudo déjà utilisé" });
        }

        // 2️⃣ Insérer le nouvel utilisateur
        const result = await pool.query(
            "INSERT INTO users (pseudo, mdp) VALUES ($1, $2) RETURNING id, pseudo, best_score",
            [pseudo, mdp]
        );

        return result.rows[0];
    } catch (err: any) {
        console.error('Erreur API /user :', err);
        // Si c'est déjà une erreur h3 créée, renvoyer telle quelle
        if (err.statusCode) throw err;
        throw createError({ statusCode: 500, statusMessage: "Server Error" });
    }
});
