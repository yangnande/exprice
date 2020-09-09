import $http from './http.js'
export const getLabel = (data) => {
	return $http({
		url: 'getLabel',
		data
	})
}
export const getList = (data) => {
	return $http({
		url: 'get_list',
		data
	})
}