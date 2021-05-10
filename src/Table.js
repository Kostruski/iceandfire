import React from 'react';

const Table = ({ data, getBookDetails, isBook }) => {
	const headers = isBook ? ['name', 'ISBN', 'number of pages', 'release date'] : ['names and aliases', 'gender', 'culture', 'books', 'seasons count'];
	return (
		<table className="responsive-table">
			<thead>
				<tr>
					{headers.map((text, i) => <td key={text + i}><b>{text}</b></td>)}
				</tr>
			</thead>

			<tbody>
				{isBook ?
					<tr>
						<td>{data.name}</td>
						<td>{data.isbn}</td>
						<td>{data.numberOfPages}</td>
						<td>{data.released}</td>
					</tr> :
					data.map((char, i) => {
						return (
							<tr key={char.name + i}>
								<td>{char.name}</td>
								<td>{char.gender}</td>
								<td>{char.culture}</td>
								<td>{char.books.map((book, i) => <a className="waves-effect waves-light btn book-btn" onClick={() => getBookDetails(book.link)} key={book + i}>{book.id}</a>)}</td>
								<td>{char.seasons}</td>
							</tr>
						)
					})
				}
			</tbody>
		</table>
	)
}

export default Table
