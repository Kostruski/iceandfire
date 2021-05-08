import React, {useState, useEffect} from 'react';

const CheckBox = ({ url, setPage, isLoading }) => {
	const [genderFilter, setGenderFilter] = useState([]);
	let newUrl = url;
	const queryParam = newUrl.match(/&gender=(\w{4,6})/);

	if (queryParam) {
		newUrl = newUrl.replace(queryParam[0], '');
	};

	const handleGenderFilter = target => {
		let arr = [...genderFilter];
		if (target.checked) {
			arr.push(target.value);
		} else {
			arr = arr.filter(el => el !== target.value);
		};

		setGenderFilter(arr);
	}

	useEffect(() => {
		console.log(genderFilter, newUrl);
		if (genderFilter.length === 1) setPage(newUrl + `&gender=${genderFilter[0]}`);
		if (genderFilter.length !== 1) setPage(newUrl);

	}, [genderFilter])

	return (
		<div>
			<form action="#">
				<p>
					<label>
						<input type="checkbox" value='male' disabled={isLoading} onChange={e => handleGenderFilter(e.target)} />
						<span>Male</span>
					</label>
				</p>
				<p>
					<label>
						<input type="checkbox" value='female' onChange={e => handleGenderFilter(e.target)} disabled={isLoading} />
						<span>Female</span>
					</label>
				</p>
			</form>
		</div>
	)
}

export default CheckBox
