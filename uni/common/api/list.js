import $http from './http.js'
export const getLabel = (data) => {
	return $http({
		url: 'getLabel',
		data
	})
}