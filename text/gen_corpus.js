const fs = require('fs');
const path = require('path');

const corpuspath = path.resolve(__dirname, "results", "corpus.txt");

let data = fs.readFileSync(__dirname + "/results/output.json", {
    encoding: 'utf8'
});
data = data.replace(/\]\[/g,',');
data = JSON.parse(data);

console.log(data.length + ' entries.');

let exists = fs.existsSync( corpuspath );

if (!exists){

    console.log('Generating corpus.');

    let array = [];

    data.map( (item)=>{
        array.push(item.body);
    });

    fs.writeFileSync(corpuspath, array.join(), {
        encoding: 'utf-8'
    });

    console.log('Done!');

} else {
    console.log('File already exists at ' + corpuspath);
}

function sanitize (_input) {
  let string = _input || "";

  // remove hyperlinks
  string = string.replace(/http:\/\/.*..*/g,'');

  string = string.replace(/\r/g, '');
  string = string.replace(/\n/g, '');
  string = string.replace(/#/g, '');
  string = string.replace(/\*/g, '');
  string = string.replace(/\//g, '');
  string = string.replace(/\\/g, '');
  // string = string.replace(/BrooklynJS Talk Submission/g,'');

  // try to get descriptions only
  string = string.match(/Description:[\s\S]*Name/g) || string;

  if (Array.isArray(string)){
    string = string.join('');
  }

  string = string.replace(/[Dd]escription/g,'');
  string = string.replace(/[Nn]ame/g,'');
  string = string.replace(/:/g,'');
  string = string.replace(/\[/g,'');
  string = string.replace(/\]\(.*\)/g,'');
  //
  // input = input.replace(/:/g, '');

  return string;
}
