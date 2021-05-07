import React from 'react'

const CheckBox = ({ url, setUrl }) => {

	const handleFilter = gender => {

	}

	return (
		<div>
			<form action="#">
				<p>
					<label>
						<input type="checkbox" value='male' />
						<span>Male</span>
					</label>
				</p>
				<p>
					<label>
						<input type="checkbox" value='female' onChange={e => setUrl() } />
						<span>Female</span>
					</label>
				</p>
			</form>
		</div>
	)
}

export default CheckBox
