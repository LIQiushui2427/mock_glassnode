// LeftPane.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './leftPaneStyles.css';
import NightModeSwitch from './nightModeSwitch';
import { ChartRoutes } from '../dataConfig/leftPane';
import SwitchSymbol from './switchSymbol';

interface LeftPaneProps {
    chartRoutes: Array<{ label: string; route: string }>;
    nightMode: boolean;
    symbol: string;
    setSymbol: (symbolValue: string) => void;
    onNightModeChange: (newNightMode: boolean) => void;
}

const LeftPane: React.FC<LeftPaneProps> = ({ chartRoutes, nightMode, symbol, setSymbol, onNightModeChange }) => {
    const navigate = useNavigate();

    return (
        <div className="left-pane">
            <SwitchSymbol symbol={symbol} setSymbol={setSymbol} />
            <NightModeSwitch nightMode={nightMode} onNightModeChange={onNightModeChange} />
            <ul>
                {chartRoutes.map((chartRoute, index) => (
                    <li key={index}>
                        <button 
                            className="chart-button" 
                            onClick={() => navigate(chartRoute.route)}>
                            {chartRoute.label}
                        </button>
                    </li>
                ))}
            </ul>
            
        </div> 
    );
};

export default LeftPane;