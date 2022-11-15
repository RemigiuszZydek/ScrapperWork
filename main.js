import { question } from "readline-sync";
import { fullScrap, randomMeme } from './meme_scrapper.js';
function main() {
    ;
    const question1 = question('Welcome to scrapper. What do You want to do ? \n1.Full scrap meme site\n2.Random 1 meme\n3.Quit\n: ');
    const validInputs = input(question1);
    if (validInputs) {
        if (question1 === '1') {
            fullScrap()
                .then(main);
        }
        if (question1 === '2') {
            randomMeme();
            main();
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
    const inputs = str;
    const validInput = Boolean(inputs === '1' || inputs === '2' || inputs === '3');
    return validInput;
}
//# sourceMappingURL=main.js.map