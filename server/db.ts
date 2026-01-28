import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_nu8H0dVKThSP@ep-rapid-haze-agfm8rqz-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    ssl: {
        rejectUnauthorized: false,
    },
});
