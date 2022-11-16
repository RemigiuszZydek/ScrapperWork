export class meme  {
    url:string|undefined;
    title:string;
    likes:string|undefined;
    autor:string;

    constructor(url: string,title: string,likes: string,autor: string){
      this.url=url;
      this.title=title;
      this.likes=likes;
      this.autor=autor;
    }
  };