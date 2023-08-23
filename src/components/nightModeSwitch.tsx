import React, { useState } from 'react';
import './nightModeSwitchStyles.css'; // Import the CSS for NightModeSwitch styles
import { Button } from 'react-bootstrap';
interface NightModeSwitchProps {
    nightMode: boolean;
    onNightModeChange: (newNightMode: boolean) => void;
}
const NightModeSwitch: React.FC<NightModeSwitchProps> = ({ nightMode, onNightModeChange }) => {

    const handleSwitchChange = () => {
        onNightModeChange(!nightMode); // Toggle the night mode state
    };

    return (
        <div className="nightModeSwitch">
        <Button variant="outline-secondary" onClick={handleSwitchChange}>
            {nightMode ? 'Light Mode' : 'Night Mode'}
        </Button>
        </div>
    );
};

export default NightModeSwitch;
