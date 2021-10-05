const {exec, spawn} = require('child_process');
//both
//CMD DIREKT
exec('node --version', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  if (stdout) console.log('STDOUT', stdout);
  if (stderr) console.error('STDERR', stderr);
});

const excCmdFile = () => {
  const bat = spawn('"test.cmd"', ['a', 'b'], {shell: true});
  bat.stdout.on('data', data => {
    console.log(data.toString());
  });

  bat.stderr.on('data', data => {
    console.error(data.toString());
  });

  bat.on('exit', code => {
    console.log(`Child exited with code ${code}`);
  });

  //BAT ausführen
  exec('"test.bat"', (err, stdout, stderr) => {
    if (err) console.error(err);
    if (stdout) console.log('STDOUT', stdout);
    if (stderr) console.error('STDERR', stderr);
  });
};

const excBash = () => {
  const ls = spawn('ls', ['-lh', '/usr']);
  ls.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  });

  ls.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });
};

const excCmdCommand = () => {
  const bat = spawn('cmd.exe', ['/c', 'node --version']);
  bat.stdout.on('data', data => {
    console.log(data.toString());
  });

  bat.stderr.on('data', data => {
    console.error(data.toString());
  });

  bat.on('exit', code => {
    console.log(`Child exited with code ${code}`);
  });
};

excBash();
