import { question } from "readline-sync";
import { exit } from "process";
import { meme } from "./src/meme_type";
import { MemeGenerator } from "./src/meme_scrapper.js";
import Puppeteer,{Browser} from "puppeteer";

function main(browser:Browser): void {
	const question1: string = question(
		"Welcome to scrapper. What do You want to do ? \n1.Full scrap meme site\n2.Random 1 meme\n3.Quit\n: ",
	);
	const validInputs: boolean = input(question1);

	if (!validInputs) {
		console.log("Wrong input");
		setTimeout(function () {
			main(browser);
		}, 500);
	}
	let pageNumber = Math.floor(Math.random()*(54000-2500)+2500).toString();
	let urlWebsite = `https://kwejk.pl/strona/${pageNumber}`;
	const meme = new MemeGenerator(urlWebsite,browser);
	switch (question1) {
		case "1":
			meme.fullScrap();
						setTimeout(function () {
							main(browser);
						}, 20000);
				
			break;
		case "2":
			meme.randomMeme();
			setTimeout(function () {
				main(browser);
			}, 20000);
			break;
		case "3":
			return process.exit();
	}
}

function input(str: string): boolean {
	const inputs = str;
	const validInput: boolean = Boolean(
		inputs === "1" || inputs === "2" || inputs === "3",
	);
	return validInput;
}

let browser=undefined;
(async()=>{
	browser=await Puppeteer.launch({headless:true})
	main(browser);
})()

