import React from 'react'

const NavBar = ({isBook, goBack}) => {
	return (
		<nav>
			<div className="nav-wrapper">
				<a href="#" className="brand-logo">Ice and Fire</a>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li>{isBook && <a className="waves-effect waves-light btn" onClick={goBack}>Back to characters</a>}</li>
				</ul>
			</div>
		</nav>
	)
}

export default NavBar
