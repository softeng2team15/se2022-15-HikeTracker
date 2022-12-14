CREATE TABLE IF NOT EXISTS HIKES (
  IDHike INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  Name VARCHAR NOT NULL,
  Author VARCHAR NOT NULL,
  Length INTEGER NOT NULL,
  ExpectedTime INTEGER NOT NULL,
  Ascent INTEGER NOT NULL,
  Difficulty VARCHAR NOT NULL,
  StartPoint INTEGER NOT NULL,
  EndPoint INTEGER NOT NULL,
  CenterLat REAL NOT NULL,
  CenterLon REAL NOT NULL,
  Description VARCHAR
  );

CREATE TABLE IF NOT EXISTS HIKESMAPDATA (
  IDHike INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  CenterLat REAL NOT NULL,
  CenterLon REAL NOT NULL,
  MaxLat REAL NOT NULL,
  MaxLon REAL NOT NULL,
  MinLat REAL NOT NULL,
  MinLon REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS HIKESCOORDINATES (
  hikeId INTEGER NOT NULL,
  indexCoor INTEGER NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  PRIMARY KEY(hikeId,indexCoor)
);

CREATE TABLE IF NOT EXISTS POINTS (
  IDPoint INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  Name VARCHAR NOT NULL,
  Latitude REAL NOT NULL,
  Longitude REAL NOT NULL,
  Altitude REAL NOT NULL,
  Description VARCHAR NOT NULL,
  Province VARCHAR NOT NULL,
  Region VARCHAR NOT NULL,
  Country VARCHAR NOT NULL,
  TypeOfPoint VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS POINTSIMAGES (
  pointId INTEGER NOT NULL,
  path VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  PRIMARY KEY(pointId,path)
);


CREATE TABLE IF NOT EXISTS HUTS (
  IDPoint  INTEGER NOT NULL,
  NumberOfBedrooms INTEGER NOT NULL,
  Phone INTEGER NOT NULL,
  Email VARCHAR NOT NULL, 
  Website VARCHAR,
  PRIMARY KEY(IDPoint)
);

CREATE TABLE IF NOT EXISTS PARKINGS (
  IDPoint  INTEGER NOT NULL,
  SlotsTot INTEGER NOT NULL, 
  SlotsFull INTEGER NOT NULL,
  PRIMARY KEY(IDPoint)
);

CREATE TABLE IF NOT EXISTS USERS (
    Username VARCHAR NOT NULL PRIMARY KEY,
    Type VARCHAR NOT NULL,
    Password VARCHAR NOT NULL,
    Salt VARCHAR NOT NULL,
	  Name VARCHAR NOT NULL,
	  Surname VARCHAR NOT NULL,
	  PhoneNumber VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS LINKEDPOINTS (
	IDPoint	INTEGER NOT NULL,
	IDHike	INTEGER NOT NULL,
	FOREIGN KEY(IDHike) REFERENCES HIKES(IDHike),
	FOREIGN KEY(IDPoint) REFERENCES POINTS(IDPoint)
);



CREATE TABLE IF NOT EXISTS PREFERENCES (
	IDUser	VARCHAR NOT NULL,
	MIN_LENGTH	INTEGER,
  MAX_LENGTH	INTEGER,
  MIN_ASCENT INTEGER,
  MAX_ASCENT INTEGER,
  MIN_TIME INTEGER,
  MAX_TIME INTEGER,
	FOREIGN KEY(IDUser) REFERENCES USERS(Username)
);








INSERT INTO USERS(Username, Type, Password, Salt,Name,Surname,PhoneNumber)
VALUES
('jonhutworker@gmail.com',  'localGuide',  '5cb69c67556b1e6d37972a42a644e34c07db6711003395b58c5365a5c521f12f','6ab29d4b3b4a39c3e39a81c2e33940e3',  'Jon',  'Black',  '1234567890'),
('davidwallace@gmail.com', 'localGuide',   '09112dbd6ec97c22d4b3ab3d9663fc17ac5d19cdb538b1a0c88801dfa5fb910d','c1df01421e0ee3b8bad0dffde4d0b283',  'David',  'Wallace',  '1234567890'),
('johnlaroccia@gmail.com', 'localGuide', '421a530fba46900d33d759148b2c08a2fb134c5e003cf7cdc10fc558c38977ad', '1b5cdc6f2003a8e6073809c99d2c785a', 'John' , 'Rock' , '1234567890'),
('joelovehikes@gmail.com','hiker', 'f10a1ac3c830339dd6ef164df4c0efc29080b7bba7a29e3060772db59fce1a83' , '58c1096190832e329624c2ebd837ef77', 'Joe', 'Krafken', '38339900');





