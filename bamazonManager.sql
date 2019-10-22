DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  SKU INT NOT NULL,
  product VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  inventory INT NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO products (SKU, product, department, price, inventory)
VALUES (11101, "the fucks i give", "acessories", 100, 0);

INSERT INTO products (SKU, product, department, price, inventory)
VALUES (11102, "the will to live", "sporting goods", 75, 5);

INSERT INTO products (SKU, product, department, price, inventory)
VALUES (11103, "my hopes and dreams", "housewares", 250, 5);

INSERT INTO products (SKU, product, department, price, inventory)
VALUES (11104, "pre-exsisting medical conditions", "health and beauty", 150, 10);

INSERT INTO products (SKU, product, department, price, inventory)
VALUES (11105, "2for1 deal: depression and anxiety", "lifestyle", 50, 5);

INSERT INTO products (SKU, product, department, price, inventory)
VALUES (11106, "ice cold exterior", "outerwear", 300, 5);

INSERT INTO products (SKU, product, department, price, inventory)
VALUES (11107, "deteriorating mental health", "lifestyle", 500, 5);
