import React, { useState } from 'react';
import FilterButton from './FilterButton';
import ExpandedTable from './ExpandedTable';
import "bootstrap-icons/font/bootstrap-icons.css";
import { fetchData } from '../utils/api';
import ColumnSearchBar from './ColumnSearchBar';

function DataTable({ data }) {
    const itemsPerPage = 50;
    const [currentPage, setCurrentPage] = useState(true);
    const [sortAscending, setSortAscending] = useState(true);
    const [expandedItemIndices, setExpandedItemIndices] = useState([]);


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const pageData = data.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSort = () => {
        setSortAscending(!sortAscending);
    };

    const toggleDetails = (index) => {
        setExpandedItemIndices((prevIndices) => {
            if (prevIndices.includes(index)) {
                return prevIndices.filter((itemIndex) => itemIndex !== index);
            } else {
                return [...prevIndices, index];
            }
        });
    };


    const [searchTerms, setSearchTerms] = useState({
        name: '',
        hostname: '',
        description: '',
        ipAddress: '',
        group: '',
    });

    const handleColumnSearch = (columnName, term) => {
        setSearchTerms((prevSearchTerms) => ({
            ...prevSearchTerms,
            [columnName]: term,
        }));
    };

    const fileteredData = data.filter((item) =>
        Object.keys(searchTerms).every((columnName) =>
            item[columnName]
                .toLowerCase()
                .includes(searchTerms[columnName].toLowerCase())
        )
    );

    return (
        <div className="card">
            <div className="card-body">
                <div className="mb-3">
                    <ColumnSearchBar onSearch={(term) => handleColumnSearch('name', term)} />
                </div>
                <div className="mb-3">
                    <ColumnSearchBar onSearch={(term) => handleColumnSearch('hostname', term)} />
                </div>
                <div className="mb-3">
                    <ColumnSearchBar onSearch={(term) => handleColumnSearch('description', term)} />
                </div>
                <div className="mb-3">
                    <ColumnSearchBar onSearch={(term) => handleColumnSearch('ipAddress', term)} />
                </div>
                <div className="mb-3">
                    <ColumnSearchBar onSearch={(term) => handleColumnSearch('group', term)} />
                </div>
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>
                                Name {' '}
                                <FilterButton />
                            </th>
                            <th>
                                Hostname {' '}
                                <FilterButton />
                            </th>
                            <th>
                                Description {' '}
                                <FilterButton />
                            </th>
                            <th>
                                IP Address {' '}
                                <FilterButton />
                            </th>
                            <th>
                                Group {' '}
                                <FilterButton />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageData.map((item, index) => (
                            <React.Fragment key={item.ProductID}>
                                <tr>
                                    <td><a href="#" onClick={() => toggleDetails(index)}> {item.Name}</a></td>
                                    <td>{item.Hostname}</td>
                                    <td>{item.Description}</td>
                                    <td>{item.IPAddress}</td>
                                    <td>{item.GroupName}</td>
                                </tr>
                                {expandedItemIndices.includes(index) && (
                                    <tr>
                                        <td colSpan="5">
                                            <div className="expanded-table">
                                                <ExpandedTable path={`goldlist/children/${item.ProductID}`} />
                                                {/* <p>{fetchData(`goldlist/children/${item.ProductID}`)} </p> */}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <button
                    className="btn btn-primary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button
                    className="btn btn-primary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={endIndex >= data.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default DataTable;
