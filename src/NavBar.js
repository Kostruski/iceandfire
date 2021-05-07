import React from 'react';

const NavBar = ({ isBook, goBack, currentPage, pageButtons, setPage }) => {
	return (
		<nav>
			<div className="nav-wrapper">
				{isBook ? <a className="waves-effect waves-light btn" onClick={goBack}>Back to characters</a>
					:
					<>
					<div className="pagination">
						{pageButtons.map((link, i) => {
							if (typeof link !== 'string') debugger;
							const page = parseInt(link.match(/page=(\d+)/)[1]);
							const lastPage = parseInt(pageButtons[pageButtons.length - 1].match(/page=(\d+)/)[1]);
							const currP = parseInt(currentPage);

							if (page === 1 && i === 2) return <a className="waves-effect waves-light btn" key={i+link} onClick={() => setPage(link)}>First</a>;
							if (page === currP + 1 ) return <a className="waves-effect waves-light btn" key={i+link} onClick={() => setPage(link)}>Next</a>;
							if (page === currP - 1 ) return <a className="waves-effect waves-light btn" key={i+link} onClick={() => setPage(link)}>Prev</a>;
							if (page === lastPage) return <a className="waves-effect waves-light btn" key={i+link} onClick={() => setPage(link)}>Last</a>;
						})}
						<div className="right">{`Current page ${currentPage}`}</div>
						</div>
					</>}
			</div>
		</nav>
	)
}

export default NavBar
