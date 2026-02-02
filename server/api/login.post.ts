import { defineEventHandler, readBody, createError } from "h3";
import { pool } from "../db"; // ← utilise ton fichier db.ts

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { pseudo, mdp } = body;

    if (!pseudo || !mdp) {
        throw createError({ statusCode: 400, statusMessage: "Pseudo et mdp requis" });
    }

    try {
        // utilise le pool existant
        const result = await pool.query(
            "SELECT id, pseudo, mdp FROM users WHERE pseudo = $1",
            [pseudo]
        );

        if (result.rowCount === 0 || result.rows[0].mdp !== mdp) {
            throw createError({ statusCode: 401, statusMessage: "Utilisateur ou mot de passe incorrect" });
        }

        const user = result.rows[0];
        delete user.mdp; // ne jamais renvoyer le mot de passe

        return user;
    } catch (err) {
        console.error("Erreur API /login :", err);
        throw createError({ statusCode: 500, statusMessage: "Server Error" });
    }
});
