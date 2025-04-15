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

DELIMITER $$
CREATE PROCEDURE SP_DELETE_User(
    IN p_id INT
)
BEGIN
    DELETE FROM Users WHERE userID = p_id;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_GET_UserList()
BEGIN
    SELECT userID, userUsername, userName, userLastname FROM Users WHERE userType = 0;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_UPDATE_User(
IN p_id INT,
IN p_username VARCHAR(30),
IN p_email VARCHAR(100),
IN p_firstname VARCHAR(50),
IN p_lastname VARCHAR(50),
IN p_image LONGTEXT
)
BEGIN
	if (SELECT Count(*) FROM Users WHERE email = p_email) > 1
    THEN
		SELECT "El correo ya existe";
    ELSE
	    UPDATE Users 
        SET 
        userUsername = p_username,
        userName = p_firstname,
        userLastname = p_lastname,
        email = p_email,
        photo = p_image
        WHERE userID = p_id;
	END IF;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_GET_User(
IN p_id INT
)
BEGIN
    SELECT userID, userUsername, userName, userLastname, photo, email FROM Users WHERE userID = p_id;
END $$
DELIMITER ;

-- ---------------------------------------------------------------------------------------------------------------------
-- --------------------------- STORED PROCEDURES PARA LOS GÉNEROS ---------------------------------------------------------
-- ---------------------------------------------------------------------------------------------------------------------

DELIMITER $$
CREATE PROCEDURE SP_CREATE_CreateGenre(
    IN p_name VARCHAR(20),
    IN p_desc VARCHAR(200)
)
BEGIN
    INSERT INTO Genres (genreName, descGenre)
    VALUES (p_name, p_desc);
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_GET_GenreList()
BEGIN
    SELECT genreID, genreName, descGenre FROM Genres;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_DELETE_Genre(
IN p_id INT
)
BEGIN
    DELETE FROM Genres WHERE genreID = p_id;
END $$
DELIMITER ;


SELECT * FROM USERS;
CALL SP_USER_RegisterUser('Wintry', 'José', 'Martinez', 'jose.delosrios@gmail.com1', '123a', 'ffff');
CALL SP_USER_RegisterUser('Wintry', 'José', 'Martinez', 'jose.delosrios@gmail.com2', '123a', 'ffff');
CALL SP_USER_RegisterUser('Wintry', 'José', 'Martinez', 'jose.delosrios@gmail.com3', '123a', 'ffff');
CALL SP_USER_RegisterUser('Wintry', 'José', 'Martinez', 'jose.delosrios@gmail.com4', '123a', 'ffff');
CALL SP_USER_RegisterUser('Wintry', 'José', 'Martinez', 'jose.delosrios@gmail.com5', '123a', 'ffff');

CALL SP_LOGIN_CheckEmail('jose.delosrios@gmail.com');
CALL SP_LOGIN_LoginUser('jose.delosrios@gmail.com', '123a');

CALL SP_GENRE_Create('terror', 'descripcion de mi categoria de terror');
CALL SP_GENRE_Create('terror2', '2descripcion de mi categoria de terror');
CALL SP_GENRE_Create('terror3', '3descripcion de mi categoria de terror');
CALL SP_GENRE_Create('terror4', '4descripcion de mi categoria de terror');
CALL SP_GENRE_Create('terror5', '5descripcion de mi categoria de terror');

