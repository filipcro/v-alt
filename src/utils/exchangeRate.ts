import axios from 'axios';
import * as lruCache from 'lru-cache';
import { type } from 'os';

const MAX_AGE = 1000 * 60 * 60 * 2; // 2 hours

const CACHE_OPTIONS = {
    max: 100,
    maxAge: MAX_AGE
};

class currencyPair {
    rate: number;
    lastFetch: Date;
}

const cache = lruCache<string, currencyPair>(CACHE_OPTIONS);

export const getRate = (c1: string, c2: string): Promise<number> => {
    if (c1 === c2) {
        return Promise.resolve(1);
    }
    const pairString = `${c1}_${c2}`;
    const inversePairString = `${c2}_${c1}`;
    const pair = cache.get(pairString);

    if (pair && pair.lastFetch.getTime() + MAX_AGE < Date.now()) {
        return Promise.resolve(pair.rate);
    }

    return axios.get(
        'https://free.currencyconverterapi.com/api/v6/convert',
        {
            params: {
                q: pairString,
                compact: 'ultra'
            }
        }).then(({ data }) => {
            cache.set(
                pairString,
                {
                    rate: data[pairString],
                    lastFetch: new Date()
                });
            cache.set(
                inversePairString,
                {
                    rate: 1 / data[pairString],
                    lastFetch: new Date()
                });
            return data[pairString];
        });
};
