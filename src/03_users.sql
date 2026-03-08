-- Administrator user
CREATE USER 'laroca'@'localhost' IDENTIFIED BY 'quecocina';
GRANT ALL PRIVILEGES ON *.* TO 'laroca'@'localhost';

-- Application user
CREATE USER 'elwaza'@'localhost' IDENTIFIED BY 'ostias';
GRANT SELECT, INSERT, UPDATE ON membership_park.* TO 'elwaza'@'localhost';

-- Read-only analyst
CREATE USER 'analyst'@'localhost' IDENTIFIED BY 'ayora';
GRANT SELECT ON membership_park.* TO 'analyst'@'localhost';

FLUSH PRIVILEGES;
