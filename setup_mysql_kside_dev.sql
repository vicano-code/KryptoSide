CREATE DATABASE IF NOT EXISTS kside_db;
CREATE USER IF NOT EXISTS 'kside'@'localhost' IDENTIFIED BY 'kside_pwd';
GRANT ALL PRIVILEGES ON `kside_db`.* TO 'kside'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'kside'@'localhost';
FLUSH PRIVILEGES;