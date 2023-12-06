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
	datum date ,
	ISBN INT PRIMARY KEY,
	rating  integer
);
CREATE TABLE login(
	username text NOT NULL UNIQUE,
	password text NOT NULL,
	admin boolean
);
