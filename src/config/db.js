const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { Pool } = require('pg');

const rawPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

function convertPlaceholders(sql) {
    let index = 1;
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let result = '';

    for (let i = 0; i < sql.length; i++) {
        const char = sql[i];
        if (char === "'" && !inDoubleQuote) {
            inSingleQuote = !inSingleQuote;
            result += char;
        } else if (char === '"' && !inSingleQuote) {
            inDoubleQuote = !inDoubleQuote;
            result += char;
        } else if (char === '?' && !inSingleQuote && !inDoubleQuote) {
            result += `$${index++}`;
        } else {
            result += char;
        }
    }
    return result;
}

const customQuery = async (sql, params) => {
    let text = sql;
    let values = params;

    if (Array.isArray(values) && values.length > 0) {
        text = convertPlaceholders(text);
    }

    const trimmed = text.trim();
    const isInsert = /^insert\s+into/i.test(trimmed);
    if (isInsert && !/\breturning\b/i.test(trimmed)) {
        text = `${trimmed} RETURNING id`;
    }

    const pgResult = await rawPool.query(text, values);
    const rows = pgResult.rows || [];
    rows.insertId = rows[0]?.id ?? null;
    rows.affectedRows = pgResult.rowCount ?? 0;
    rows.rowCount = pgResult.rowCount ?? 0;

    return [rows, pgResult.fields || []];
};

const pool = new Proxy(rawPool, {
    get(target, prop, receiver) {
        if (prop === 'query') {
            return customQuery;
        }
        if (prop === 'rawPool') {
            return rawPool;
        }
        const val = Reflect.get(target, prop, receiver);
        if (typeof val === 'function') {
            return val.bind(target);
        }
        return val;
    }
});

module.exports = pool;