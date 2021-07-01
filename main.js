
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const topics = require("./topics.js");

let cwd = process.cwd();
// console.log(cwd);

let url = "https://github.com/topics";
let base_url ="https://github.com/";


request(url,function(err,response, body){
    if(err == null && response.statusCode != 404){
        processTopicsPage(body);
    }
    else{
        console.log(err);
        console.log(response.statusCode);
        
    }
});


function processTopicsPage(body){
    let $ = cheerio.load(body);
    let topicsArr =$(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i =0 ;i<topicsArr.length ;i++){
        let link = $(topicsArr[i]).attr("href");
        let fullLink = base_url +link;
        // console.log(fullLink);
        
        let arr = link.split("/");
        let fileName = arr[arr.length-1];
        // console.log(fileName);
        
        let filePath = path.join(cwd,fileName);
        
        // console.log(filePath);
        
        if(!fs.existsSync(filePath)){
            fs.mkdirSync(filePath);
        }
        topics.processTopic(fullLink,filePath);

    }

}

/**
 * Disign m my approach was :- low coupling and high cohession
 */

