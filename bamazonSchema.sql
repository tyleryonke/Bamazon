CREATE database bamazon;

USE bamazon;

CREATE table products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(250) NOT NULL,
  department_name VARCHAR(250) NOT NULL,
  price DECIMAL(20, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Towels", "Bathroom", 24.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toothpaste", "Bathroom", 7.49, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spatula", "Kitchen", 4.95, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cast-Iron Skillet", "Kitchen", 22.50, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Television", "Electronics", 249.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rice", "Food/Drink", 6, 188);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beef Broth", "Food/Drink", 3.99, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coca-Cola", "Food/Drink", 4.5, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pillowcase", "Bedroom", 12.78, 62);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wool Sheets", "Bedroom", 44.99, 13);

SELECT * FROM products;