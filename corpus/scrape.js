const https = require('https');
const path  = require('path');
const fs    = require('fs');

const id = Date.now().toString() + '-' + (Math.random() * 999).toString();

const filePath = path.resolve(__dirname, 'text', 'output_' + id);

let counter = 1;
let active = true;

fs.writeFile(filePath, '', (err)=>{
    console.log(err);
});

fetchData = () => {

    if ( !active ){
        process.exit();
    }

        console.log(`--- loop ${counter}---`);
    
        let options = {
            host: 'api.github.com',
            path: `/repos/brooklynjs/brooklynjs.github.io/issues?state=all&page=${counter}`,
            port: 443,
            headers: {            
                'User-Agent' : 'Myself'
            },
            json: true,
            method: 'GET'
        };
        options.agent = new https.Agent(options);

        let all = "";
        let req = https.request(options, (response) => {
            response.on('data', (data)=>{
                all = all + data;
            });
        });
        req.on('error', (e) => {
            console.log('error');
            console.error(e.message);
            active = false;
        });
        req.on('close', ()=>{
            if ( all.length < 3 || all.startsWith('{') ){
                active = false;
            } else {
                counter++;
                console.log('writing');
                fs.appendFileSync( filePath , all, 'utf8');
            }  
            console.log('---closing---');
        });
        req.end();

};

run = () => {
    setInterval(fetchData, 3000);
};
  
run();