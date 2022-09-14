import axios from 'axios'

export async function getPolygonData() {
    let returnObj = {
        ticker: '',
        data: [],
        color: []
    }
    let start = '2021-08-01',
        end = '2021-09-13',
        range = 'day'
    //multiplier (in this case 1 is for 1 day candle)

    try {
        return await axios.get(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/${range}/${start}/${end}?adjusted=true&sort=asc&limit=5000&apiKey=XJSiWX8uu09NreaDDbnpgaIoBNyEZbK9`)
            .then((resp) => {
                returnObj['ticker'] = resp.data.ticker
                for (let i = 0; i < resp.data.results.length; i++) {
                    let curr = resp.data.results[i]
                    let date = new Date(curr['t']);
                    let setObj = {
                        x: date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear(),
                        o: curr['o'],
                        h: curr['h'],
                        l: curr['l'],
                        c: curr['c'],
                        s: [curr['o'], curr['c']]
                    }
                    returnObj['data'].push(setObj)

                    if (curr['o'] > curr['c']) {
                        returnObj['color'].push('red')
                    } else {
                        returnObj['color'].push('green')
                    }
                    //if open > close then red else green
                }
                return returnObj
            })
    } catch (err) {
        console.log('err', err)
    }
}