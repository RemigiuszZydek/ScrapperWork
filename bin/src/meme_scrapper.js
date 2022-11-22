var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cheerio from "cheerio";
import Puppeteer from "puppeteer";
export class MemeGenerator {
    constructor(url) {
        if (url !== "") {
            this.getWebsite = this.getHtml(url);
        }
        else
            throw new Error("[ERROR] - Empty or wrong Url!");
    }
    getHtml(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let html = [];
            const browser = yield Puppeteer.launch({ headless: true });
            const page = yield browser.newPage();
            for (let i = 0; i <= 2; i++) {
                yield page.goto(url, { waitUntil: 'networkidle2' });
                let htmlstring = yield page.content();
                html.push(htmlstring);
                yield page.click('body > main > div.container-fluid > div.row.feed-top-padding > div.col-sm-8.col-xs-12 > div.pagination > a.btn.btn-next.btn-gold > span');
                console.log(`Scrapped page nr ${i + 1} of 3`);
            }
            return html.toString();
        });
    }
    getMeme(html) {
        const $ = cheerio.load(html);
        const fullMeme = $("body > main > div.container-fluid > div.row.feed-top-padding > div.col-sm-8.col-xs-12> div.media-element-wrapper");
        return fullMeme;
    } // Gets only memes to string
    getMemeInfo(getMeme) {
        const memes = [];
        const $ = cheerio.load(getMeme);
        const url = $("div > div").attr("data-image");
        const title = $("div >div > div > div.content > h2 > a ")
            .text()
            .trim()
            .replace("\n", "");
        const likes = $("div>div").attr("data-vote-up");
        const dislikes = $("div>div").attr("data-vote-down");
        const autor = $("div > div > div.user-bar > div > a > span.name").text();
        memes.push({
            url: url,
            title: title,
            likes: likes,
            dislikes: dislikes,
            autor: autor,
        });
        return memes;
    } // Takes info about memes
    pageScrap() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getWebsite.then((website) => {
                let memes = [];
                this.getMeme(website).each((_, getMeme) => {
                    memes = memes.concat(this.getMemeInfo(getMeme));
                });
                return memes;
            });
        });
    }
    fullScrap() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pageScrap().then((memes) => console.log(memes));
        });
    }
    randomMeme() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pageScrap().then((memes) => {
                const i = Math.floor(Math.random() * memes.length);
                console.log(memes[i]);
                console.log(`[INFO] - Random number: ${i}`);
            });
        });
    }
}
//# sourceMappingURL=meme_scrapper.js.map