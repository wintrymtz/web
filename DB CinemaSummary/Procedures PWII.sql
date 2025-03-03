USE CinemaSum;


-- ---------------------------------------------------------------------------------------------------------------------
-- --------------------------- STORED PROCEDURES PARA EL LOGIN ---------------------------------------------------------
-- ---------------------------------------------------------------------------------------------------------------------

-- 1. Stored Procedure para registrar un nuevo usuario+
DELIMITER $$
CREATE PROCEDURE SP_USER_RegisterUser(
    IN p_userUsername VARCHAR(30),
    IN p_userName VARCHAR(50),
    IN p_userLastname VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_pass VARCHAR(30),
    IN p_photo MEDIUMBLOB
)
BEGIN
    INSERT INTO Users (userUsername, userName, userLastname, email, pass, photo)
    VALUES (p_userUsername, p_userName, p_userLastname, p_email, p_pass, p_photo);
END $$
DELIMITER ;


-- 2. Stored Procedure para validar si un correo ya existe
DELIMITER $$
CREATE PROCEDURE SP_LOGIN_CheckEmail(
    IN p_email VARCHAR(100)
)
BEGIN
    SELECT * FROM Users WHERE email = p_email;
END $$
DELIMITER ;


-- 3. Stored Procedure para el login
DELIMITER $$
CREATE PROCEDURE SP_LOGIN_LoginUser(
    IN p_email VARCHAR(100),
    IN p_pass VARCHAR(30)
)
BEGIN
    SELECT userID, userUsername, userName, userLastname, email, userType, photo
    FROM Users
    WHERE CAST(email AS BINARY) = CAST(p_email AS BINARY)
    AND CAST(pass AS BINARY) = CAST(p_pass AS BINARY);
END $$
DELIMITER ;


SELECT * FROM USERS;
CALL SP_USER_RegisterUser('Wintry', 'José', 'Martinez', 'jose.delosrios@gmail.com', '123a', NULL);
CALL SP_LOGIN_CheckEmail('jose.delosrios@gmail.com');
CALL SP_LOGIN_LoginUser('jose.delosrios@gmail.com', '123a');
