import React from 'react';


interface MySelect {
    options: { name: string, value: string }[], defaultValue: any, value: string, onChange: (el: string) => void
}
const MySelect: React.FC<MySelect> = ({ options, defaultValue, value, onChange }) => {
    return (
        <select
            className='myselect'
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled >{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;
