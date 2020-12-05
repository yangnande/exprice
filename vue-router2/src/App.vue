<template>
  <div v-if="isShow" class="container">
    <div class="regiter"></div>
    <div class="content">
      <!-- <div class="close" @click="closePage"></div> -->
      <div class="qrcode" v-show="!imgUrl" ref="box">
        <div class="bg"></div>
        <div class="desc">
          <div class="qr" id="qrcode" ref="qrcode"></div>
          <p>您不是该客户经理的好友，扫描添加客户经理为好友，即可瓜分流量红包！！</p>
        </div>
      </div>
      <img v-show="imgUrl" class="newImg" :src="imgUrl" alt="" ref="newImg">
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2'
export default {
  props: ['qrUrl'],
  data () {
    return {
      imgUrl: '',
      isShow: true
    }
  },
  mounted () {
    this.qrcode()
  },

  methods: {
    createQRCode () {
      var that = this
      let newImg = document.getElementsByClassName('newImg')[0]
      let qrcode = document.getElementsByClassName('qrcode')[0]
      // console.log(window.getComputedStyle(bgImg).width, window.getComputedStyle(bgImg).height)
      html2canvas(that.$refs.box, {backgroundColor: null}).then(function (canvas) {
        newImg.style.width = window.getComputedStyle(qrcode).width
        newImg.style.height = window.getComputedStyle(qrcode).height
        that.imgUrl = canvas.toDataURL() // 将canvas转为base64图片(eg. data:image/png;base64,ijskjlkj)
      })
    },
    qrcode () {
      /* eslint-disable  */
      let qr = document.getElementsByClassName('qr')[0]
      new QRCode(document.getElementById('qrcode'), {
        width: parseFloat(window.getComputedStyle(qr).width), // 二维码宽度，单位像素
        height: parseFloat(window.getComputedStyle(qr).height), // 二维码高度，单位像素
        text: 'https://www.baidu.com', // 生成二维码的链接
        correctLevel : QRCode.CorrectLevel.L
      })
      this.createQRCode()
    },
    closePage() {
      this.isShow = false
    }
  }
}
</script>
<style scoped>
.regiter{
  width:100%;
  height: 100%;
  position: fixed;
  background: #000000;
  opacity: 0.8;
  z-index: 480;
  top: 0;
  left: 0;
}
.qrcode,.newImg {
  width: 13.013333rem;
  position: absolute;
  left: 50%;
  top: 4.394667rem;
  transform: translateX(-50%);
  z-index: 500;
}
.close {
  position: absolute;
  right: 1.493333rem;
  top: 2.24rem;
  z-index: 502;
}
.bg {
  width: 13.013333rem;
  height: 16.085333rem;
  background: url(./assets/wq1.png) no-repeat;
  background-size: 100% 100%;
}
.desc {
  width: 13.013333rem;
  height: 3.584rem;
  padding: .597333rem 1.877333rem;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;;
}
.qr {
  width: 2.389333rem;
	height: 2.389333rem;
	border: .042667rem solid  #c1c1c1;
}
.desc p {
  width: 8.32rem;
  color: #666666;
  font-size: .554667rem;
  margin-left: .512rem;
}
</style>
