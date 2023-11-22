import pool from "../db/pgPool"
import * as db from "zapatos/db"

export const initDB = async() => {
    db.sql`
        CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name	TEXT NOT NULL,
        score   INTEGER DEFAULT 0
    )`.run(pool)
}