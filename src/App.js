import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Loader from './Loader';
import Input from './Input';
import Table from './Table';
import DropDown from './DropDown';
import CheckBox from './CheckBox';
import { parseData } from './utils';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

const App = () => {
	const [url, setUrl] = useState('https://www.anapioficeandfire.com/api/characters?page=1&pageSize=10');
	const [lastPage, setLastPage] = useState(1);
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

				if (!isBookUrl) {
					const pagination = result.headers.link?.match(/<(.|\n)*?>/gm);
					const lastPage = pagination[pagination.length - 1].match(/page=(\d+)/)[1];
					setLastPage(lastPage);
				}
			} catch (error) {
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
			<NavBar isBook={isBook} goBack={goBack} lastPage={lastPage} setPage={setPage} url={url} />
			<div className="container-fixed">
				<div className="row">
					<div className="col s12 inputs-group">
						{!isBook &&
							<>
								<CheckBox url={url} setPage={setPage} isLoading={isLoading} />
								<Input url={url} setPage={setPage} />
								<DropDown url={url} setPage={setPage} isLoading={isLoading} />
							</>
						}
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

