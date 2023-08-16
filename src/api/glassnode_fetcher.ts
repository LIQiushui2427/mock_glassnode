import Axios from "axios";

export const fetchGlassNodeData = (classType: string, data: string) => {
    return Axios.get(`/${classType}/${data}`, {
        params: {
            'a': 'btc',
            'api_key': '2RCN5Xk7lniklWmk09fVVmPq5L9',
            'i': '24h',
            's': '1582243200',
            'timestamp_format': 'humanized',
        },
    });
};