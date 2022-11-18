import { question} from "readline-sync";
import { exit } from "process";
import {meme} from './src/meme_type';
import {fullScrap,randomMeme} from './src/meme_scrapper';


function main() : void {;
    const question1 : string=question
    ('Welcome to scrapper. What do You want to do ? \n1.Full scrap meme site\n2.Random 1 meme\n3.Quit\n: ');
    const validInputs : boolean= input(question1);

if(!validInputs){
    console.log("Wrong input")
    setTimeout(function(){
        main()
       },500);
}
switch (question1){
        case '1':
            fullScrap();
           setTimeout(function(){
            main()
           },2000);
           break;
        case '2':
            randomMeme();
            setTimeout(function(){
                main()
               },2000);
               break;
        case '3':
            return process.exit();
}
}

main()

function input (str:string):boolean{
    const inputs = str;
    const validInput :boolean = Boolean(inputs==='1'||inputs==='2'||inputs==='3');
    return validInput;
}
