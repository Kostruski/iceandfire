import React, { useContext } from 'react';
import Context from './context'

const NavBar = () => {
	const { state, dispatch} = useContext(Context);
	const { isBook, lastPage, url, cachedUrl } = state;

	let newUrl = url;
	const currP = parseInt(url.match(/page=(\d+)/)?.[1]);

	const handlePageChange = page => {
		newUrl = newUrl.replace(/(page=)(\d+)/, `$1${page}`);
		dispatch({ type: 'setUrl', payload: newUrl });
	}

	const goBack = () => {
		dispatch({ type: 'setUrl', payload: cachedUrl });
		dispatch({ type: 'setCachedUrl', payload: null });
	}

	return (
		<nav>
			<div className="nav-wrapper">
				{isBook ? <a className="waves-effect waves-light btn" onClick={goBack}>Back to characters</a>
					:
					<div className="pagination">
						<a className="waves-effect waves-light btn" disabled={currP == 1} onClick={() => handlePageChange(1)}>First</a>
						<a className="waves-effect waves-light btn" disabled={currP == lastPage} onClick={() => handlePageChange(currP + 1)}>Next</a>
						<a className="waves-effect waves-light btn" disabled={currP == 1} onClick={() => handlePageChange(currP - 1)}>Prev</a>
						<a className="waves-effect waves-light btn" disabled={currP == lastPage} onClick={() => handlePageChange(lastPage)}>Last</a>
						<div className="right"><b>{`Current page ${currP}`}</b></div>
					</div>
				}
			</div>
		</nav>
	)
}

export default NavBar
