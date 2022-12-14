import cheerio from "cheerio";
import { meme } from "./meme_type";
import Puppeteer,{Browser} from "puppeteer";

export class MemeGenerator {
	private getWebsite: Promise<string>;
	browser: Puppeteer.Browser;
	constructor(url: string,browser:Browser) {
		this.browser=browser;
		if (url !== "") {
			this.getWebsite = this.getHtml(url);
		} else throw new Error("[ERROR] - Empty or wrong Url!");
	}
	
	private async getHtml (url:string):Promise<string>{
		let html:string[]=[];
		const page = await this.browser.newPage();
		await page.goto(url,{waitUntil:'networkidle2'})
		console.log(`Scrapped page nr ${1} of 3`);
		for(let i =1; i<=2 ; i++){
			let htmlstring= await page.content();
			html.push(htmlstring)
			await page.click('body > main > div.container-fluid > div.row.feed-top-padding > div.col-sm-8.col-xs-12 > div.pagination > a.btn.btn-next.btn-gold > span');
			await page.waitForTimeout(2000);
			console.log(`Scrapped page nr ${i+1} of 3`);
		}
		page.close();
		return html.toString();

	}
	

	private getMeme(html:string): cheerio.Cheerio {
		const $ = cheerio.load(html);
		const fullMeme = $(
			"body > main > div.container-fluid > div.row.feed-top-padding > div.col-sm-8.col-xs-12> div.media-element-wrapper",
		);
		return fullMeme;
	} // Gets only memes to string

	private getMemeInfo(getMeme: cheerio.Element): meme[] {
		const memes: meme[] = [];
		const $ = cheerio.load(getMeme);
		const url = $("div > div").attr("data-image");
		const title = $("div >div > div > div.content > h2 > a ")
			.text()
			.trim()
			.replace("\n", "");
		const likes = $("div>div").attr("data-vote-up");
		const dislikes = $("div>div").attr("data-vote-down");
		const autor = $(
			"div > div > div.user-bar > div > a > span.name",
		).text();
		memes.push({
			url: url,
			title: title,
			likes: likes,
			dislikes: dislikes,
			autor: autor,
		});
		return memes;
	} // Takes info about memes


	private async pageScrap(): Promise<meme[]> {
		return await this.getWebsite.then((website) => {
			let memes: meme[] = [];
			this.getMeme(website).each((_, getMeme) => {
				memes = memes.concat(this.getMemeInfo(getMeme));		
			});
			console.log(`[INFO] - Number of memes scrapped: ${memes.length}`);
			return memes;
		});
	}

	async fullScrap() {
		await this.pageScrap().then((memes) => console.log(memes));
		
		
	}
	async randomMeme() {
		await this.pageScrap().then((memes) => {
			const i = Math.floor(Math.random() * memes.length);
			console.log(memes[i]);
			console.log(`[INFO] - Random number: ${i}`);
		});
	}

}
