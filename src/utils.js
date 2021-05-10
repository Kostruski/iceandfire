export const parseData = (data, isBook) => {

	if (!data) return;

	if (!isBook) {
		return data.map(char => {
			const charBooks = Array.isArray(char.books) && char.books.length > 0 ?
				char.books.map(book => {
					return {
						id: book.slice(book.lastIndexOf('/') + 1),
						link: book,
					}
				}) : [];

			return {
				name: `${char.name ? char.name + ',' : ''}${Array.isArray(char.aliases) ? char.aliases.toString() : ''}`,
				gender: char.gender ? char.gender : 'Unknown',
				culture: char.culture ? char.culture : 'Unknown',
				books: charBooks,
				seasons: char.tvSeries.length,
			};
		})
	}

	if (isBook) {
		const date = new Date(data.released);

		return {
			name: data.name,
			isbn: data.isbn,
			numberOfPages: data.numberOfPages,
			released: date.toLocaleDateString("pl-PL") || "",
		}
	}
}
