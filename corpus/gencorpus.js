const fs = require('fs');
const path = require('path');

const corpuspath = path.resolve(__dirname, 'text', 'corpus.txt');

let data = fs.readFileSync(__dirname + '/text/output.txt', {
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
        encoding: 'utf8'
    });

    console.log('Done!');

} else {
    console.log('File already exists at ' + corpuspath);
}