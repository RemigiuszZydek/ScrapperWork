export class meme  {
    url:string|undefined;
    title:string;
    likes:string|undefined;
    dislikes: string|undefined;
    autor:string;

    constructor(url: string,title: string,likes: string,dislikes:string|undefined,autor: string){
      this.url=url;
      this.title=title;
      this.likes=likes;
      this.dislikes=dislikes;
      this.autor=autor;
    }
  };