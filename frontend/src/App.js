import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TopRightMenu from './components/TopRightMenu';
import DataTable from './components/DataTable';
import SearchBar from './components/SearchBar';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get('http://localhost:8000/goldlist/items');

        if (response.status === 200) {
          console.log(response);
          setData(response.data);
          console.log("Data Loaded");
        } else {
          console.error("Failure fetching data", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <TopRightMenu />
      <DataTable data={data} />
    </div>
  );
}

export default App;
