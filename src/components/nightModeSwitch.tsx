import React, { useState } from 'react';
import './nightModeSwitchStyles.css'; // Import the CSS for NightModeSwitch styles

interface NightModeSwitchProps {
    nightMode: boolean;
    onNightModeChange: (newNightMode: boolean) => void;
}
const NightModeSwitch: React.FC<NightModeSwitchProps> = ({ nightMode, onNightModeChange }) => {

    const handleSwitchChange = () => {
        onNightModeChange(!nightMode); // Toggle the night mode state
    };

    return (
        <div className="night-mode-switch">
            <div className="switch-title">Night Mode</div>
            <label className="switch">
                <input type="checkbox" checked={nightMode} onChange={handleSwitchChange} />
                <span className="slider"></span>
            </label>
        </div>
    );
};

export default NightModeSwitch;
