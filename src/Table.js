import React from 'react'

const Table = ({ data, getBookDetails, isBook }) => {
	const headers = ['name', 'gender', 'culture', 'books', 'seasons']
	return (
		<table>
			{!isBook ?
				(<>
					<thead>
						<tr>
							{headers.map(text => <td><b>{text}</b></td>)}
						</tr>
					</thead>

					<tbody>
						{data.map(char => {
							return (
								<tr>
									<td>{char.name}</td>
									<td>{char.gender}</td>
									<td>{char.culture}</td>
									<td>{char.books.map(book => <a className="waves-effect waves-light btn book-btn" onClick={() => getBookDetails(book.link)}>{book.id}</a>)}</td>
									<td>{char.seasons}</td>
								</tr>
							)
						})}
					</tbody></>) :
				<h1>Book</h1>
			}

		</table>
	)
}

export default Table
