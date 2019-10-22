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
    start();
});

function start() {
    inquirer
        .prompt({
            name: "managerOpps",
            type: "list",
            message: "Select Manager Function",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }).then(function (answers) {
            switch (answers.managerOpps) {
                case "View Products for Sale":
                    viewProducts()
                    break;
                case "View Low Inventory":
                    lowInventory()
                    break;
                case "Add to Inventory":
                    addInventory()
                    break;
                case "Add New Product":
                    addProduct()
                    break;
                default:
                    break;
            };
        });
}
function viewProducts() {
    console.log("--------------------\n");
    console.log("Available Products\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.table(res);
        // connection.end();
        start();
    });
}

function lowInventory() {


    connection.query(`SELECT * FROM bamazon_db.products
    where inventory <= 5`, function (err, results) {
        if (err) throw err;
        console.table(results);

        start();
    });
};

function addProduct() {

    inquirer
        .prompt([
            {
                name: "item",
                type: "list",
                message: "Add New Product to Inventory?",
                choices: ["YES", "NO"]
            },
            {
                name: "department",
                type: "list",
                message: "Select Department For New Item:",
                choices: [
                    "Acessories",
                    "Sporting Goods",
                    "Housewares",
                    "Health and Beauty",
                    "Lifestyle",
                    "Outerwear",
                    "Lifestyle"
                ]
            },
            {
                name: "addItem",
                type: "input",
                message: "Input New Item:"

            },
            {
                name: "price",
                type: "input",
                message: "Input Price For New Item:",
            },
            {
                name: "inventory",
                type: "input",
                message: "Input Quantity For New Item:"

            },
        ])
        .then(function (answer) {

            connection.query(
                "Insert into products set ?",
                {
                    product: answer.addItem,
                    inventory: answer.inventory,
                    department: answer.department,
                    price: answer.price
                },
                function (err) {
                    if (err) throw err;
                    console.log("--------------------\n");
                    console.log("New Item Added To Inventory\n");

                    start();
                }
            );
        });
}

function addInventory() {

    inquirer
        .prompt([
            {
                name: "lowInv",
                type: "list",
                message: "Add Inventory?",
                choices: ["YES", "NO"]
            },
            {
                name: "inputInv",
                type: "input",
                message: "Input Item:",
            },
            {
                name: "addInv",
                type: "input",
                message: "Input Inventory Quantity For Selected Item:",
            },
            {
                name: "inputPrice",
                type: "input",
                message: "Input Price:",
            },
            {
                name: "inputDepo",
                type: "input",
                message: "Input Department:",
            },
        ])
        .then(function (answer) {

            connection.query(
                "Insert into products set ?",
                {
                    product: answer.inputInv,
                    inventory: answer.addInv,
                    department: answer.inputDepo,
                    price: answer.inputPrice
                },

                function (err) {
                    if (err) throw err;
                    console.log("--------------------\n");
                    console.log("Inventory Successfully Updated.\n");

                    start();
                }
            );
        });
};

