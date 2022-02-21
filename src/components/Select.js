import React from 'react';
import PropTypes from 'prop-types';


const Select = ({
                  selected,
                  options,
                  onChange,
                  className,
                  defaultSelection = '-- Select --'
                }) => {

  const selectOptions = [
    {
      value: 'default',
      text: defaultSelection
    },
    ...options];

  const handleOnSelection = (e) => {
    const selectedValue = e.target.value;
    const selectedObj = selectOptions.find(options => options.value == selectedValue);
    return onChange(selectedObj);
  }

  return <select value={selected} onChange={handleOnSelection} className={className}>
    {selectOptions.map(
      (option, index) => <option key={index} value={option.value}>{option.text}</option>
    )}
  </select>
};

Select.propTypes = {
  className: PropTypes.string,
  defaultSelection: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      }
    )).isRequired
}
export default Select;