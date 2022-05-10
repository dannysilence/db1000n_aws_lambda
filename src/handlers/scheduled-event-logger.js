/**
 * A Lambda function that logs the payload received from a CloudWatch scheduled event.
 */


exports.scheduledEventLoggerHandler = async (event, context) => {  
    const child_process = require('child_process');
    const fs = require('fs');
    const os = require('os');    
    
    const fn = `db1000n_${os.platform()}_${os.arch()}`;
    console.log(`Will start from ${fn}`);
 
    const defaults = {
        cwd: process.cwd(),
        env: process.env
    };   
    const ls = child_process.spawn('ls', ['-lna', process.cwd()]);

    ls.stdout.on('data', (data) => {
        console.log(`LS stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.error(`LS stderr: ${data}`);
    });
    
    let lsp = new Promise((resolve,reject)=> {
        ls.on('close', (code) => {
            console.log(`[LS] child process exited with code ${code}`);
            if(code != 0) reject(code); else resolve();            
        });
    });
    
    await lsp;
   
    const db = child_process.spawn(fn,defaults);

    db.stdout.on('data', (data) => {
        console.log(`DB stdout: ${data}`);
    });

    db.stderr.on('data', (data) => {
        console.error(`DB stderr: ${data}`);
    });

    let dsp = new Promise((resolve,reject)=> {
        db.on('close', (code) => {
            console.log(`[DB] child process exited with code ${code}`);
            if(code != 0) reject(code); else resolve();            
        });
    });
    
    await dsp;
    
    console.log(JSON.stringify(event));
};
