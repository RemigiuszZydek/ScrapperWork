import https from 'https';
import cheerio from "cheerio";
import {meme} from '../ScrapperWork/meme_type'



  const getUrl = async (hostname: string,): Promise<string> =>
  new Promise((resolve, reject) => {
    https
        .get(
        {
          hostname,
          method: "GET",
        },
        (res) => {
          let html = "";
          res.on("data", function (chunk) {
            html += chunk;
          });
          res.on("end", function () {
            resolve(html);
          });
        }
      )
      .on("error", (error) => {
        console.error(error);
        reject(error);
      });
  });

  const getMeme = (html: string): cheerio.Cheerio => {
    const $ = cheerio.load(html);
    const fullMeme = $(
      "body > main > div.container-fluid > div.row.feed-top-padding > div.col-sm-8.col-xs-12 > div.media-element-wrapper"
    );
    return fullMeme;
  };
  
  

  const getMemeInfo=(getMeme: cheerio.Element):meme[]=>{
    const memes : meme[]=[];
    const $ = cheerio.load(getMeme);
    const url = $('div.figure-holder > figure > a').attr('href');
    const title = $('div > div > div.content > h2 > a ').text().trim().replace("\n","");
    memes.push({
      url:url,
      title: title,
      likes: $('div > div > div.actions > div.votes > div > span').text(),
      autor:$('div > div > div.user-bar > div > a > span.name').text()
    })
    
 
    return memes;
  }

   getUrl("kwejk.pl")
  .then(getMeme)
  .then((getMeme) => {
    let memes: meme[] = [];
    getMeme.each((_, getMeme) => (memes = memes.concat(getMemeInfo(getMeme))));
    return memes;
    }).then((memes)=>console.log(memes))
  .catch((error) => console.log(error));