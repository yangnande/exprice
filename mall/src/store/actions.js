export default {
  addToCart(context,payload) {
    // 方法一
    // let oldProduct = null
    // for(var i of cartList) {
    //   if(i.iid ==payload.iid) {
    //     oldProduct = i
    //   }
    // }
    // if(oldProduct) {
    //   oldProduct.count +=1
    // }else {
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }
     // 方法二
    return new Promise((resolve,reject)=>{
      let oldProduct = context.state.cartList && context.state.cartList.find(v=>v.iid==payload.iid)
      if(oldProduct){
        context.commit('addCount',oldProduct)
        resolve('当前商品数量增加了')
      }else {
        payload.count = 1
        context.commit('getProduct',payload)
        resolve('新的商品添加成功了')
      }
    })
  }
}
