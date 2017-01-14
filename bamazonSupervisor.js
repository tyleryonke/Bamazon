var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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

console.log("Welcome to Bamazon! A Beff Jezos Company");
	
inquirer.prompt([

{
	type: "list",
	message: "Welcome, supervisor. What would you like to do?",	
	choices: ["View Product Sales by Department", "Create New Department"],
	name: "choiceOfFunction"
}

]).then(function(selection) {
	switch (selection.choiceOfFunction) {
    	case "View Product Sales by Department":
	        viewSales();
        	break;
    	case "Create New Department":
        	createDepartment();
        	break;
	};
});

function viewSales() {
	connection.query("SELECT * FROM departments", function(err, res) {
		var table = new Table({
		    head: ["department_id", "department_name", "over_head_costs", "product_sales", "total_profit"],
		    colWidths: [20, 20, 20, 20, 20]
		});

		for (var i = 0; i < res.length; i++) {
			var totalProfit = parseFloat(res[i].total_sales) - parseFloat(res[i].over_head_costs);
			table.push(
    			[res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].total_sales, totalProfit]
			);
		}

			 console.log(table.toString());
	})

	connection.end();
};

function createDepartment() {
	inquirer.prompt([

		{
			type: "input",
			message: "What is the name of the department you would like to create?",
			name: "name",
		},

		{
			type: "input",
			message: "What are the overhead costs for the department you would like to create?",
			name: "costs",
			validate: function(value) {
				if (isNaN(value) === false) {
				    return true;
				}
				return false;
			}
		}

	]).then(function(selection) {

		connection.query("INSERT INTO departments (department_name, over_head_costs, total_sales) VALUES (?, ?, 1);", [selection.name, selection.costs], function(err, res) {
			if (err) throw err;
			console.log("Department created.")
		})

		connection.end();
	})
};