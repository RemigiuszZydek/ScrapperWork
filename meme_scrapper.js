var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import https from 'https';
import cheerio from "cheerio";
const getUrl = (hostname) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        https
            .get({
            hostname,
            method: "GET",
        }, (res) => {
            let html = "";
            res.on("data", function (chunk) {
                html += chunk;
            });
            res.on("end", function () {
                resolve(html);
            });
        })
            .on("error", (error) => {
            console.error(error);
            reject(error);
        });
    });
});
const getMeme = (html) => {
    const $ = cheerio.load(html);
    const fullMeme = $("body > main > div.container-fluid > div.row.feed-top-padding > div.col-sm-8.col-xs-12 > div.media-element-wrapper");
    return fullMeme;
};
const getMemeInfo = (getMeme) => {
    const memes = [];
    const $ = cheerio.load(getMeme);
    const url = $('div.figure-holder > figure > a').attr('href');
    const title = $('div > div > div.content > h2 > a ').text().trim().replace("\n", "");
    memes.push({
        url: url,
        title: title,
        likes: $('div > div > div.actions > div.votes > div > span').text(),
        autor: $('div > div > div.user-bar > div > a > span.name').text()
    });
    return memes;
};
getUrl("kwejk.pl")
    .then(getMeme)
    .then((getMeme) => {
    let memes = [];
    getMeme.each((_, getMeme) => (memes = memes.concat(getMemeInfo(getMeme))));
    return memes;
}).then((memes) => console.log(memes))
    .catch((error) => console.log(error));
//# sourceMappingURL=meme_scrapper.js.map