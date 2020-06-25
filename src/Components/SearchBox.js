import React from 'react';
import './searchbox.css';

const SearchBox = ({inputChange}) => {
    return (
            <input type="text" className='Search' onChange={inputChange()} placeholder="Search Details Based on Name"/>
    );
};

export default SearchBox;