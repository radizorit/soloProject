// const axios = require('axios')
// var fs = require('fs');


// async function polygonApi() {
//     let arr = []
//     await axios.get(`https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&sort=ticker&order=asc&limit=1000&apiKey=XJSiWX8uu09NreaDDbnpgaIoBNyEZbK9`)
//         .then((resp) => {
//             resp.data.results.forEach((el) => {
//                 arr.push(el['ticker'])
//             })
//         })
//         .then((data) => {
//             axios.get(`https://api.polygon.io/v3/reference/tickers?market=crypto&active=true&sort=ticker&order=asc&limit=1000&apiKey=XJSiWX8uu09NreaDDbnpgaIoBNyEZbK9`)
//                 .then((resp) => {
//                     resp.data.results.forEach((el) => {
//                         arr.push(el['ticker'])
//                     })
//                 })
//         })
//         .then((final) => {
//             fs.writeFileSync('listOfTickers.csv', arr.join('\n'))
//         })
// }
// polygonApi()

// console.log(new Date())

let arr = []
for (let i = 0; i < 100; i++) {
    arr.push(Math.floor(Math.random() * 100))
}

console.log(arr.sort())
