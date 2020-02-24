<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'nav-bar'
}
</script>

<style>
  .nav-bar {
    display: flex;
    height: 120px;
    line-height: 120px;
    text-align: center;
    box-shadow: 0 2px 2px rgba(100,100,100,.4);
    box-sizing: border-box;
  }
  .left,.right {
    width: 120px;
  }
  .center {
    flex: 1;
  }
</style>
