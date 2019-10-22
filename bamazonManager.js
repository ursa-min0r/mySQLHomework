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
        })

    switch (start) {
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
    }

};

function viewProducts() {
    console.log("--------------------\n");
    console.log("Available Products\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.table(res);
        connection.end();
    });
}

function lowInventory() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_name);
                        }
                        return choiceArray;
                    },
                    message: "Inventory Is Low On These Items, Please Restock."
                },
            ])

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
                name: "category",
                type: "list",
                message: "Select Category For New Item:",
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
                name: "itemSKU",
                type: "input",
                message: "Assign SKU For New Item:"

            },
            {
                name: "price",
                type: "input",
                message: "Input Price For New Item:",

                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {

            connection.query(
                "Confirm New Item",
                {
                    item_name: answer.item,
                    category: answer.category,
                    addItem: answer.addItem,
                    itemSKU: answer.itemSKU
                },
                function (err) {
                    if (err) throw err;
                    console.log("--------------------\n");
                    console.log("New Item Added To Inventory\n");

                    readProducts();
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
                name: "selectInv",
                type: "list",
                message: "Add Inventory To These Items:",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].item_name);
                    }
                    return choiceArray;
                },
            },
            {
                name: "addInv",
                type: "input",
                message: "Input Inventory Quantity For Selected Item:",
            }
        ])
        .then(function (answer) {

            connection.query(
                "Add Inventory To These Item(s)?",
                {
                    item_name: answer.item,
                    category: answer.category,
                    selectInv: answer.selectInv,
                    addInv: answer.addInv
                },
                function (err) {
                    if (err) throw err;
                    console.log("--------------------\n");
                    console.log("Inventory Successfully Updated.\n");

                    readProducts();
                }
            );
        });
}


