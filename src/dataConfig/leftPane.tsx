import {dict} from './tickersCompare';

const ChartRoutes = Object.entries(dict).map(([label, requestParams]) => ({
    label,
    route: `/${requestParams.data}`, // You can adjust the route format as needed
    requestParams,
    chartType: 'regular', // Indicate that this is a regular chart
}));

// Add the "Compare" route separately
ChartRoutes.push({
    label: 'Compare',
    route: '/compare',
    requestParams: {symbol:'', class: 'compare', data: '', interval: '' },
    chartType: 'compare', // Indicate that this is a compare chart
});
interface SymbolMappings {
    [key: string]: string;
}
const symbols: SymbolMappings = {
    'Bitcoin': 'btc',
    'Ethereum': 'eth',
    'Litecoin': 'ltc',

    'Binance USD': 'busd',
    'Dai': 'dai',
    'Frax': 'frax',
    'Gemini Dollar': 'gusd',
    'HUSD': 'husd',
    'Paxos Standard': 'usdp',
    'Rai Reflex Index': 'rai',
    'STASIS Euro': 'eurs',
    'Tether USDt': 'usdt',
    'TrueUSD': 'tusd',
    'USD Coin': 'usdc',
    'USDD': 'usdd',
    'sUSD': 'susd',
}

const intervals = ['24h', '1h'];

export { ChartRoutes, symbols, intervals };