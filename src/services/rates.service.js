import axios from 'axios';
import { storageService } from './storage.service';

const baseUrl = 'https://www.live-rates.com/rates';
const KEY = 'ratesDB'
// let gRates = _createRates();
let gRates = require('../data/rates.json');

var myInter;

function dataRefresher() {
    myInter = setInterval(getRates, 1000 * 60 * 20)
}

async function _createRates() {
    let rates = storageService.load(KEY)
    if (!rates || !rates.length) {
        rates = await getRates();
        dataRefresher();
    }
    return rates;
}

async function getRates() {
    let lastUpdate = new Date();
    console.log('GOT RATES AT: ', lastUpdate);
    return await axios.get(baseUrl)
        .then(res => {
            const rates = res.data;
            console.log('GOT RATES: ', rates);
            if (rates.length > 1) storageService.store(KEY, rates);
            return res.data;
        })
        .catch(error => console.error(error));
}

function query() {
    return gRates;
}

export const ratesService = {
    getRates,
    query
}