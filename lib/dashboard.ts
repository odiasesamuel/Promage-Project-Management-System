import db from "./db";

export const getMetrics = () => {
    const stmt = db.prepare('SELECT * FROM metric');
    return stmt.all();
}

