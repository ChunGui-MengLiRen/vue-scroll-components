<script setup>
import vueScrollComponents from "../../build/vueScrollComponents-es.js";
import { ref } from 'vue'
const options = ref({
    direction: 'left',
    speed: 1,
})
</script>

<template>
    <vueScrollComponents :options="options" class="wrap">
        <div :style="{ whiteSpace: 'nowrap' }">江天一色无纤尘，皎皎空中孤月轮。回眸一笑百媚生，六宫粉黛无颜色。</div>
    </vueScrollComponents>
</template>

<style scoped lang="scss">
.wrap {
    width: 300px;
    height: 40px;
    margin: 0 auto;
    overflow: hidden;
}
</style>
