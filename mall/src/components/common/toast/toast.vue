<template>
  <div class="toast" v-show="isShow">{{msg}}</div>
</template>

<script>
export default {
  name: 'toast',
  data() {
    return {
      msg: '',
      isShow: false
    }
  },
  methods: {
    show(msg,duration=2000) {
      this.msg = msg
      this.isShow = true

      setTimeout(()=> {
        this.msg = ''
        this.isShow = false
      }, duration)
    }
  }
}
</script>

<style>
.toast {
  position: fixed;
  left:50%;
  top: 50%;
  z-index: 500;
  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,.7);
  color: #fff;
  padding: 20px;
}
</style>
