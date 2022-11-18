# Scrapper for Work

Program to scrap data from "kwejk.pl" website and show it at console.


## Installation
1. Clone repository.
2. After you cloned repository, go to folder SCRAPPERWORK and install all modules using:

```bash
  npm i
```
3. To run program use:
```bash
  npm run main
```
## Meme Class type
###  Code Representation
```typescript
class meme  {
    url:string|undefined;
    title:string;
    likes:string|undefined;
    dislikes: string|undefined;
    autor:string;

    constructor(url: string,title: string,likes: string,dislikes: string,autor: string){
      this.url=url;
      this.title=title;
      this.likes=likes;
      this.dislikes=dislikes;
      this.autor=autor;
    }
  };
  ```
### Console Representation
```bash
{
  url: 'https://i1.kwejk.pl/k/obrazki/2022/11/r0FscRaRTm5Jb3HH.jpg',
  title: 'Zimno.',
  likes: '58',
  dislikes: '8',
  autor: 'Orravandrel'
}
```
