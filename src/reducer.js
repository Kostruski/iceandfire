export const initialState = {
	url: 'https://www.anapioficeandfire.com/api/characters?page=1&pageSize=10',
	lastPag: 1,
	isLoading: false,
	isBook: false,
	data: [],
	cachedUrl: null,
}

export const reducer = (state, action) => {
	switch (action.type) {
		case 'setUrl':
			return {...state, url: action.payload }
		case 'setLastPage':
			return { ...state, lastPage: action.payload }
		case 'setIsLoading':
			return { ...state, isLoading: action.payload }
		case 'setIsBook':
			return { ...state, isBook: action.payload }
		case 'setData':
			return { ...state, data: action.payload }
		case 'setCachedUrl':
			return { ...state, cachedUrl: action.payload }
		default:
			throw new Error('action type not found !');
	}
}
