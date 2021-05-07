
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import 'materialize-css/dist/css/materialize.min.css'
import './App.css';

const App = () => {
	const [url, setUrl] = useState('https://www.anapioficeandfire.com/api/characters?page=1&pageSize=10');
	const [firstPage, setFirstPage] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [prevPage, setPrevPage] = useState(null);
	const [name, setName] = useState(null);
	const [gender, setGender] = useState(null);
	const [currentPage, setCurrentPage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	 useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);


	return (
		<>
			<NavBar />
			<div className="container">
				<div className="row">
					<div className="col s12">
					</div>
				</div>
			</div>
		</>
	)
}

export default App

