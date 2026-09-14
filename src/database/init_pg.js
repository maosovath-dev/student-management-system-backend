require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function initDB() {
    console.log("Connecting to PostgreSQL database...");

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        console.log("Creating tables...");

        // 1. Users
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                password VARCHAR(255) NULL,
                role VARCHAR(20) DEFAULT 'student',
                status VARCHAR(20) DEFAULT 'active',
                is_verified SMALLINT NOT NULL DEFAULT 0,
                avatar_url VARCHAR(500) NULL,
                avatar_public_id VARCHAR(255) NULL,
                token TEXT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 2. OTP Codes
        await client.query(`
            CREATE TABLE IF NOT EXISTS otp_codes (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                otp_code VARCHAR(10) NOT NULL,
                purpose VARCHAR(30) DEFAULT 'email_verify',
                expires_at TIMESTAMP NOT NULL,
                is_used SMALLINT NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 3. Classes
        await client.query(`
            CREATE TABLE IF NOT EXISTS classes (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 4. Students
        await client.query(`
            CREATE TABLE IF NOT EXISTS students (
                id SERIAL PRIMARY KEY,
                user_id INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
                class_id INT DEFAULT NULL REFERENCES classes(id) ON DELETE SET NULL,
                student_code VARCHAR(50) NOT NULL UNIQUE,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                gender VARCHAR(10) NOT NULL,
                date_of_birth DATE,
                phone VARCHAR(20),
                address VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 5. Subjects
        await client.query(`
            CREATE TABLE IF NOT EXISTS subjects (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 6. Class Subjects
        await client.query(`
            CREATE TABLE IF NOT EXISTS class_subjects (
                id SERIAL PRIMARY KEY,
                class_id INT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
                subject_id INT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT unique_class_subject UNIQUE (class_id, subject_id)
            );
        `);

        // 7. Scores
        await client.query(`
            CREATE TABLE IF NOT EXISTS scores (
                id SERIAL PRIMARY KEY,
                student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,
                subject_id INT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE ON UPDATE CASCADE,
                score DECIMAL(5,2) NOT NULL,
                semester VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 8. Attendance
        await client.query(`
            CREATE TABLE IF NOT EXISTS attendance (
                id SERIAL PRIMARY KEY,
                student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,
                class_id INT DEFAULT NULL REFERENCES classes(id) ON DELETE SET NULL,
                date DATE NOT NULL,
                status VARCHAR(10) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT unique_daily_attendance UNIQUE (student_id, date)
            );
        `);

        // Check if admin user exists
        const adminCheck = await client.query("SELECT id FROM users WHERE email = $1", ["admin@gmail.com"]);
        if (adminCheck.rows.length === 0) {
            console.log("Seeding default admin user...");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("admin123", salt);
            await client.query(`
                INSERT INTO users (name, email, password, role, status, is_verified)
                VALUES ($1, $2, $3, $4, $5, $6)
            `, ["Admin", "admin@gmail.com", hashedPassword, "admin", "active", 1]);
            console.log("Admin created: admin@gmail.com / admin123");
        }

        // Check if sample class exists
        const classCheck = await client.query("SELECT id FROM classes LIMIT 1");
        if (classCheck.rows.length === 0) {
            console.log("Seeding sample data (class, subject, student)...");
            const classRes = await client.query(`
                INSERT INTO classes (name, description) VALUES ($1, $2) RETURNING id
            `, ["Year 4 - CS", "Computer Science Year 4 Class"]);
            const classId = classRes.rows[0].id;

            const subjectRes = await client.query(`
                INSERT INTO subjects (name, description) VALUES ($1, $2) RETURNING id
            `, ["Web Development", "Fullstack Web Development with Node & Vue"]);
            const subjectId = subjectRes.rows[0].id;

            await client.query(`
                INSERT INTO class_subjects (class_id, subject_id) VALUES ($1, $2)
            `, [classId, subjectId]);

            await client.query(`
                INSERT INTO students (student_code, first_name, last_name, gender, phone, address, class_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, ["STU001", "Dara", "Sok", "male", "012345678", "Phnom Penh", classId]);

            console.log("Sample data seeded.");
        }

        await client.query("COMMIT");
        console.log("Database initialized successfully!");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Database initialization failed:", error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

if (require.main === module) {
    initDB()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

module.exports = initDB;
