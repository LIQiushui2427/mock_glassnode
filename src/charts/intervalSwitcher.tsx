import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { intervals } from "../dataConfig/leftPane";

interface IntervalSwitcherProps {
  interval: string;
  setInterval: (interval: string) => void;
}

const IntervalSwitcher: React.FC<IntervalSwitcherProps> = ({ interval, setInterval }) => {

  const handleSwitchInterval = (intervalValue: string) => {
    setInterval(intervalValue);
    };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="interval-dropdown">
        {interval}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {intervals.map((optionInterval) => (
          <Dropdown.Header key={optionInterval} onClick={() => handleSwitchInterval(optionInterval)}>
            {optionInterval}
          </Dropdown.Header>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default IntervalSwitcher;
