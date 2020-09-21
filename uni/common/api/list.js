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
export const updateLike = (data) => {
	return $http({
		url: 'update_like',
		data
	})
}
export const getSearch = (data) => {
	return $http({
		url: 'get_search',
		data
	})
}

export const update_label = (data) => {
	return $http({
		url: 'update_label',
		data
	})
}
export const get_detail = (data) => {
	return $http({
		url: 'get_detail',
		data
	})
}