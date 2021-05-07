import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Loader from './Loader';
import Table from './Table';
import { parseCharaters } from './utils';
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
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [isBook, setIsBook] = useState(false);
	const [data, setData] = useState([]);
	const [cachedUrl, setChachedUrl] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);

			try {
				const result = await axios(url);
				setData(parseCharaters(result.data));
				console.log(parseCharaters(result.data));
			} catch (error) {
				setIsError(true);
			}
			setIsLoading(false);
		};

		fetchData();
	}, [url]);

	const getBookDetails = bookUrl => {
		setChachedUrl(url);
		setIsBook(true);
		setUrl(bookUrl);
	}

	const goBack = () => {
		setIsBook(false);
		setUrl(cachedUrl);
		setChachedUrl(null);
	}


	return (
		<>
			<NavBar isBook={isBook} goBack={goBack} />
			<div className="container">
				<div className="row">
					<div className="col s12">
						{isLoading ? <Loader /> : <Table data={data} getBookDetails={getBookDetails} isBook={isBook} />
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default App

