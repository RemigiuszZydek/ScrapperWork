import https from 'https';
import cheerio from "cheerio";
import {meme} from './meme_type'

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
  });   // Gets full website to string.

  const getMeme = (html: string): cheerio.Cheerio => {
    const $ = cheerio.load(html);
    const fullMeme = $(
      "body > main > div.container-fluid > div.row.feed-top-padding > div.col-sm-8.col-xs-12> div.media-element-wrapper"
    );
    return fullMeme;
  }; // Gets only memes to string
    
  const getMemeInfo=(getMeme: cheerio.Element):meme[]=>{
    const memes : meme[]=[];
    const $ = cheerio.load(getMeme);
    const url = $('div > div').attr('data-image');
    const title = $('div >div > div > div.content > h2 > a ').text().trim().replace("\n","");
    const likes = $('div>div').attr('data-vote-up');
    const dislikes = $('div>div').attr('data-vote-down');
    const autor = $('div > div > div.user-bar > div > a > span.name').text()
    memes.push({
      url:url,
      title: title,
      likes: likes,
      dislikes:dislikes,
      autor:autor
    })
     return memes;
  } // Takes info about memes
  
  export async function fullScrap(){ 
    getUrl("kwejk.pl")
  .then(getMeme)
  .then((getMeme) => {
    let memes: meme[] = [];
    getMeme.each((_, getMeme) => (memes = memes.concat(getMemeInfo(getMeme))));
    return memes;
    }).then((memes)=>console.log(memes))
  } // Function that logs all memes
  

  export async function randomMeme(){ 
  
    getUrl("kwejk.pl")
  .then(getMeme)
  .then((getMeme) => {
    let memes: meme[] = [];
    getMeme.each((_, getMeme) => (memes = memes.concat(getMemeInfo(getMeme))));
    const i = Math.floor(Math.random() * memes.length);
    console.log(memes[i]);
    console.log(i);
  })
  } // Function that logs random 1 meme
  
  
  
  
    
  
  

  


  

  