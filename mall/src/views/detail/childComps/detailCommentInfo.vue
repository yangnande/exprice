<template>
  <div class="detail-comment-info" v-if="Object.keys(commentInfo).length>0">
    <div class="title">
      <div>用户评价</div>
      <div>更多</div>
    </div>
    <div class="comment-list">
      <div class="item" v-for="v in commentInfo.list" :key="v.rateId">
        <div class="user-info">
          <img :src="v.user.avatar" alt="">
          <span>{{v.user.uname}}</span>
        </div>
        <p class="comment-content">{{v.content}}</p>
        <div class="commont-time">
          <span>{{v.created | showDate}}</span>
          <span>{{v.style}}</span>
        </div>
        <div class="comment-img" v-if="commentInfo.images">
          <img :src="v" alt="" v-for="(v,i) in commentInfo.images" :key="i">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/util'
export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
       type: Object,
       default() {
         return {}
       }
    }
  },
  filters: {
    showDate(val) {
      const date = new Date(val*1000)
      return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style scoped>
.detail-comment-info {
  margin: 0 30px 30px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0;
  font-size: 45px;
  border-bottom: 10px solid #ccc;
}

.user-info {
  margin: 30px 0;
  display: flex;
  align-items: center;
}

.user-info img{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.comment-content {
  margin: 30px 0;
  font-size: 40px;
}
.commont-time {
  font-size: 40px;
  color: #ccc;
}
.comment-img {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
}
.comment-img img {
  width: 24%;
  height: 180px;
  border: 1px solid red;
  margin: 10px 10px 0 0;
}
</style>
