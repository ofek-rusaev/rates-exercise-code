import axios from 'axios';
import { storageService } from './storage.service';

const baseUrl = 'https://www.live-rates.com/rates';
const KEY = 'ratesDB';
export const REFRESH_TIME = (1000 * 60 * 20);

function shouldGetRatesFromAPI(rates) {
    return !(rates && rates.modifiedAt + REFRESH_TIME > Date.now());
}

async function getRates() {
    const ratesFromStorage = storageService.load(KEY);
    if (shouldGetRatesFromAPI(ratesFromStorage)) {
        return await axios.get(baseUrl)
            .then(res => {
                const rates = res.data;
                if (rates.length > 1) storageService.store(KEY, rates);
                return rates;
            })
            .catch(error => console.error(error));
    }
    return ratesFromStorage.data;
}

function query() {
    return getRates();
}

export const ratesService = {
    getRates,
    query
}