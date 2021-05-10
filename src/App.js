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
	const [isBook, setIsBook] = useState(false);
	const [data, setData] = useState([]);
	const [cachedUrl, setChachedUrl] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
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
				alert('Something went wrong, try again or contact your administrator \n' + error);
			}

			setIsLoading(false);
		};

		fetchData();
	}, [url]);

	useEffect(() => {
		let newUrl = url;
		const currP = url.match(/page=(\d+)/)?.[1];
		if (parseInt(currP) > parseInt(lastPage)) newUrl = newUrl.replace(/(page=)(\d+)/, `$1${lastPage}`);

		setUrl(newUrl);
	}, [lastPage])

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
			<NavBar isBook={isBook} goBack={goBack} lastPage={lastPage} setPage={setPage} url={url} is={isLoading} />
			<div className="container-fixed">
				<div className="row">
					{!isBook &&
						<div className="col s12 inputs-group">
							<CheckBox url={url} setPage={setPage} isLoading={isLoading} />
							<Input url={url} setPage={setPage} />
							<DropDown url={url} setPage={setPage} isLoading={isLoading} lastPage={lastPage} />
						</div>
					}
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

