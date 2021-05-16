import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Loader from './Loader';
import Input from './Input';
import Table from './Table';
import DropDown from './DropDown';
import CheckBox from './CheckBox';
import { parseData } from './utils';
import { initialState, reducer } from './reducer';
import Context from './context';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { url, lastPage, isLoading, isBook, data, cachedUrl } = state;

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'setIsLoading', payload: true });

			const isBookUrl = !!~url.indexOf('www.anapioficeandfire.com/api/books');

			try {
				const result = await axios(url);
				const newData = parseData(result.data, isBookUrl);
				dispatch({ type: 'setData', payload: newData });
				dispatch({ type: 'setIsBook', payload: isBookUrl })

				if (!isBookUrl) {
					const pagination = result.headers.link?.match(/<(.|\n)*?>/gm);
					const lastPage = pagination[pagination.length - 1].match(/page=(\d+)/)[1];
					dispatch({ type: 'setLastPage', payload: lastPage });
				}
			} catch (error) {
				alert('Something went wrong, try again or contact your administrator \n' + error);
			}

			dispatch({ type: 'setIsLoading', payload: false });
		};

		fetchData();
	}, [url]);

	useEffect(() => {
		let newUrl = url;
		const currP = url.match(/page=(\d+)/)?.[1];
		if (parseInt(currP) > parseInt(lastPage)) newUrl = newUrl.replace(/(page=)(\d+)/, `$1${lastPage}`);

		dispatch({ type: 'setUrl', payload: newUrl });
	}, [lastPage])

	const getBookDetails = bookUrl => {
		dispatch({ type: 'setCachedUrl', payload: url });
		dispatch({ type: 'setUrl', payload: bookUrl });
	}

	const setPage = url => {
		dispatch({ type: 'setUrl', payload: url });
	}

	return (
		<Context.Provider value={{ state, dispatch }}>
			<NavBar />
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
		</Context.Provider>
	)
}

export default App

