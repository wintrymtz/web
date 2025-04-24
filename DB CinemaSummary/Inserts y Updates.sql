USE CinemaSum;



CALL SP_USER_RegisterUser('Wintry', 'José', 'Martinez', 'jose.delosrios@gmail.com1', '123a', 'ffff');
CALL SP_USER_RegisterUser('Memo', 'Guillermo', 'Morin', 'memorandum@gmail.com', '123b', 'ffff');
CALL SP_USER_RegisterUser('Aze', 'Azeneth', 'Contreras', 'aze@gmail.com', '123c', 'ffff');
CALL SP_USER_RegisterUser('Roger', 'Aldo', 'Zapata', 'roger@gmail.com', '123d', 'ffff');
CALL SP_USER_RegisterUser('Null', 'Uriel', 'Guerrero', 'rypat@gmail.com', '123e', 'ffff');

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
INSERT INTO GenreMovies (genreID, movieID) VALUES (2, 2);
INSERT INTO GenreMovies (genreID, movieID) VALUES (1, 3);
INSERT INTO GenreMovies (genreID, movieID) VALUES (5, 4);
INSERT INTO GenreMovies (genreID, movieID) VALUES (3, 5);

INSERT INTO Reviews (descReview, rating, userID, movieID) VALUES ('Review 1', 4, 1, 1);
INSERT INTO Reviews (descReview, rating, userID, movieID) VALUES ('Review 2', 9, 1, 2);
INSERT INTO Reviews (descReview, rating, userID, movieID) VALUES ('Review 3', 8, 1, 3);
INSERT INTO Reviews (descReview, rating, userID, movieID) VALUES ('Review 4', 6, 2, 1);
INSERT INTO Reviews (descReview, rating, userID, movieID) VALUES ('Review 5', 6, 2, 2);
INSERT INTO Reviews (descReview, rating, userID, movieID) VALUES ('Review 6', 6, 2, 3);
INSERT INTO Reviews (descReview, rating, userID, movieID) VALUES ('Review 7', 6, 2, 4);
INSERT INTO Reviews (descReview, rating, userID, movieID) VALUES ('Review 8', 6, 2, 5);
INSERT INTO Reviews (descReview, rating, userID, movieID) VALUES ('Review 9', 6, 3, 2);
INSERT INTO Reviews (descReview, rating, userID, movieID) VALUES ('Review 10', 7, 3, 4);
INSERT INTO Reviews (descReview, rating, userID, movieID) VALUES ('Review 11', 2, 4, 4);
INSERT INTO Reviews (descReview, rating, userID, movieID) VALUES ('Review 12', 10, 4, 5);

INSERT INTO UserMovies (userID, movieID) VALUES (1, 2);
INSERT INTO UserMovies (userID, movieID) VALUES (1, 5);
INSERT INTO UserMovies (userID, movieID) VALUES (2, 1);
INSERT INTO UserMovies (userID, movieID) VALUES (2, 2);
INSERT INTO UserMovies (userID, movieID) VALUES (2, 3);
INSERT INTO UserMovies (userID, movieID) VALUES (2, 4);
INSERT INTO UserMovies (userID, movieID) VALUES (2, 5);
INSERT INTO UserMovies (userID, movieID) VALUES (4, 2);
INSERT INTO UserMovies (userID, movieID) VALUES (4, 3);
INSERT INTO UserMovies (userID, movieID) VALUES (4, 5);
INSERT INTO UserMovies (userID, movieID) VALUES (5, 1);
INSERT INTO UserMovies (userID, movieID) VALUES (5, 4);

INSERT INTO UserReviews (userID, reviewID) VALUES (1, 2);
INSERT INTO UserReviews (userID, reviewID) VALUES (1, 4);
INSERT INTO UserReviews (userID, reviewID) VALUES (1, 6);
INSERT INTO UserReviews (userID, reviewID) VALUES (1, 8);
INSERT INTO UserReviews (userID, reviewID) VALUES (2, 2);
INSERT INTO UserReviews (userID, reviewID) VALUES (2, 3);
INSERT INTO UserReviews (userID, reviewID) VALUES (2, 4);
INSERT INTO UserReviews (userID, reviewID) VALUES (2, 5);
INSERT INTO UserReviews (userID, reviewID) VALUES (2, 6);
INSERT INTO UserReviews (userID, reviewID) VALUES (2, 7);
INSERT INTO UserReviews (userID, reviewID) VALUES (2, 12);
INSERT INTO UserReviews (userID, reviewID) VALUES (3, 8);
INSERT INTO UserReviews (userID, reviewID) VALUES (3, 2);
INSERT INTO UserReviews (userID, reviewID) VALUES (5, 1);
INSERT INTO UserReviews (userID, reviewID) VALUES (5, 4);
INSERT INTO UserReviews (userID, reviewID) VALUES (5, 5);
INSERT INTO UserReviews (userID, reviewID) VALUES (5, 7);

