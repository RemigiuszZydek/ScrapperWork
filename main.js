"use strict";
exports.__esModule = true;
var readline_sync_1 = require("readline-sync");
function main() {
    ;
    var question1 = (0, readline_sync_1.question)('Welcome to scrapper. What do You want to do ? \n1.Full scrap meme site\n2.Random 1 meme\n3.Quit\n: ');
    var validInputs = input(question1);
    if (validInputs) {
        if (question1 === '1') {
        }
        if (question1 === '2') {
        }
        if (question1 === '3') {
            return process.exit();
        }
    }
    else {
        console.log("Wrong input.");
        main();
    }
}
main();
function input(str) {
    var inputs = str;
    var validInput = Boolean(inputs === '1' || inputs === '2' || inputs === '3');
    return validInput;
}
