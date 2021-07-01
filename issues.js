// mujhe link dedo, mai 8 files ka link tumhe laakr dedunga
// aur firr tum unki issue mai jaakr data scrap krlena

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfDocument = require("pdfkit");


// let url ="https://github.com//microsoft/vscode/issues";
let base_url ="https://github.com/";

function getIssues(url,filePath){

    request(url, function(err, response, body){
        if(err == null && response.statusCode != 404){
            processIssues(body,filePath);
        }
        else{
            console.log(err);
            console.log(response.statusCode);
        }
    });
    
}

function processIssues(body,filePath){
    let newfilePath= path.join(filePath,"issues.json");
    let pdfPath = path.join(filePath,"issues.pdf")
    let $ = cheerio.load(body);
    let arr = $(".js-navigation-open.markdown-title");
    console.log(arr.length);
    let issuesArr = [];

    for(let i=0;i<arr.length;i++){
        let fullLink = base_url + $(arr[i]).attr("href");
        // console.log(fullLink);
        issuesArr.push(fullLink);
    }

    let text = JSON.stringify(issuesArr);
    fs.writeFileSync(newfilePath,text);

    let pdfDoc = new pdfDocument();
    pdfDoc.pipe(fs.createWriteStream(pdfPath));
    pdfDoc.text(text);
    pdfDoc.end();
    console.log(issuesArr);
}

// getIssues(url);

// Iska getIssues public krdo

module.exports = {getIssues:getIssues};