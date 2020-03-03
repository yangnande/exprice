<template>
  <div class="cart-bottom">
    <div class="btns">
      <input type="checkbox" class="check-box" id="quan" v-model="isAllItem" @click="checkClick">全选
      <!-- <div class="check-box" :class="{'checked': isAllItem}" @click="checkClick"></div> -->
      <!-- <div>全选</div> -->
    </div>
    <div>合计 {{total}}</div>
    <div class="toCount">去计算({{cartLength}})</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'CartBottom',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    total() {
      return this.cartList.filter(v=>v.checked).reduce((pre,next)=>{
        return pre + next.realPrice*next.count
      },0)
    },
    cartLength() {
      return this.cartList.filter(v=>v.checked).length
    },
    isAllItem: {
      get() {
        return this.cartList.every(v=> v.checked)
      },
      set() {
      }
    }
  },
  mounted () {
  },
  methods: {
    checkClick() {
      if(this.isAllItem) {
        this.cartList.map(v=>v.checked=false)
      } else {
        this.cartList.map(v=>v.checked=true)
      }
      this.isAllItem=!this.isAllItem
    }
  },
  beforeDestroy () {
    this.$bus.$off('selectAll',this.selectAll11)
  }
}
</script>

<style scoped>
.cart-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 160px;
  position: fixed;
  left:0;
  right:0;
  bottom: 120px;
  background: #eee;
  padding-left: 16px;
}
.btns {
  display: flex;
  align-items: center;
}
.toCount {
  width: 220px;
  height: 160px;
  line-height: 160px;
  text-align: center;
  background-color: #ff8198;
  color: #fff;
}
input[type="checkbox"] {
  width: 60px;
  height: 60px;
  background-color: #fff;
  -webkit-appearance: none;
  border: 2px solid #aaa;
  border-radius: 50%;
  outline: none;
}
input[type="checkbox"]:checked {
  background: url("~assets/img/cart/selected.png")
    no-repeat center;
  background-size: 100% 100%;
  border: 2px solid #ff8198;
}
.check-box{
  width: 60px;
  height: 60px;
  background-color: #fff;
  -webkit-appearance: none;
  border: 2px solid #aaa;
  border-radius: 50%;
  margin-right: 20px;
}
.checked{
  background: url("~assets/img/cart/selected.png")
    no-repeat center;
  background-size: 100% 100%;
  border: 2px solid #ff8198;
}
</style>
