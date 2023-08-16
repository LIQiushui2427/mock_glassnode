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

interface DataItem {
  t: string;
  o: {
      [key: string]: number;
  };
}

function App() {
    const [appNightMode, setAppNightMode] = useState(false);

    const handleAppNightModeChange = (newNightMode: boolean) => {
        setAppNightMode(newNightMode);
    };

    const chartRoutes = [
        {
            label: 'Chart 1',
            route: '/chart1',
            requestParams: { class: 'derivatives', data: 'futures_funding_rate_perpetual_all' },
        },
        {
            label: 'Chart 2',
            route: '/chart2',
            requestParams: { class: 'derivatives', data: 'futures_funding_rate_perpetual_all' },
        },
        // Add more routes as needed
    ];

    return (
        <Router>
            <div className={`app ${appNightMode ? 'dark-theme' : 'light-theme'}`}>
            <LeftPane chartRoutes={chartRoutes}
                nightMode={appNightMode} 
                onNightModeChange={handleAppNightModeChange} />
                <div className="chart-container">
                    <Routes>
                        {chartRoutes.map((chartRoute, index) => (
                            <Route
                                key={index}
                                path={chartRoute.route}
                                element={<Chart requestParams={chartRoute.requestParams} />}
                            />
                        ))}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
export default App;

