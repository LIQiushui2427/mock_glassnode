import Dropdown from 'react-bootstrap/Dropdown';
import { symbols } from "../dataConfig/leftPane";

import React, { useState, useEffect } from "react";

interface switchSymbolProps {
    symbol: string;
    setSymbol: (symbolValue: string) => void;
}

function SwitchSymbol({ symbol, setSymbol }: switchSymbolProps) {
    const [selectedDisplayName, setSelectedDisplayName] = useState("Default: Bitcoin");

    useEffect(() => {
        if (symbol && symbols[symbol]) {
            setSelectedDisplayName(symbols[symbol]);
        }
    }, [symbol]);

    const handleSwitchSymbol = (symbolValue: string, displayName: string) => {
        setSelectedDisplayName(displayName);
        setSymbol(symbolValue);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedDisplayName}
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-right">
                {Object.entries(symbols).map(([displayName, symbolValue]) => (
                    <Dropdown.Header key={symbolValue} onClick={() => handleSwitchSymbol(symbolValue, displayName)}>
                        {displayName}
                    </Dropdown.Header>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default SwitchSymbol;
