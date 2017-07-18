const args = {
    '-h': displayHelp,
    '-r': readFile
}
function displayHelp() {
    console.log('Argument processor: ', args)
}
function readFile(file) {
    if (file && file.length) {
        console.log('Reading: ', file);
        console.time('read');
        const stream = require('fs').createReadStream(file);
        stream.on('end', () => {
            console.timeEnd('read')
        })
        stream.pipe(process.stdout)
    } else {
        console.error('A file must be provide with the -r option')
        process.exit(1)
    }
}
if (process.argv.length > 0){
    // console.log('process.argv: ', process.argv)
    process.argv.forEach((arg, index) => {
        if (typeof args[arg] == 'function') {
            args[arg].apply(this, process.argv.slice(index + 1))
            // args[arg](process.argv.slice(index + 1)) 错误，此时执行作用域为args
        }
    })
}