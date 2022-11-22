import { question } from "readline-sync";
import { MemeGenerator } from "./src/meme_scrapper.js";
function main() {
    const question1 = question("Welcome to scrapper. What do You want to do ? \n1.Full scrap meme site\n2.Random 1 meme\n3.Quit\n: ");
    const validInputs = input(question1);
    if (!validInputs) {
        console.log("Wrong input");
        setTimeout(function () {
            main();
        }, 500);
    }
    let pageNumber = Math.floor(Math.random() * (54000 - 2500) + 2500).toString();
    let urlWebsite = `https://kwejk.pl/strona/${pageNumber}`;
    const meme = new MemeGenerator(urlWebsite);
    switch (question1) {
        case "1":
            meme.fullScrap();
            setTimeout(function () {
                main();
            }, 17000);
            break;
        case "2":
            meme.randomMeme();
            setTimeout(function () {
                main();
            }, 17000);
            break;
        case "3":
            return process.exit();
    }
}
function input(str) {
    const inputs = str;
    const validInput = Boolean(inputs === "1" || inputs === "2" || inputs === "3" || inputs === '4');
    return validInput;
}
main();
//# sourceMappingURL=main.js.map