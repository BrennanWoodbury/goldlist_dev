import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils/api'; // Import your fetchData function

function ExpandedTable({ path }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch the data when the component mounts
        const fetchDataForTable = async () => {
            try {
                const fetchedData = await fetchData(path = path);
                setData(fetchedData);
                // console.log(fetchedData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataForTable();
    }, [path]);

    if (!data) {
        return null;
    }

    return (
        <table className="table table-bordered table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>Product Description</th>
                    <th>Asset Number</th>
                </tr>
            </thead>
            {data.map((item, index) => (

                <tbody>
                    <tr>
                        <td>{item.ProductDescription}</td>
                        <td>{item.AssetNumber}</td>
                    </tr>
                </tbody>
            ))}
        </table>
    );
}

export default ExpandedTable;
