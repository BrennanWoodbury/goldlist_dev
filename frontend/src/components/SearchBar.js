import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            {/* <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">
                    Search
                </button>
            </div> */}
        </div>
    )
}

export default SearchBar;