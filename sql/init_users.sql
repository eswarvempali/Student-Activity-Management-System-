-- Initialize database and add static login users
-- Usage:
-- 1) In MySQL Workbench: open this file and run the script.
-- 2) Or from the command line (will prompt for the root password):
--    mysql -u root -p < "sql/init_users.sql"

-- WARNING: This script stores sample passwords only for demo purposes.
-- For production, use a proper password-hashing library (bcrypt) and avoid committing secrets.

CREATE DATABASE IF NOT EXISTS `student_activity_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `student_activity_db`;

-- Users table: stores username, email, role and a SHA-256 password hash
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(60) NOT NULL UNIQUE,
  `email` VARCHAR(150) DEFAULT NULL,
  `role` ENUM('student','admin') NOT NULL DEFAULT 'student',
  `password_hash` CHAR(64) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert demo users (passwords are hashed using MySQL SHA2).
-- Passwords in these INSERT statements are visible in this file; change them before sharing.
INSERT INTO `users` (`username`,`email`,`role`,`password_hash`) VALUES
  ('admin','admin@example.com','admin', SHA2('AdminPass123!',256)),
  ('student1','student1@example.com','student', SHA2('StudentPass1',256)),
  ('student2','student2@example.com','student', SHA2('StudentPass2',256));

-- Optional: create a dedicated DB user for the app (recommended instead of using root)
-- Replace 'change_app_password' with a secure password before running.
-- To skip creating an app user, comment out the following block.
CREATE USER IF NOT EXISTS 'appuser'@'localhost' IDENTIFIED BY 'change_app_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON `student_activity_db`.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;

-- Query example: verify users
-- SELECT id, username, email, role, created_at FROM student_activity_db.users;
