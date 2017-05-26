const fs = require('fs');

function getData(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(name, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data.toString());
        })
    })
}
async function getAllData() {
    const operate1 = await getData('./asyncText1.txt');
    const operate2 = await getData('./asyncText2.txt');
    console.log('operate2:', operate2)
    console.log('finished')
    return operate1 + operate2; 
}
getAllData().then(res => {
    console.log('res:', res)
});
console.log('outside')