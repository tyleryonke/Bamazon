var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "Timothy92",

	database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});

console.log("Welcome to Bamazon! A Beff Jezos Company");
	
inquirer.prompt([

{
	type: "list",
	message: "Welcome, manager. What would you like to do?",	
	choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
	name: "choiceOfFunction"
}

]).then(function(selection) {
	switch (selection.choiceOfFunction) {
    	case "View Products for Sale":
	        viewProducts();
        	break;
    	case "View Low Inventory":
        	viewLowInventory();
        	break;
        case "Add to Inventory":
	        addToInventory();
        	break;
    	case "Add New Product":
        	addProduct();
        	break;
	};	
});

function viewProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		console.log("Here are all items currently for sale:");
		for (var i = 0; i < res.length; i++) {
			console.log("-----------------------");
			console.log(res[i].item_id + " -- " + res[i].product_name + " -- $" + res[i].price + " -- Quantity remaining: " + res[i].stock_quantity);
		}
	})

	connection.end();
};

function viewLowInventory() {
	connection.query("SELECT * FROM products WHERE stock_quantity<5", function(err, res) {
		console.log("Here are all items with low inventory:");
		for (var i = 0; i < res.length; i++) {
			console.log("-----------------------");
			console.log(res[i].item_id + " -- " + res[i].product_name + " -- Quantity remaining: " + res[i].stock_quantity);
		}
	})

	connection.end();
};

function addToInventory() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		console.log("Here are all items in the database:");
		for (var i = 0; i < res.length; i++) {
			console.log("-----------------------");
			console.log(res[i].item_id + " -- " + res[i].product_name + " -- Quantity remaining: " + res[i].stock_quantity);
		}
	})

	inquirer.prompt([

		{
			type: "input",
			message: "Which item would you like restock?",
			name: "item",
			validate: function(value) {
				if (isNaN(value) === false) {
				    return true;
				}
				return false;
			}
		},

		{
			type: "input",
			message: "How many of that item would you like to restock?",
			name: "quantity",
			validate: function(value) {
				if (isNaN(value) === false) {
				    return true;
				}
				return false;
			}
		}

	]).then(function(selection) {
		connection.query("SELECT * FROM products WHERE item_id=?", selection.item, function(err, res) {
			if (err) throw err;
			var resultingQuantity = parseInt(res[0].stock_quantity) + parseInt(selection.quantity);
			connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [resultingQuantity, selection.item], function(err, res) {
				if (err) throw err;
				console.log("Thank you for the restock. The new quantity of this item is " + resultingQuantity + ".");
			})

			connection.end();
		})	
	})
};

function addProduct() {
	inquirer.prompt([

		{
			type: "input",
			message: "What is the name of the item you would like to add?",
			name: "name",
		},

		{
			type: "input",
			message: "Which department does this item belong to?",
			name: "department",
		},

		{
			type: "input",
			message: "What is the price of this item?",
			name: "price",
			validate: function(value) {
				if (isNaN(value) === false) {
				    return true;
				}
				return false;
			}
		},

		{
			type: "input",
			message: "What is the quantity of this item?",
			name: "quantity",
			validate: function(value) {
				if (isNaN(value) === false) {
				    return true;
				}
				return false;
			}
		}

	]).then(function(selection) {
		connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES (?, ?, ?, ?, 1);", [selection.name, selection.department, selection.price, selection.quantity], function(err, res) {
			if (err) throw err;
			console.log("Product added.")
		})

		connection.end();
	})
};