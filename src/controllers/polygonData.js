import axios from 'axios'

export async function getPolygonData() {
    let returnObj = {
        label: '',
        timeLabel: [],
        close: [],
        open: [],
        high: [],
        low: [],
        volume: [],
    }
    let start = '2021-09-01',
        end = '2021-09-13',
        range = 'day'
    //multiplier (in this case 1 is for 1 day candle)

    try {
        return await axios.get(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/${range}/${start}/${end}?adjusted=true&sort=asc&limit=5000&apiKey=XJSiWX8uu09NreaDDbnpgaIoBNyEZbK9`)
            .then((resp) => {
                returnObj['label'] = resp.data['ticker']
                console.log('resp', resp.data)
                for (let i = 0; i < resp.data.results.length; i++) {
                    let curr = resp.data.results[i]
                    let date = new Date(curr['t']);
                    returnObj['timeLabel'].push(date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear())
                    // returnObj['timeLabel'].push(getUTCDate(curr['t']))
                    returnObj['close'].push(curr['c'])
                    returnObj['open'].push(curr['o'])
                    returnObj['high'].push(curr['h'])
                    returnObj['low'].push(curr['l'])
                    returnObj['volume'].push(curr['v'])
                }
                console.log('returnObj', returnObj)
                return returnObj
                //put all data in an array
                //put all dates in another array
            })
    } catch (err) {
        console.log(err + 'err')
    }
}