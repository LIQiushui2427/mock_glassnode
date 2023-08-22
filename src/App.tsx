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
interface DataItem {
  t: string;
  o: {
      [key: string]: number;
  };
}
const keys = ['a', 'b'];

function App() {
    const [appNightMode, setAppNightMode] = useState(false);

    const handleAppNightModeChange = (newNightMode: boolean) => {
        setAppNightMode(newNightMode);
    };


    return (
        <Router>
            <div className={`app ${appNightMode ? 'dark-theme' : 'light-theme'}`}>
                <LeftPane
                    chartRoutes={ChartRoutes}
                    nightMode={appNightMode}
                    onNightModeChange={handleAppNightModeChange}
                />
                <div className="chart-container">
                    <Routes>
                        {ChartRoutes.map((ChartRoute, index) => {
                            if (ChartRoute.chartType === 'regular') {
                                return (
                                    <Route
                                        key={index}
                                        path={ChartRoute.route}
                                        element={<Chart requestParams={ChartRoute.requestParams} />}
                                    />
                                );
                            } else if (ChartRoute.chartType === 'compare') {
                                return (
                                    <Route
                                        key={index}
                                        path={ChartRoute.route}
                                        element={<CompareChart/>}
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

