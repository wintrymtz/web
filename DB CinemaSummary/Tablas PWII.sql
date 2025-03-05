
DROP DATABASE CinemaSum;
CREATE DATABASE CinemaSum;
USE CinemaSum;


-- TABLAS DE LA BASE DE DATOS --

CREATE TABLE Users (
    userID 			INT AUTO_INCREMENT PRIMARY KEY,
    userUsername	VARCHAR(30) NOT NULL,
    userName 		VARCHAR(50) NOT NULL,
    userLastname  	VARCHAR(50) NOT NULL,
    email 			VARCHAR(100) UNIQUE NOT NULL,
    pass			VARCHAR(30) NOT NULL,
    userType		INT DEFAULT 0,
    photo 			LONGTEXT NOT NULL
);

CREATE TABLE Movies (
    movieID 		INT AUTO_INCREMENT PRIMARY KEY,
    movieName		VARCHAR(50) NOT NULL,
    synopsis 		TEXT NOT NULL,
    poster  		MEDIUMBLOB NOT NULL,
    duration 		INT NOT NULL,
    yearPremiere	INT NOT NULL,
    reviewNumber	INT DEFAULT 0,
    rating 			INT DEFAULT 0
);

CREATE TABLE Reviews (
    reviewID 		INT AUTO_INCREMENT PRIMARY KEY,
    descReview		TEXT NOT NULL,
    rating 			INT NOT NULL,
    userID  		INT NOT NULL,
    movieID 		INT NOT NULL,
    
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (movieID) REFERENCES Movies(movieID)
);

CREATE TABLE Genres (
    genreID 		INT AUTO_INCREMENT PRIMARY KEY,
    genreName		VARCHAR(20) NOT NULL,
    descGenre 		VARCHAR(200) NOT NULL
);

CREATE TABLE GenreMovies (
	genreID  		INT NOT NULL,
    movieID 		INT NOT NULL,
    
    FOREIGN KEY (genreID) REFERENCES Genres(genreID),
    FOREIGN KEY (movieID) REFERENCES Movies(movieID)
);

CREATE TABLE UserMovies (
	userID  		INT NOT NULL,
    movieID 		INT NOT NULL,
    
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (movieID) REFERENCES Movies(movieID)
);

CREATE TABLE UserReviews (
	userID  		INT NOT NULL,
    reviewID 		INT NOT NULL,
    
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (reviewID) REFERENCES Reviews(reviewID)
);


SELECT * FROM Users;
SELECT * FROM Movies;
SELECT * FROM Reviews;
SELECT * FROM Genres;
SELECT * FROM GenreMovies;
SELECT * FROM UserMovies;
SELECT * FROM UserReviews;
