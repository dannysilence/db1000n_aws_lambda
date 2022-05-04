/**
 * A Lambda function that logs the payload received from a CloudWatch scheduled event.
 */


exports.scheduledEventLoggerHandler = async (event, context) => {  
    const child_process = require('child_process');
    const fs = require('fs');
    
 
    const defaults = {
        cwd: process.cwd(),
        env: process.env
    };   
    const ls = child_process.spawn('ls', ['-lna', process.cwd()]);

    ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    });
    
    let p = new Promise((resolve,reject)=> {
        setTimeout(() => {
            resolve();
        }, 120000)
    });
    await p;
    /*const db = child_process.spawn('db1000n',defaults);

    db.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    });

    db.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    db.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });    */                                 
  
};
