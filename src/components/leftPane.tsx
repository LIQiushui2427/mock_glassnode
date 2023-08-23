// LeftPane.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './leftPaneStyles.css';
import NightModeSwitch from './nightModeSwitch';
import { ChartRoutes } from '../dataConfig/leftPane';
interface LeftPaneProps {
    chartRoutes: Array<{ label: string; route: string }>;
    nightMode: boolean;
    onNightModeChange: (newNightMode: boolean) => void;
}

const LeftPane: React.FC<LeftPaneProps> = ({ chartRoutes, nightMode, onNightModeChange }) => {
    const navigate = useNavigate();

    return (
        <div className="left-pane">
            <h2>Select your chart</h2>
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