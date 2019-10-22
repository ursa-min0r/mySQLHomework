DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  inventory INT DEFAULT 0,
  PRIMARY KEY (id)
);


INSERT INTO products (product, department, price, inventory)
VALUES ("the fucks i give", "acessories", 100, 0);

INSERT INTO products (product, department, price, inventory)
VALUES ("the will to live", "sporting goods", 75, 5);

INSERT INTO products (product, department, price, inventory)
VALUES ("my hopes and dreams", "housewares", 250, 5);

INSERT INTO products (product, department, price, inventory)
VALUES ("pre-exsisting medical conditions", "health and beauty", 150, 10);

INSERT INTO products (product, department, price, inventory)
VALUES ("2for1 deal: depression and anxiety", "lifestyle", 50, 5);

INSERT INTO products (product, department, price, inventory)
VALUES ("ice cold exterior", "outerwear", 300, 5);

INSERT INTO products (product, department, price, inventory)
VALUES ("deteriorating mental health", "lifestyle", 500, 5);
