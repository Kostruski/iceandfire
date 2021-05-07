import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Loader from './Loader';
import Table from './Table';
import CheckBox from './CheckBox'
import { parseData } from './utils';
import 'materialize-css/dist/css/materialize.min.css'
import './App.css';

const App = () => {
	const [url, setUrl] = useState('https://www.anapioficeandfire.com/api/characters?page=1&pageSize=10');
	const [pageButtons, setPageButtons] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [isBook, setIsBook] = useState(false);
	const [data, setData] = useState([]);
	const [cachedUrl, setChachedUrl] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);


			const isBookUrl = !!~url.indexOf('www.anapioficeandfire.com/api/books');

			try {
				const result = await axios(url);
				setData(parseData(result.data, isBookUrl));
				setIsBook(isBookUrl);
				if (!isBook) {
					const pagination = result.headers.link?.match(/<(.|\n)*?>/gm);
					setPageButtons(pagination.map(link => link.replace(/<|>/gm, '')));
					setCurrentPage(url.match(/page=(\d+)/)[1]);
				}
			} catch (error) {
				console.log(error);
				setIsError(true);
			}
			setIsLoading(false);
		};

		fetchData();
	}, [url]);

	const getBookDetails = bookUrl => {
		setChachedUrl(url);
		setUrl(bookUrl);
	}

	const goBack = () => {
		setUrl(cachedUrl);
		setChachedUrl(null);
	}

	const setPage = url => {
		setUrl(url);
	}


	return (
		<>
			<NavBar isBook={isBook} goBack={goBack} pageButtons={pageButtons} currentPage={currentPage} setPage={setPage} />
			<div className="container">
				<div className="row">
					<div className="col s12">
						{!isBook && <CheckBox url={url} setUrl={url}/>}
					</div>
				</div>
				<div className="row">
					<div className="col s12">
						{isLoading ? <Loader /> :
							<Table data={data} getBookDetails={getBookDetails} isBook={isBook} />
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default App

