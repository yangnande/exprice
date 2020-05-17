<template>
  <div>
    <div class="title">
      <img class="voice" src="~assets/img/voice.gif" alt="">
      <div class="voice-box">
        <div class="voice-title">每周三9点点点1点点1点点1限1点点1点点1点点1限1一次！</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
    var voiceBox = document.getElementsByClassName('voice-box')[0]
    var voiceBoxWidth = voiceBox.offsetWidth
    var voiceTitle = document.getElementsByClassName('voice-title')[0]
    var voiceTitleW = voiceTitle.scrollWidth
    if (voiceTitleW > voiceBoxWidth) {
      move()
    }
    function move() {
        let timer1 = setInterval(() => {
        voiceBox.scrollLeft+=1
        if (voiceBox.scrollLeft >= (voiceTitleW - voiceBoxWidth)) {
          clearInterval(timer1)
          let timer2 = setTimeout(() => {
            clearTimeout(timer2)
            voiceBox.scrollLeft = 0
            let timer3 = setTimeout(() => {
              clearTimeout(timer3)
              move()
            }, 800)
          }, 2000)
        }
      }, 15)
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 6.4rem;
  padding: .64rem 0 .256rem;
  color: #f95461;
  font-size: .426667rem;
  display: flex;
  position: absolute;
  top: 0;
  .voice {
    width: .661333rem;
    height: .597333rem;
  }
  .voice-box {
    overflow: hidden;
    margin-left: .213333rem;
    width: 5.461333rem;
    .voice-title {
      white-space: nowrap;
    }
  }
}
</style>
