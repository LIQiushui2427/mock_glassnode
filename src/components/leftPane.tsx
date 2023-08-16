// LeftPane.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './leftPaneStyles.css';
import NightModeSwitch from './nightModeSwitch';
interface LeftPaneProps {
    chartRoutes: Array<{ label: string; route: string }>;
    nightMode: boolean;
    onNightModeChange: (newNightMode: boolean) => void;
}

interface RequestParams {
    class: string;
    data: string;
}

const LeftPane: React.FC<LeftPaneProps> = ({ chartRoutes, nightMode, onNightModeChange }) => {
    const handleNightModeChange = (nightMode: boolean) => {
        console.log('nightMode', nightMode);
    };

    return (
        <div className="left-pane">
            <h2>Charts</h2>
            <ul>
                {chartRoutes.map((chartRoute, index) => (
                    <li key={index}>
                        <Link to={chartRoute.route}>{chartRoute.label}</Link>
                    </li>
                ))}
            </ul>
            <NightModeSwitch nightMode={nightMode} onNightModeChange={onNightModeChange} />
        </div> 
    );
};

export default LeftPane;