<template>
  <div>
    <city-header></city-header>
    <city-search :cities="cities"></city-search>
    <city-list :cities="cities" :hotCities="hotCities" :currentLetter="currentLetter"></city-list>
    <city-alphabet :cities="cities" @change="letterChange" @getCurrentLetter="getCurrentLetter"></city-alphabet>
  </div>
</template>

<script>

import cityHeader from './component/cityHeader'
import citySearch from './component/citySearch'
import cityList from './component/cityList'
import cityAlphabet from './component/alphabet'
import axios from 'axios'

export default {
  name: 'city',
  data () {
    return {
      cities: {},
      hotCities: [],
      currentLetter: ''
    }
  },
  components: {
    cityHeader,
    citySearch,
    cityList,
    cityAlphabet
  },
  methods: {
    getCityData() {
      axios.get('/api/city.json').then(
        this.getCityDataSucc
      )
    },
    getCityDataSucc(res) {
      var res = res.data
      if(res.ret&&res.data){
        var data = res.data
        this.cities = data.cities
        this.hotCities = data.hotCities
      }
    },
    letterChange(letter) {
      this.currentLetter = letter
    },
    getCurrentLetter(letter) {
      this.currentLetter = letter
    }
  },
  mounted() {
    this.getCityData()
  }
}
</script>

<style scoped>
</style>
