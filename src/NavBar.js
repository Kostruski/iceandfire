import React from 'react';

const NavBar = ({ isBook, goBack, lastPage, setPage, url }) => {
	let newUrl = url;
	const currP = parseInt(url.match(/page=(\d+)/)[1]);

	const handlePageChange = page => {
		newUrl = newUrl.replace(/(page=)(\d+)/, `$1${page}`);
		setPage(newUrl);
	}

	return (
		<nav>
			<div className="nav-wrapper">
				{isBook ? <a className="waves-effect waves-light btn" onClick={goBack}>Back to characters</a>
					:
					<>
						<div className="pagination">
							<a className="waves-effect waves-light btn" disabled={currP == 1} onClick={() => handlePageChange(1)}>First</a>
							<a className="waves-effect waves-light btn" disabled={currP == lastPage} onClick={() => handlePageChange(currP + 1)}>Next</a>
							<a className="waves-effect waves-light btn" disabled={currP == 1} onClick={() => handlePageChange(currP - 1)}>Prev</a>
							<a className="waves-effect waves-light btn" disabled={currP == lastPage} onClick={() => handlePageChange(lastPage)}>Last</a>
							<div className="right"><b>{`Current page ${currP}`}</b></div>
						</div>
					</>}
			</div>
		</nav>
	)
}

export default NavBar
