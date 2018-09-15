import * as lruCache from 'lru-cache';
import { forDate } from 'fixer-api';
import { IFixerResponse } from 'fixer-api/dist/lib/Fixer';

const MAX_AGE = 1000 * 60 * 60 * 2; // 2 hours
const MAX_RECORDS = 50;

const CACHE_OPTIONS = {
    max: MAX_RECORDS,
    maxAge: MAX_AGE
};

const cache = lruCache<string, IFixerResponse>(CACHE_OPTIONS);

const getRates = (ratesDate: Date): Promise<IFixerResponse> => {
    let date: Date;
    if (ratesDate.getTime() > Date.now()) {
        date = new Date;
    } else {
        date = ratesDate;
    }

    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    const dateRates = cache.get(dateString);

    if (dateRates) {
        return Promise.resolve(dateRates);
    }

    return forDate(date, { access_key: process.env.FIXER_API_KEY })
        .then((data: IFixerResponse) => {
            cache.set(dateString, data);
            return data;
        });
};

const getCurrencyRate = (code: string, rates: IFixerResponse): number => {
    if (rates.base === code) {
        return 1;
    }

    return rates.rates[code];
};

export const getRate = (c1: string, c2: string, date: Date): Promise<number> => {
    if (c1 === c2) {
        return Promise.resolve(1);
    }

    return getRates(date)
        .then((data: IFixerResponse) => {
            const rate1 = getCurrencyRate(c1, data);
            const rate2 = getCurrencyRate(c2, data);
            return rate1 / rate2;
        });
};
