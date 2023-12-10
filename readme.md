Book Notes Project by Robert Saliger is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
Based on a work at [insert link to your project repository or relevant information].
Permissions beyond the scope of this license may be available at [insert contact information or any additional terms].


# How to start
cd into the directory 
npm i 
node or nodemon index.js
and its started 

# How to create the Database 
use pg admin for this 
Create a Database called "World"
CREATE TABLE review(
name text NOT NULL,
	review text NOT NULL,
	datum text ,
	ISBN BIGINT PRIMARY KEY,
	rating  integer
);
CREATE TABLE login(
	username text NOT NULL UNIQUE,
	password text NOT NULL,
	admin boolean
);
# The INSERT INTO are optional to give you a general look how the Website would look like and how to Login you could also just use ur own Data for the database

INSERT INTO login (username,password,admin)
VALUES ('Admin','admin',TRUE);
INSERT INTO review(review,datum,ISBN,rating)
VALUES ('Title: Band 1 - "Dragon Ball: The Monkey King"','2023-12-9','9781569319307',7 );


