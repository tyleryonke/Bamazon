var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "PASSWORD HERE",

	database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});

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

			console.log(res[0].department_name);
			var totalCharge = res[0].price * selection.quantity;
			var grossSales = parseFloat(res[0].product_sales) + parseFloat(totalCharge);
			var resultingQuantity = res[0].stock_quantity - selection.quantity;

			if (selection.quantity > res[0].stock_quantity) {
				console.log("Insufficient quantity! Only " + res[0].stock_quantity + " of this item are in stock.");
			}
			else {
				connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [resultingQuantity, selection.item], function(err2, res2) {
					if (err2) throw err2;
					console.log("Your order was successfully processed. You total charge is $" + totalCharge + ". Please allow 2 business days for delivery if you have Bamazon Prime.");
				})

				connection.query("UPDATE products SET product_sales=? WHERE item_id=?", [grossSales, selection.item], function(err2, res2) {
					if (err2) throw err2;
				})

				connection.query("SELECT * FROM departments WHERE department_name=?", [totalCharge, res[0].department_name], function(err2, res2) {
					if (err2) throw err2;

					var departmentTotal = res[0].product_sales + totalCharge;

					connection.query("UPDATE departments SET total_sales=? WHERE department_name=?", [departmentTotal, res[0].department_name], function(err3, res3) {
						if (err3) throw err3;
					})

				})
			}

			connection.end();
		})	
	});
});