process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (txt) => {
    process.stdout.write(txt.toUpperCase())
})