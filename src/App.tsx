// src/App.js
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ReactEcharts from "echarts-for-react"; 
import { request } from "http";
import GLASSNODE_API_KEY from './api';
import Chart from './charts/myChart';
import Axios from "axios";
import LeftPane from './components/leftPane';
import './styles.css';
import './themes.css';
import CompareChart from './charts/compareChart';
import { ChartRoutes } from './dataConfig/leftPane';

const keys = ['a', 'b'];

function App() {
    const [appNightMode, setAppNightMode] = useState(false);
    const [symbol, setSymbol] = useState('btc');
    const [ChartRoutesLeftPane, setRoutesLeftPane] = useState(ChartRoutes);
    const handleAppNightModeChange = (newNightMode: boolean) => {
        setAppNightMode(newNightMode);
    };

    useEffect(() => {
        const updatedChartRoutes = ChartRoutes.map((ChartRoute) => {
            return {
            ...ChartRoute,
            requestParams: {
                ...ChartRoute.requestParams,
                symbol: symbol
            }
            };
        }) as typeof ChartRoutes;
        setRoutesLeftPane(updatedChartRoutes);
    }, [symbol]);

    return (
        <Router>
            <div className={`app ${appNightMode ? 'dark-theme' : 'light-theme'}`}>
                <LeftPane
                    chartRoutes={ChartRoutesLeftPane}
                    nightMode={appNightMode}
                    symbol={symbol}
                    setSymbol={setSymbol}
                    onNightModeChange={handleAppNightModeChange}
                />
                <div className="chart-container">
                    <Routes>
                        {ChartRoutesLeftPane.map((ChartRoute, index) => {
                            if (ChartRoute.chartType === 'regular') {
                                return (
                                    <Route
                                        key={index}
                                        path={ChartRoute.route}
                                        element={<Chart title = {ChartRoute.label} requestParams={ChartRoute.requestParams} />}
                                    />
                                );
                            } else if (ChartRoute.chartType === 'compare') {
                                return (
                                    <Route
                                        key={index}
                                        path={ChartRoute.route}
                                        // element={<CompareChart symbol = {ChartRoute.requestParams.symbol}/>}
                                        element={<CompareChart symbol = {'btc'}/>}
                                    />
                                );
                            }
                            return null; // Handle other cases if needed
                        })}
                    </Routes>
                </div>
            </div>
        </Router>
    );}
export default App;

