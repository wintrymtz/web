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
-- --------------------------- STORED PROCEDURES PARA LAS PELICULAS ----------------------------------------------------
-- ---------------------------------------------------------------------------------------------------------------------

-- Obtener películas favoritas
DELIMITER $$
CREATE PROCEDURE SP_GET_UserFavoriteMovies(IN pUserID INT)
BEGIN
    SELECT M.*
    FROM UserMovies UM
    JOIN Movies M ON UM.movieID = M.movieID
    WHERE UM.userID = pUserID;
END $$
DELIMITER ;


-- Obtener la información de la pelicula por ID
DELIMITER //
CREATE PROCEDURE SP_GET_MovieByID(IN id INT)
BEGIN
    SELECT 
        M.movieID,
        M.movieName,
        M.synopsis,
        M.poster,
        M.duration,
        M.yearPremiere,
        M.reviewNumber,
        M.rating,
        G.genreName
    FROM Movies M
    LEFT JOIN GenreMovies GM ON GM.movieID = M.movieID
    LEFT JOIN Genres G ON G.genreID = GM.genreID
    WHERE M.movieID = id;
END //
DELIMITER ;


-- Actualizar Pelicula y género de pelicula
DELIMITER //
CREATE PROCEDURE SP_UPDATE_Movie (IN p_movieID INT, IN p_movieName VARCHAR(50), IN p_synopsis TEXT, IN p_poster LONGTEXT, 
                                  IN p_duration INT, IN p_yearPremiere INT, IN p_genreName VARCHAR(20))
BEGIN
  DECLARE genre_id INT;

  SELECT genreID INTO genre_id FROM Genres WHERE genreName = p_genreName;

  UPDATE Movies SET movieName = p_movieName, synopsis = p_synopsis, poster = p_poster, duration = p_duration, yearPremiere = p_yearPremiere
  WHERE movieID = p_movieID;

  DELETE FROM GenreMovies WHERE movieID = p_movieID;

  INSERT INTO GenreMovies (genreID, movieID)
  VALUES (genre_id, p_movieID);
END //
DELIMITER ;
 

-- Eliminar pelicula
DELIMITER //
CREATE PROCEDURE SP_DELETE_Movie (IN p_movieID INT)
BEGIN
    -- Desactiva las validaciones de llaves foráneas
    SET FOREIGN_KEY_CHECKS = 0;

    DELETE FROM Reviews WHERE movieID = p_movieID;
    DELETE FROM GenreMovies WHERE movieID = p_movieID;
    DELETE FROM UserMovies WHERE movieID = p_movieID;
    DELETE FROM Movies WHERE movieID = p_movieID;

    -- Vuelve a activar las validaciones
    SET FOREIGN_KEY_CHECKS = 1;
END //
DELIMITER ;



-- TRIGGER para actualizar la calificación de la pelicula cada que se crea una nueva Reseña
DELIMITER //
CREATE TRIGGER TRG_UPDATE_NewRating
AFTER INSERT ON Reviews
FOR EACH ROW
BEGIN
    -- Actualizar reviewNumber y ratingSum
    UPDATE Movies
    SET 
        reviewNumber = reviewNumber + 1,
        ratingSum = ratingSum + NEW.rating,
        rating = ratingSum / reviewNumber
    WHERE movieID = NEW.movieID;
END //
DELIMITER ;

-- ---------------------------------------------------------------------------------------------------------------------
-- --------------------------- STORED PROCEDURES PARA LAS REVIEWS ------------------------------------------------------
-- ---------------------------------------------------------------------------------------------------------------------


-- Crear reseña de pelicula 
DELIMITER //
CREATE PROCEDURE SP_CREATE_Review (IN p_descReview TEXT, IN p_rating INT, IN p_userID INT, IN p_movieID INT)
BEGIN
    INSERT INTO Reviews (descReview, rating, userID, movieID)
    VALUES (p_descReview, p_rating, p_userID, p_movieID);
END //
DELIMITER ;


-- Obtener reseñas favoritas de un usuario
DELIMITER //
CREATE PROCEDURE SP_GET_UserFavReviews(IN uid INT)
BEGIN
    SELECT 
        R.reviewID,
        R.descReview AS review,
        R.rating,
        R.movieID,
        U.userUsername AS user,
        U.photo AS image
    FROM UserReviews UR
    JOIN Reviews R ON UR.reviewID = R.reviewID
    JOIN Users U ON R.userID = U.userID
    WHERE UR.userID = uid;
END //
DELIMITER ;


-- Obtener las reseñas de una pelicula
DELIMITER //
CREATE PROCEDURE SP_GET_ReviewsByMovieID(IN id INT)
BEGIN
    SELECT 
        R.reviewID,
        R.descReview AS review,
        R.rating,
        U.userUsername AS user,
        U.photo AS image
    FROM Reviews R
    JOIN Users U ON R.userID = U.userID
    WHERE R.movieID = id;
END //
DELIMITER ;

-- ---------------------------------------------------------------------------------------------------------------------
-- --------------------------- STORED PROCEDURES PARA LOS GÉNEROS ------------------------------------------------------
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


-- ---------------------------------------------------------------------------------------------------------------------
-- ------------------- STORED PROCEDURES PARA LAS PELICULAS FAVORITAS (USERMOVIES) -------------------------------------
-- ---------------------------------------------------------------------------------------------------------------------


-- Comprobar si una pelicula es favorita o no
DELIMITER //
CREATE PROCEDURE SP_GET_ifMovieFav (IN p_userID INT, IN p_movieID INT)
BEGIN
    SELECT * FROM UserMovies
    WHERE userID = p_userID AND movieID = p_movieID;
END //
DELIMITER ;


-- Poner en favoritos una pelicula para un usuario
DELIMITER //
CREATE PROCEDURE SP_CREATE_UserMovie (IN p_userID INT, IN p_movieID INT)
BEGIN
    INSERT INTO UserMovies (userID, movieID)
    VALUES (p_userID, p_movieID);
END //
DELIMITER ;


-- Eliminar película favorita
DELIMITER $$
CREATE PROCEDURE SP_DELETE_UserFavoriteMovie(IN pUserID INT, IN pMovieID INT)
BEGIN
    DELETE FROM UserMovies
    WHERE userID = pUserID AND movieID = pMovieID;
END $$
DELIMITER ;


-- ---------------------------------------------------------------------------------------------------------------------
-- -------------------- STORED PROCEDURES PARA LAS RESEÑAS FAVORITAS (USERREVIEWS) -------------------------------------
-- ---------------------------------------------------------------------------------------------------------------------


-- Obtener reseñas favoritas del usuario
DELIMITER //
CREATE PROCEDURE SP_GET_FavReviewsIDS (IN p_userID INT)
BEGIN
    SELECT reviewID FROM UserReviews WHERE userID = p_userID;
END //;
DELIMITER ;


-- Agregar reseñas a favoritos
DELIMITER //
CREATE PROCEDURE SP_CREATE_UserFavReviews(IN p_userID INT, IN p_reviewID INT)
BEGIN
    INSERT INTO UserReviews (userID, reviewID)
    VALUES (p_userID, p_reviewID);
END //;
DELIMITER ;


-- Eliminar reseña favorita
DELIMITER //
CREATE PROCEDURE SP_DELETE_UserFavReviews(IN uid INT, IN rid INT)
BEGIN
    DELETE FROM UserReviews
    WHERE userID = uid AND reviewID = rid;
END //
DELIMITER ;


-- ---------------------------------------------------------------------------------------------------------------------
-- -------------------- STORED PROCEDURES PARA LA BÚSQUEDA -------------------------------------
-- ---------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE SP_SELECT_Search(
IN p_search VARCHAR(200)
)
BEGIN
    SELECT movieID, movieName, poster, yearPremiere, rating FROM Movies WHERE movieName LIKE CONCAT('%' ,p_search ,'%');
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_SELECT_GenresByMovie(
    IN p_movieID INT
)
BEGIN
    SELECT 
        G.genreID,
        G.genreName,
        G.descGenre
    FROM 
        GenreMovies GM
    INNER JOIN Genres G ON GM.genreID = G.genreID
    WHERE 
        GM.movieID = p_movieID;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_SELECT_Search2(
    IN p_search VARCHAR(200)
)
BEGIN
    SELECT 
        M.movieID,
        M.movieName,
        M.poster,
        M.yearPremiere,
        M.rating,
        M.reviewNumber,
        GROUP_CONCAT(G.genreName SEPARATOR ', ') AS genres
    FROM 
        Movies M
    LEFT JOIN GenreMovies GM ON M.movieID = GM.movieID
    LEFT JOIN Genres G ON GM.genreID = G.genreID
    WHERE 
        M.movieName LIKE CONCAT('%', p_search, '%')
    GROUP BY 
        M.movieID;
END //
DELIMITER ;



-- --------------------------------------------------------------------------------------------------------------------------------------
-- --------------------------------------------------------------------------------------------------------------------------------------
-- --------------------------------------------------------------------------------------------------------------------------------------
-- --------------------------------------------------------------------------------------------------------------------------------------
-- Calls y demas

CALL SP_SELECT_GenresByMovie(5);
CALL SP_SELECT_Search2("a");

SELECT * FROM USERS;
SELECT * FROM MOVIES;
SELECT * FROM REVIEWS;
SELECT * FROM GENRES;
SELECT * FROM GENREMOVIES;
SELECT * FROM USERMOVIES;
SELECT * FROM USERREVIEWS;

-- Insertar usuarios
CALL SP_USER_RegisterUser('Wintry', 'José', 'Martinez', 'jose.delosrios@gmail.com', '123a', 'ffff');
CALL SP_USER_RegisterUser('Memo', 'Guillermo', 'Morin', 'memorandum@gmail.com', '123b', 'ffff');
CALL SP_USER_RegisterUser('Aze', 'Azeneth', 'Contreras', 'aze@gmail.com', '123c', 'ffff');
CALL SP_USER_RegisterUser('Roger', 'Aldo', 'Zapata', 'roger@gmail.com', '123d', 'ffff');
CALL SP_USER_RegisterUser('Null', 'Uriel', 'Guerrero', 'ryupat@gmail.com', '123e', 'ffff');

CALL SP_LOGIN_CheckEmail('jose.delosrios@gmail.com');
CALL SP_LOGIN_LoginUser('jose.delosrios@gmail.com', '123a');

CALL SP_GET_UserFavoriteMovies(2);
CALL SP_GET_UserFavReviews(2);
CALL SP_GET_MovieByID(3);
CALL SP_GET_ReviewsByMovieID(2);
CALL SP_GET_FavReviewsIDS(2);

INSERT INTO Movies (movieName, synopsis, duration, yearPremiere, rating, poster) VALUES ('Avatar', 'Humanos exploran la isla de Pandora', 150, 2010, 8, 'fff');
INSERT INTO Movies (movieName, synopsis, duration, yearPremiere, rating, poster) VALUES ('Intensamente 2', 'Nuevas emociones secuestran la mente de Riley', 109, 2024, 6, 'fff');
INSERT INTO Movies (movieName, synopsis, duration, yearPremiere, rating, poster) VALUES ('Anabelle 3', 'Pelicula de terror donde una muñeca se mueve', 95, 2022, 4, 'fff');
INSERT INTO Movies (movieName, synopsis, duration, yearPremiere, rating, poster) VALUES ('Avatar 2', 'La secuela de la primera.', 180, 2023, 10, 'fff');
INSERT INTO Movies (movieName, synopsis, duration, yearPremiere, rating, poster) VALUES ('Avengers: Infinity War', 'Thanos busca las gemas del infinito', 160, 2018, 9, 'fff');

CALL SP_CREATE_CreateGenre('Terror', 'descripcion de mi categoria de terror');
CALL SP_CREATE_CreateGenre('Comedia', '2descripcion de mi categoria de comedia');
CALL SP_CREATE_CreateGenre('Acción', '3descripcion de mi categoria de acción');
CALL SP_CREATE_CreateGenre('Ciencia Ficción', '4descripcion de mi categoria de ciencia ficción');
CALL SP_CREATE_CreateGenre('Aventura', '5descripcion de mi categoria de aventura');

INSERT INTO GenreMovies (genreID, movieID) VALUES (4, 1);
INSERT INTO GenreMovies (genreID, movieID) VALUES (3, 1);
INSERT INTO GenreMovies (genreID, movieID) VALUES (2, 2);
INSERT INTO GenreMovies (genreID, movieID) VALUES (1, 3);
INSERT INTO GenreMovies (genreID, movieID) VALUES (5, 4);
INSERT INTO GenreMovies (genreID, movieID) VALUES (3, 5);

DROP TRIGGER IF EXISTS TRG_UPDATE_NewRating;
