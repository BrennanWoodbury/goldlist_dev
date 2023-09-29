import react, { useState } from 'react';

function FilterButton({ onFilterClick }) {
    let [filterActive, setFilterActive] = useState(false);
    let [sortAscending, setSortAscending] = useState(true);

    let handleSort = () => {
        setSortAscending(!sortAscending);
        setFilterActive(!filterActive);
    }

    return (
        <i className={`bi ${sortAscending ? 'bi-caret-up' : 'bi-caret-down'} `} onClick={handleSort} />
    );
}

export default FilterButton;