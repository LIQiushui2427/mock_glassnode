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
    requestParams: { class: 'compare', data: '' },
    chartType: 'compare', // Indicate that this is a compare chart
});

export { ChartRoutes };