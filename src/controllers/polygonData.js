import axios from 'axios'

export async function getPolygonData(searchCriteria) {
    let returnObj = {
        ticker: '',
        prices: [],
        color: []
    }
    // let start = '2021-08-01',
    //     end = '2021-09-13',
    //     range = 'day'
    function addZero(str) {
        if (str >= 10) {
            return str
        } else {
            return '0' + str
        }
    }
    console.log('searchCriteria', searchCriteria)
    let start = `${searchCriteria[0][0]['startDate'].getUTCFullYear()}-${addZero(searchCriteria[0][0]['startDate'].getUTCMonth() + 1)}-${addZero(searchCriteria[0][0]['startDate'].getUTCDate())}`
    let end = `${searchCriteria[0][0]['endDate'].getUTCFullYear()}-${addZero(searchCriteria[0][0]['endDate'].getUTCMonth() + 1)}-${addZero(searchCriteria[0][0]['endDate'].getUTCDate())}`
    let ticker = searchCriteria[1]
    let range = 'day'

    try {
        // console.log(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/${range}/${start}/${end}?adjusted=true&sort=asc&limit=120&apiKey=XJSiWX8uu09NreaDDbnpgaIoBNyEZbK9`)
        // console.log(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2022-07-22/2022-08-22?adjusted=true&sort=asc&limit=120&apiKey=XJSiWX8uu09NreaDDbnpgaIoBNyEZbK9`)
        return await axios.get(
            `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/${range}/${start}/${end}?adjusted=true&sort=asc&limit=5000&apiKey=XJSiWX8uu09NreaDDbnpgaIoBNyEZbK9`)
            .then((resp) => {
                console.log(resp)
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
                    returnObj['prices'].push(setObj)

                    if (curr['o'] > curr['c']) {
                        returnObj['color'].push('red')
                    } else {
                        returnObj['color'].push('green')
                    }
                    //if open > close then red else green
                }
                console.log('returnObj', returnObj)
                return returnObj
            })
    } catch (err) {
        console.log('err', err)
    }
}