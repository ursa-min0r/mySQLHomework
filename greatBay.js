var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,


    user: "root",


    password: "M1ssK1tty",
    database: "greatBay_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

function start() {
    inquirer
        .prompt({
            name: "postOrBid",
            type: "list",
            message: "Would you like to POST an auction or BID on an auction?",
            choices: ["POST", "BID", "EXIT"]
        })
        .then(function (answer) {

            if (answer.postOrBid.toUpperCase() === "POST") {
                postAuction();
            }
            else {
                (answer.postOrBid.toUpperCase() === "BID") 
                bidAuction();
            } 
        });
}

function postAuction() {

    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the item you would like to submit?"
            },
            {
                name: "category",
                type: "input",
                message: "What category would you like to place your auction in?"
            },
            {
                name: "startingBid",
                type: "input",
                message: "What would you like your starting bid to be?",

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
                "INSERT INTO auctions SET ?",
                {
                    item_name: answer.item,
                    category: answer.category,
                    starting_bid: answer.startingBid,
                    highest_bid: answer.startingBid
                },
                function (err) {
                    if (err) throw err;
                    console.log("--------------------\n");
                    console.log("Your auction was created successfully!\n");

                    readProducts();
                }
            );
        });
}
function bidAuction() {

    connection.query("SELECT * FROM auctions", function (err, results) {
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
                    message: "What auction would you like to bid on?"
                },
                {
                    name: "bid",
                    type: "input",
                    message: "How much would you like to bid?"
                }
            ])
            .then(function (answer) {

                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }

                if (chosenItem.highest_bid < parseInt(answer.bid)) {

                    connection.query(
                        "UPDATE auctions SET ? WHERE ?",
                        [
                            {
                                highest_bid: answer.bid
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("--------------------\n");
                            console.log("Bid placed successfully!\n");
                            readProducts();
                            console.log("--------------------\n");
                            console.log("You are the higest bidder!\n");
                        }
                    );
                }
                else {
                    console.log("--------------------\n");
                    console.log("Your bid was too low. Try again...\n");
                    bidAuction();
                }
            });
    });
}

function readProducts() {
    console.log("--------------------\n");
    console.log("Available Products\n");
    connection.query("SELECT * FROM auctions", function (err, res) {
        if (err) throw err;

        console.table(res);
        connection.end();
    });
}
