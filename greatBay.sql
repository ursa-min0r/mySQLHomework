DROP DATABASE IF EXISTS greatBay_db;

CREATE DATABASE greatBay_db;

USE greatbay_db;

CREATE TABLE auctions (
  id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(100) NOT NULL,
  category VARCHAR(45) NOT NULL,
  startingBid INT default 0,
  highestBid INT default 0,
  PRIMARY KEY (id)
);


INSERT INTO auctions (item, category, startingBid, highestBid)
VALUES ("the fucks i give", "acessories", 100000000, 0);

INSERT INTO auctions (item, category, startingBid, highestBid)
VALUES ("the will to live", "sporting goods", 1, 0);

INSERT INTO auctions (item, category, startingBid, highestBid)
VALUES ("my hopes and dreams", "housewares", 5, 0);

INSERT INTO auctions (item, category, startingBid, highestBid)
VALUES ("pre-exsisting medical conditions", "health and beauty", 10, 0);

INSERT INTO auctions (item, category, startingBid, highestBid)
VALUES ("2for1 deal: depression and anxiety", "lifestyle", 20, 0);

INSERT INTO auctions (item, category, startingBid, highestBid)
VALUES ("ice cold exterior", "outerwear", 500, 0);

INSERT INTO auctions (item, category, startingBid, highestBid)
VALUES ("deteriorating mental health", "lifestyle", 5, 0);

INSERT INTO auctions (item, category, startingBid, highestBid)
VALUES ("mommy issues", "self help", 20, 0);