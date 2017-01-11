var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "Timothy92",

	database: "bamazon"
});

//connect?

connection.query("SELECT * FROM products WHERE stock_quantity>0", function(err, res) {
	if (err) throw err;
	console.log("Welcome to Bamazon! A Beff Jezos Company");
	console.log("Here are all items currently for sale:");
	for (var i = 0; i < res.length; i++) {
		console.log("-----------------------");
		console.log(res[i].item_id + " -- " + res[i].product_name + " -- $" + res[i].price);
	}
	inquirer.prompt([

	{
		type: "input",
		message: "Which item would you like to purchase?",
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
		message: "How many of that item would you like to purchase?",
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

			var totalCharge = res[0].price * selection.quantity;
			var resultingQuantity = res[0].stock_quantity - selection.quantity;

			if (selection.quantity > res[0].stock_quantity) {
				console.log("Insufficient quantity! Only " + res[0].stock_quantity + " of this item are in stock.");
			}
			else {
				connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [resultingQuantity, selection.item], function(err, res) {
					if (err) throw err;
					console.log("Your order was successfully processed. You total charge is $" + totalCharge + ". Please allow 2 business days for delivery if you have Bamazon Prime.");
				})
			}
		})	
	});
});