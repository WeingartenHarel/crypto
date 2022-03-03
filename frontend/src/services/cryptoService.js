import HttpService from './HttpService'
// const KEY = 'itemsDB';
import axios from 'axios';

export const cryptoService = {
    query,
}

async function query(filter) {

    try {
        // console.log('query params', filter)
        const apiKEY = '3TI8HPV0B8LO3DBV'
        let date = filter.date
        let loc = filter.loc
        let url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&date=${date}&symbol=BTC&market=${loc}&apikey=${apiKEY}`;
        let result = await axios.get(url)
        .then(res => {
          console.log('res.data',res.data)
          return res.data;
         
        })
        return result 
        // return HttpService.get(`crypto/?date=${filter.date}&loc=${filter.loc}`);
    } catch (err) {
        console.log('query err',err)
        return err
    }
}

