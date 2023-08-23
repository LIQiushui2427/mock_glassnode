import { RequestParams } from "../charts/myChart";

const dict: { [key: string]: RequestParams } = {    
    'Options ATM IV': { class: 'derivatives', data: 'options_atm_implied_volatility_all' },
    'Options 25 Delta Skew': { class: 'derivatives', data: 'options_25delta_skew_all' },
    'Funding rate': { class: 'derivatives', data: 'futures_funding_rate_perpetual_all' },
    'Open interest': { class: 'derivatives', data: 'futures_open_interest_perpetual_sum_all' },
    'Futures perpetual volume': { class: 'derivatives', data: 'futures_volume_daily_perpetual_sum_all' },
    'Ratio of long liquidations': { class: 'derivatives', data: 'futures_liquidated_volume_long_relative' },

    'Accumulation addresses': { class: 'addresses', data: 'accumulation_count' },
    'Net volume of miners': { class: 'transactions', data: 'transfers_volume_miners_net' },
    'Long term holders in profit': { class: 'supply', data: 'lth_profit_sum' },
    'Short term holders in profit': { class: 'supply', data: 'sth_profit_sum' },
    'Long term holders in loss': { class: 'supply', data: 'lth_loss_sum' },
    'Short term holders in loss': { class: 'supply', data: 'sth_loss_sum' },
    'Whales (>1k BTC)': { class: 'entities', data: 'min_1k_count' },
    'Miners\' supply': { class: 'supply', data: 'supply_miners_to_exchanges_sum' },
    'Supply held in miners addresses': { class: 'distribution', data: 'balance_miners_all' },
    'Miner btc outflow' : { class: 'mining', data: 'miners_outflow_multiple' },
    'revived_supply5' : { class: 'supply', data: 'revived_more_5y_sum' },
    'revived_supply3' : { class: 'supply', data: 'revived_more_3y_sum' },

    'Supply held on exchange addresses' : { class: 'distribution', data: 'balance_exchanges_relative' },
    'Exchange fees' : { class: 'fees', data: 'exchanges_sum' },
    'Long term holders in profit transfer volume to exchanges' : { class: 'transactions', data: 'transfers_volume_lth_to_exchanges_profit_sum' },
    'Short term holders in profit transfer volume to exchanges' : { class: 'transactions', data: 'transfers_volume_lth_to_exchanges_profit_sum' },
    'Realized pnl exchange' : { class: 'indicators', data: 'realized_profit_loss_lth_sth_to_exchanges_relative' },

    'Whales (>1k BTC) deposit' : { class: 'transactions', data: 'transfers_volume_whales_to_exchanges_sum' },
    'Whales (>1k BTC) withdrawal' : { class: 'transactions', data: 'transfers_volume_exchanges_to_whales_sum' },  
    // #Ratios  Signals
    'BTC Dominance, BTC MC/Total MC' : { class: 'market', data: 'btc_dominance' },
    'Mvrv' : { class: 'indicators', data: 'mvrv_account_based' },
    'Liveliness' : { class: 'indicators', data: 'liveliness' },
    'Realized cap' : { class: 'market', data: 'marketcap_realized_usd' },
    'nvt' : { class: 'indicators', data: 'nvt' },
    'Asol' : { class: 'indicators', data: 'asol' },
    'Spent volume 7y-10y' : { class: 'indicators', data: 'svl_entity_adjusted_7y_10y' },
    'Spent_volume 5y-7y' : { class: 'indicators', data: 'svl_entity_adjusted_5y_7y' },
    'Spent_volume 3y-5y' : { class: 'indicators', data: 'svl_entity_adjusted_3y_5y' },

    'Volume' : { class: 'transactions', data: 'transfers_volume_sum' },
    'Alt season' : { class: 'signals', data: 'altcoin_index' },
    'Slrv' : { class: 'supply', data: 'sth_lth_realized_value_ratio' },
    'Price(Close)' : { class: 'market', data: 'price_usd_close' },

};

export { dict };