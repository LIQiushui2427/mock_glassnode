import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import SplitButton from 'react-bootstrap/SplitButton';
import { ToggleButton } from 'react-bootstrap';
import { dict } from '../dataConfig/tickersCompare';

import './chartStyle.css';

interface CompareChartDropDownProps {
  handleLineSelect: (lineName: string) => Promise<void>;
}

const keys = Object.keys(dict);

export const CompareChartDropDown: React.FC<CompareChartDropDownProps> = ({ handleLineSelect }) => {
  return (
    <Dropdown className = "align-right">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select a line
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-right">
        {/* Here you can map over your keys and create dropdown items */}
        {keys.map(key => (
          <Dropdown.Item key={key} onClick={() => handleLineSelect(key)}>
            {key}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CompareChartDropDown;