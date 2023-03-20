<script setup>
import vueScrollComponent from "../packages/vueScrollComponents/vue3ScrollComponent.vue"
import { ref } from 'vue'
const options1 = ref({
  direction: 'left',
})

const options2 = ref({
  direction: 'left',
  navStep: 110, //  navigation 滚动步长
  navEase: 'linear', // navigation 滚动动画
  navDelay: 400, // navigation 滚动动画时长

})


const scroll = ref(true)
const listData1 = ref([{
  'title': '无缝滚动第一行无缝滚动第一行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第二行无缝滚动第二行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第三行无缝滚动第三行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第四行无缝滚动第四行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第五行无缝滚动第五行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第六行无缝滚动第六行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第七行无缝滚动第七行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第八行无缝滚动第八行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第九行无缝滚动第九行',
  'date': '2017-12-16'
}])

// setTimeout(() => {
//   listData1.value[0] = {
//     'title': '数据改变了',
//     'date': '2023-02-09'
//   }
// }, 5000)

</script>

<template>
  <div>
    <vueScrollComponent :data="listData1" v-model:scroll="scroll" class="warp1" :options="options1">
      <div :style="{ whiteSpace: 'nowrap' }">江天一色无纤尘，皎皎空中孤月轮。回眸一笑百媚生，六宫粉黛无颜色。</div>
    </vueScrollComponent>

    <vueScrollComponent :data="listData1" class="warp2" type="navigation" :options="options2">
      <ul class="item-box">
        <li v-for="index in 8" :key="index" class="item">
          {{ index }}
        </li>
      </ul>
    </vueScrollComponent>
  </div>
</template>

<style scoped lang="scss">
.warp1 {
  height: 256px;
  width: 360px;
  margin: 0 auto;
  overflow: hidden;

  .item {
    width: 100%;
    /* width: 300px; */
    /* width: 100%; */
    list-style: none;
    padding: 0;
    margin: 0 auto;
  }

  li {
    // width: 200px;
    // width: 100%;
    height: 32px;
    line-height: 32px;
    display: flex;
    justify-content: space-between;
  }
}

.warp2 {
  height: 100px;
  width: 600px;
  margin: 0 auto;
  overflow: hidden;

  .item-box {
    display: flex;
    gap: 10px;
  }

  .item {
    width: 100px;
    height: 100px;
    list-style: none;
    background-color: #999;
  }
}
</style>
