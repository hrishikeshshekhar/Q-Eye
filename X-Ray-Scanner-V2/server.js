const spawn = require('child_process').spawn();

const proc = spawn('python scripts/label_image.py', '--image Testing/test11.jpeg'); 

proc.stdout.on('data', (data) => {
  console.log(data);
});

proc.stderr.on('data', (data) => {
  console.log('stderr: ${data}');
});

proc.on('close', (code) => {
  console.log('Child processess exited with code ${code}');
});

