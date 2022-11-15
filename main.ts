import { question} from "readline-sync";
import { exit } from "process";

function main() : void {;
    const question1 : string=question
    ('Welcome to scrapper. What do You want to do ? \n1.Full scrap meme site\n2.Random 1 meme\n3.Quit\n: ');
    const validInputs : boolean= input(question1);
    if(validInputs){
        if(question1==='1'){

        }
        if(question1==='2'){

        }
        if(question1==='3'){
            return process.exit();
        }
    }
    else {
        console.log("Wrong input.")
main()
}
}
    main()

function input (str:string):boolean{
    const inputs = str;
    const validInput :boolean = Boolean(inputs==='1'||inputs==='2'||inputs==='3');
    return validInput;
}
