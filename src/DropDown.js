import React, { useEffect } from 'react';
import M from 'materialize-css';

const DropDown = ({ url, setPage, isLoading, lastPage }) => {
	let newUrl = url;

	useEffect(() => {
		const elems = document.querySelectorAll('select');
		const instances = M.FormSelect.init(elems, {});
	}, []);

	const handleSelect = option => {
		newUrl = newUrl.replace(/(pageSize=)(\d+)/, `$1${option}`);
		setPage(newUrl);
	}

	return (
		<div className="input-field col s3 valign-wrapper">
			<select onChange={e => handleSelect(e.target.value)} value=''>
				<option value="" disabled selected>Rows per page</option>
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="15">15</option>
				<option value="20">20</option>
				<option value="25">25</option>
			</select>
		</div>
	)
}

export default DropDown
