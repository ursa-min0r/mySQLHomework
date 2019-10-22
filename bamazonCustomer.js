var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,


    user: "root",


    password: "M1ssK1tty",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

function start() {
    console.log("--------------------\n");
    console.log("Available Products\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.table(res);
        purchasePrompt();
    });
}

function purchasePrompt(){
	inquirer.prompt([
	{
		name: "itemID",
		type: "input",
		message:"Please Enter The Item ID:",
	},
	{
		name:"itemQuantity",
		type:"input",
		message:"How Many Items Do You Wish To Purchase?",
	},

 ]).then(function(answers){
 	var quantityNeeded = answers.Quantity;
 	purchaseOrder(quantityNeeded);
 });
};

function purchaseOrder(amtNeeded){
	connection.query('Select * FROM products', function(err,res){
		if(err){console.log(err)};
		if(amtNeeded < res[0].inventory){
			var totalCost = res[0].price * amtNeeded;
			console.log("Your Order Is In Stock.");
			console.log("Your total cost" +res[0].product + " is " + totalCost + " Thank You For Your Purchase.");

			connection.query("UPDATE products SET inventory = inventory " + amtNeeded);
		} else{
			console.log("Insufficient Quantity To Complete Your Order.");
		};
		start();
	});
};

start();