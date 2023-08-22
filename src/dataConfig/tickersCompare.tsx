import { RequestParams } from "../charts/myChart";

const dict: { [key: string]: RequestParams } = {
    'Funding rate': { class: 'derivatives', data: 'futures_funding_rate_perpetual_all' },
    'Open interest': { class: 'derivatives', data: 'futures_open_interest_perpetual_sum_all' },
};

export { dict };