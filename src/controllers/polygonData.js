import axios from 'axios'

export async function getPolygonData(searchCriteria) {
    let returnObj = {
        ticker: '',
        prices: [],
        color: []
    }
    function addZero(str) {
        if (str >= 10) {
            return str
        } else {
            return '0' + str
        }
    }

    function quarterFunction(num) {
        let dictionary = {
            0: 2,
            1: 2,
            2: 2,
            3: 3,
            4: 3,
            5: 3,
            6: 4,
            7: 4,
            8: 4,
            9: 1,
            10: 1,
            11: 1
        }
        return dictionary[num]
    }

    function monthFunction(num) {
        let dictionary = {
            0: 2,
            11: 1,
            1: 3,
            2: 4,
            3: 5,
            4: 6,
            5: 7,
            6: 8,
            7: 9,
            8: 10,
            9: 11,
            10: 12,

        }
        return dictionary[num]
    }
    function monthMinuteFunction(num) {
        let dictionary = {
            0: 1,
            1: 2,
            2: 3,
            3: 4,
            4: 5,
            5: 6,
            6: 7,
            7: 8,
            8: 9,
            9: 10,
            10: 11,
            11: 12
        }
        return dictionary[num]
    }
    function dateTranslator(timeframe, date) {
        if (timeframe == 'day') {
            return (monthFunction(date.getMonth())) + '/' + date.getDate() + '/' + (date.getFullYear())
        } else if (timeframe == 'year') {
            // dateUnits = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
            return 'Year ' + (date.getFullYear() + 1)
        } else if (timeframe == 'quarter') {
            return 'Quarter ' + quarterFunction(date.getMonth()) + '/' + date.getFullYear()
        } else if (timeframe === 'month') {
            return (monthFunction(date.getMonth())) + '/' + (date.getFullYear())
        } else if (timeframe === 'hour') {
            return (monthMinuteFunction(date.getMonth())) + '/' + date.getDate() + '/' + (date.getFullYear()) + 'Hour: ' + date.getUTCHours()
        } else if (timeframe === 'minute') {
            return (monthMinuteFunction(date.getMonth()) + '/' + date.getDate() + '/' + (date.getFullYear()) + 'Hour: ' + date.getUTCHours() + 'Minute: ' + date.getUTCMinutes())
        }
    }
    console.log('searchCriteria', searchCriteria)
    let start = `${searchCriteria[0][0]['startDate'].getUTCFullYear()}-${addZero(searchCriteria[0][0]['startDate'].getUTCMonth() + 1)}-${addZero(searchCriteria[0][0]['startDate'].getUTCDate())}`
    let end = `${searchCriteria[0][0]['endDate'].getUTCFullYear()}-${addZero(searchCriteria[0][0]['endDate'].getUTCMonth() + 1)}-${addZero(searchCriteria[0][0]['endDate'].getUTCDate())}`
    let ticker = searchCriteria[1]
    let timeframe = searchCriteria[2]

    try {
        // https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2022-07-22/2022-08-22?adjusted=true&sort=asc&limit=120&apiKey=XJSiWX8uu09NreaDDbnpgaIoBNyEZbK9
        return await axios.get(
            `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/${timeframe}/${start}/${end}?adjusted=true&sort=asc&limit=5000&apiKey=XJSiWX8uu09NreaDDbnpgaIoBNyEZbK9`)
            .then((resp) => {
                returnObj['ticker'] = resp.data.ticker
                for (let i = 0; i < resp.data.results.length; i++) {

                    let curr = resp.data.results[i]
                    let date = new Date(curr['t']);
                    let dateUnits = dateTranslator(timeframe, date)
                    console.log('date.getMonth()', date.getMonth())
                    // Math.floor(date.getMonth() / 3)
                    // date.getDate())

                    let setObj = {
                        x: dateUnits,
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
                }
                return returnObj
            })
    } catch (err) {
        console.log('err', err)
    }
}