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
        <ul>
            <li v-for="index in 8" :key="index" class="item">
                {{ index }}
            </li>
        </ul>
    </vueScrollComponents>
</template>

<style scoped lang="scss">
.wrap {
    width: 600px;
    height: 100px;
    margin: 0 auto;
    overflow: hidden;

    ul {
        list-style: none;
        display: flex;
        margin: 0;
        padding: 0;

        li {
            box-sizing: border-box;
            width: 100px;
            height: 100px;
            background-color: #ccc;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
        }
    }
}
</style>
