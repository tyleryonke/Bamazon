CREATE database bamazon;

USE bamazon;

CREATE table products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(250) NOT NULL,
  department_name VARCHAR(250) NOT NULL,
  price DECIMAL(20, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales DECIMAL(20, 2) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Towels", "Bathroom", 24.99, 15, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Toothpaste", "Bathroom", 7.49, 22, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Spatula", "Kitchen", 4.95, 9, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Cast-Iron Skillet", "Kitchen", 22.50, 11, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Television", "Electronics", 249.99, 4, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Rice", "Food/Drink", 6, 188, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Beef Broth", "Food/Drink", 3.99, 19, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Coca-Cola", "Food/Drink", 4.5, 30, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Pillowcase", "Bedroom", 12.78, 62, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Wool Sheets", "Bedroom", 44.99, 13, 1);

CREATE table departments (
  department_id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(250) NOT NULL,
  over_head_costs DECIMAL(20, 2) NOT NULL,
  total_sales DECIMAL(20, 2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("Bathroom", 300, 1);

INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("Kitchen", 75, 1);

INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("Electronics", 122.50, 1);

INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("Food/Drink", 35.25, 1);

INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("Bedroom", 101.99, 1);

SELECT * FROM products;

SELECT * FROM departments;