// mujhe link dedo, mai 8 files ka link tumhe laakr dedunga
// aur firr tum unki issue mai jaakr data scrap krlena

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const issues = require("./issues.js");


// let url ="https://github.com/topics/electron";
let base_url ="https://github.com/";

function processTopic(url,filePath){

    request(url, function(err, response, body){
        if(err == null && response.statusCode != 404){
            getRepos(body,filePath);
        }
        else{
            console.log(err);
            console.log(response.statusCode);
        }
    });
    
}

function getRepos(body,filePath){
    let $ = cheerio.load(body);

    // Note :- There are 2 links present
    let repoArr = $("h1.f3.color-text-secondary.text-normal.lh-condensed a.text-bold").slice(0,8);
    // console.log(repoArr.length);

    for(let i =0;i< repoArr.length;i++){
        let link = $(repoArr[i]).attr("href");
        let TempArr = link.split("/");
        let TopicName = TempArr[TempArr.length-1];
        
        let newfilePath = path.join(filePath,TopicName);
        fs.mkdirSync(newfilePath);
        let fullLink = base_url + link+"/issues";

        // by appending issues to the link we'll reach to the issues page
        // console.log(fullLink);
        issues.getIssues(fullLink,newfilePath);
        // make calls so that we can access the issues and access the data
        console.log(fullLink);
    }
}

// processTopic(url,"abc");

// iska processTopic export krva do
module.exports= {processTopic :processTopic};