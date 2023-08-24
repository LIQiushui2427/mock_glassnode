import Axios from "axios";

export const fetchGlassNodeData = (symbol: string, classType: string, data: string ,interval: string) => {
    return Axios.get(`/${classType}/${data}`, {
        params: {
            'a': symbol,
            'api_key': '2RCN5Xk7lniklWmk09fVVmPq5L9',
            'i': interval,
            's': '1582243200',
            'timestamp_format': 'humanized',
        },
    });
};