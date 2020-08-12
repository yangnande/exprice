<template>
  <div>
    <div ref="box" v-show="!imgUrl">
      <img class="bgImg" :src='require("./assets/poster1.jpg")' alt="">
      <img class="qrImg" :src='require("./assets/qr.png")' alt="">
      <p>你好你好你好你好</p>
    </div>
    <img v-show="imgUrl" class="newImg" :src="imgUrl" alt="" ref="newImg">
  </div>
</template>

<script>
// npm i qrcode --save
// import QRCode from 'qrcode'
// npm i html2canvas --save
import html2canvas from 'html2canvas'

export default {
  name: 'Poster',
  data () {
    return {
      imgUrl: ''
    }
  },

  async mounted () {
    this.createQRCode()
  },

  methods: {
    createQRCode () {
      var that = this
      // let newImg = this.$refs.newImg
      let newImg = document.getElementsByClassName('newImg')[0]
      let bgImg = document.getElementsByClassName('bgImg')[0]
      console.log(window.getComputedStyle(bgImg).width,window.getComputedStyle(bgImg).height)
      html2canvas(that.$refs.box).then(function (canvas) {
        // newImg.style.width = '16rem'
        // newImg.style.height = '30.656rem'
        newImg.style.width = window.getComputedStyle(bgImg).width
        newImg.style.height = window.getComputedStyle(bgImg).height
        that.imgUrl = canvas.toDataURL() // 将canvas转为base64图片(eg. data:image/png;base64,ijskjlkj)
      })
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body {
  height: 100%;
}
html {
  font-size: 6.25vw;
  height: 100%;
}
.bgImg {
  width: 16rem;
  height: 30.656rem;
  position: relative;
}
.qrImg {
  width: 8.4rem;
  height: 8.4rem;
  position: absolute;
  top: 4rem;
  left: 2rem;
}
p {
  position: absolute;
  top: 5rem;
  left: 2rem;
  color: #fff;
}
</style>
