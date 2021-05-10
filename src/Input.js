import React, { useEffect, useState } from 'react';
import M from 'materialize-css';

const Input = ({ setPage, url }) => {
	let newUrl = url;
	const [text, setText] = useState('');
	const [label, setLabel] = useState('Character name');
	const filter = url.match(/&name=([a-z0-9+]+)/);

	useEffect(() => {
		M.updateTextFields();
	}, []);

	useEffect(() => {
		setLabel(filter ? filter[1].replace('+', ' ') : 'Character name')
	}, [url]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!filter) {
			const param = text.trim();
			newUrl = newUrl + `&name=${param.replace(/\s+/g, '+')}`
		} else {
			newUrl = newUrl.replace(filter[0], '');
			setText('');
		}

		setPage(newUrl);
	}

	return (
		<form className="col s6">
			<div className="row">
				<div className="col s12 valign-wrapper">
					Filter by name:
					<div className="input-field inline">
						<input id="character" type="text" value={text} onChange={e => setText(e.target.value)} maxLength="50" placeholder={label} />
						<label htmlFor="character">Character name</label>
					</div>
					<button className="btn waves-effect waves-light" type="submit" name="action" onClick={e => handleSubmit(e)} disabled={!filter && (text.length > 50 || text.length === 0)}>{filter ? "Clear" : "Filter"}</button>
				</div>
			</div>
		</form>
	)
}

export default Input
