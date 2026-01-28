import { defineEventHandler } from "h3";
import { pool } from "../db";

export default defineEventHandler(async () => {
    const result = await pool.query(
        "SELECT id, pseudo, best_score FROM users"
    );

    return result.rows;
});
