import { defineEventHandler, readBody, createError } from "h3";
import pg from "pg";

const { Client } = pg;

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { pseudo, mdp } = body;

    if (!pseudo || !mdp) {
        throw createError({ statusCode: 400, statusMessage: "Pseudo et mdp requis" });
    }

    // Crée un client pour chaque requête
    const client = new Client({
        connectionString:
            process.env.DATABASE_URL ||
            "postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require",
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();

        const result = await client.query(
            "SELECT id, pseudo, best_score, mdp FROM users WHERE pseudo = $1",
            [pseudo]
        );

        if (result.rowCount === 0) {
            throw createError({ statusCode: 401, statusMessage: "Utilisateur ou mot de passe incorrect" });
        }

        const user = result.rows[0];

        if (user.mdp !== mdp) {
            throw createError({ statusCode: 401, statusMessage: "Utilisateur ou mot de passe incorrect" });
        }

        delete user.mdp;

        return user;
    } catch (err) {
        console.error("Erreur API /login :", err);
        throw createError({ statusCode: 500, statusMessage: "Server Error" });
    } finally {
        await client.end(); // ferme la connexion
    }
});
