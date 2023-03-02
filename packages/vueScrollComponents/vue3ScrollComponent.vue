<template>
    <div class="scroll-wrap" :class="isHorizontal ? 'scroll-wrap-row' : 'scroll-wrap-col'">
        <slot v-if="type == 'navigation'" name="prev" :prevClick="prevClick" :prevState="prevState">
            <div :class="[prevState ? 'nav-wrap' : 'nav-wrap-disabled']" @click="prevClick">
                <div :class="['nav-box', isHorizontal ? 'nav-prev-row' : 'nav-prev-col']"></div>
            </div>
        </slot>

        <div ref="scrollBox" class="scroll-box">
            <div :style="scrollStyle" @mouseenter="enter" @mouseleave="leave">
                <div ref="scrollList" class="slot-data">
                    <slot></slot>
                </div>
                <template v-if="type == 'seamless'">
                    <div class="slot-data-copy">
                        <slot></slot>
                    </div>
                </template>
            </div>
        </div>

        <slot v-if="type == 'navigation'" name="next" :nextClick="nextClick" :nextState="nextState">
            <div :class="[nextState ? 'nav-wrap' : 'nav-wrap-disabled']" @click="nextClick">
                <div :class="['nav-box', isHorizontal ? 'nav-next-row' : 'nav-next-col']"></div>
            </div>
        </slot>
    </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick, watch, onMounted, onBeforeUnmount } from "vue"
const baseData = reactive({
    x: 0, // X 方向滚动大小
    y: 0, // Y 方向滚动大小
    width: 0,
    height: 0,
    boxWidth: 0,
    boxHeight: 0,
    stop: false,
    reqFrame: null,
    timer: null,
    singleLength: 0
})

const scrollBox = ref(null)
const scrollList = ref(null)

const emit = defineEmits(['update:scroll', 'update:speed', 'dataUpdate', 'scrollEnd'])

const props = defineProps({
    // 是否滚动
    scroll: {
        type: Boolean,
        default: true
    },
    // 滚动速度
    speed: {
        type: Number,
        default: 1
    },
    // 滚动的数据
    data: {
        type: Array,
        default: () => {
            return []
        }
    },
    type: {
        type: String,
        default: 'seamless' // seamless 无限滚动、 navigation 手动控制
    },
    // 配置
    options: {
        type: Object,
        default: () => {
            return {
                direction: "up", // down 往下、 up 往上 、left 向左、 right 向右
                rem: false, // 启用 rem 单位

                hover: true, // 鼠标 hover 控制滚动
                singleStep: 0, // 单步滚动步长
                singleWaitTime: 1000, // 单步停止等待时间

                navStep: 30, //  navigation 滚动步长
                navEase: 'linear', // navigation 滚动动画
                navDelay: 400, // navigation 滚动动画时长
            }
        }
    }
})

// 配置
const options = computed(() => {
    return {
        direction: "up",
        rem: false,
        hover: true,
        singleStep: 0,
        singleWaitTime: 1000,
        navStep: 30,
        navEase: 'linear',
        navDelay: 400,
        ...props.options,
    }
})


// 上一步状态
const prevState = computed(() => {
    if (isHorizontal.value) {
        return baseData.x < 0
    } else {
        return baseData.y < 0
    }
})

// 下一步状态
const nextState = computed(() => {
    const x = Math.abs(baseData.x)
    const y = Math.abs(baseData.y)
    if (isHorizontal.value) {
        return baseData.width - baseData.boxWidth - x > 0
    } else {
        return baseData.height - baseData.boxHeight - y > 0
    }
})

// 滚动样式
const scrollStyle = computed(() => {
    return {
        // overflow: 'hidden',
        display: isHorizontal.value ? 'flex' : 'block',
        // width: isHorizontal.value ? 'fit-content' : 'auto',
        // width: isHorizontal.value ? 2 * baseData.boxWidth + 'px' : 'auto',
        transform: `translate3d(${baseData.x}px,${baseData.y}px,0px)`,
        transition: props.type == 'navigation' ? `all ${options.value.navEase} ${options.value.navDelay}ms` : 'none',
    }
})


// 是否水平方向滚动
const isHorizontal = computed(() => {
    return options.value.direction === "left" || options.value.direction === "right"
})
// 是否无限滚动
const seamlessScroll = computed(() => {
    return props.type == 'seamless' && props.scroll
})
// 单步滚动 位移大小
const singleDisplacement = computed(() => {
    const size = options.value.rem ? parseInt(window.getComputedStyle(document.documentElement, null).fontSize) : 1
    return options.value.singleStep * size
})
// navigation 位移大小
const navDisplacement = computed(() => {
    const size = options.value.rem ? parseInt(window.getComputedStyle(document.documentElement, null).fontSize) : 1
    return options.value.navStep * size
})
// 无限滚动步长
const step = computed(() => {
    const singleStep = singleDisplacement.value
    const speed = props.speed
    if (singleStep > 0 && singleStep % speed > 0) {
        console.error('单步滚动时speed需是singleStep的约数,否则无法保证单步滚动结束的位置的准确性。')
    }
    return speed
})

// 上一步
const prevClick = () => {
    if (!prevState.value) return

    if (isHorizontal.value) {
        // 小于单步距离
        if (Math.abs(baseData.x) < navDisplacement.value) {
            baseData.x = 0
        } else {
            baseData.x += navDisplacement.value
        }
    } else {
        // 小于单步距离
        if (Math.abs(baseData.y) < navDisplacement.value) {
            baseData.y = 0
        } else {
            baseData.y += navDisplacement.value
        }
    }
}
// 下一步
const nextClick = () => {
    if (!nextState.value) return
    if (isHorizontal.value) {
        // 小于单步距离
        if ((baseData.width - baseData.boxWidth + baseData.x) < navDisplacement.value) {
            baseData.x = baseData.boxWidth - baseData.width
        } else {
            baseData.x -= navDisplacement.value
        }
    } else {
        // 小于单步距离
        if ((baseData.height - baseData.boxHeight + baseData.y) < navDisplacement.value) {
            baseData.y = baseData.boxHeight - baseData.height
        } else {
            baseData.y -= navDisplacement.value
        }
    }
}

// 初始化
const initScroll = () => {
    nextTick(() => {

        // 盒子宽高
        baseData.boxWidth = scrollBox.value.offsetWidth
        baseData.boxHeight = scrollBox.value.offsetHeight

        // 滚动数据宽高
        baseData.width = scrollList.value.offsetWidth
        baseData.height = scrollList.value.offsetHeight

        // console.log(scrollList.value.offsetWidth);
        // console.log(scrollList.value.offsetHeight);

        if (seamlessScroll.value) {
            playScroll()
        } else {
            cancleScroll()
            baseData.x = baseData.y = 0
        }
    })
}

// 滚动
const playScroll = () => {
    // 停止
    if (baseData.stop) return
    // 清除动画 
    cancleScroll()
    baseData.reqFrame = window.requestAnimationFrame(() => {
        const { direction, singleWaitTime } = options.value
        const w = baseData.width
        const h = baseData.height
        // 滚动
        switch (direction) {
            case 'up':
                if (Math.abs(baseData.y) >= h) {
                    emit('scrollEnd')
                    baseData.y = 0
                }
                baseData.y -= step.value
                if (singleDisplacement.value)
                    baseData.singleLength += step.value
                break;
            case 'down':
                if (baseData.y >= 0) {
                    emit('scrollEnd')
                    baseData.y = h * -1
                }
                baseData.y += step.value
                if (singleDisplacement.value)
                    baseData.singleLength += step.value
                break
            case 'left':
                if (Math.abs(baseData.x) >= w) {
                    emit('scrollEnd')
                    baseData.x = 0
                }
                baseData.x -= step.value
                if (singleDisplacement.value)
                    baseData.singleLength += step.value
                break
            case 'right':
                if (baseData.x >= 0) {
                    emit('scrollEnd')
                    baseData.x = w * -1
                }
                baseData.x += step.value
                if (singleDisplacement.value)
                    baseData.singleLength += step.value
        }
        // 单步滚动
        if (!!singleDisplacement.value) {
            if (baseData.timer) clearTimeout(baseData.timer)
            if (baseData.singleLength >= singleDisplacement.value) {
                baseData.singleLength = 0
                baseData.timer = setTimeout(() => {
                    playScroll()
                }, singleWaitTime)
            } else {
                playScroll()
            }
        } else {
            playScroll()
        }
    })
}

// 取消动画
const cancleScroll = () => {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(baseData.reqFrame || '')
    }
}

// 开始滚动
const startScroll = () => {
    baseData.stop = false
    playScroll()
}
// 停止滚动
const stopScroll = () => {
    baseData.stop = true
    // 清除定时器
    if (baseData.timer) clearTimeout(baseData.timer)
    cancleScroll()
}

// 鼠标移入
const enter = () => {
    if (seamlessScroll.value && options.value.hover) stopScroll()
}

// 鼠标移出
const leave = () => {
    if (seamlessScroll.value && options.value.hover) startScroll()
}

// 重置滚动
const resetScroll = () => {
    cancleScroll()
    clearTimeout(baseData.timer)
    initScroll()
}

defineExpose({ resetScroll, prevClick, nextClick })

watch(() => props.scroll, async (nv) => {
    if (props.type == "navigation") return
    if (nv) {
        resetScroll()
    } else {
        cancleScroll()
        clearTimeout(baseData.timer)
    }
})

watch(() => props.data, async (nv) => {
    if (props.type == "navigation") return
    emit('dataUpdate')
    resetScroll()
}, { deep: true })

watch(() => props.speed, async (nv) => {
    if (props.type == "navigation") return
    if (nv) {
        resetScroll()
    }
})

onMounted(() => {
    resetScroll()
})

onBeforeUnmount(() => {
    cancleScroll()
    clearTimeout(baseData.timer)
})

</script>

<style lang="scss" scoped>
.scroll-wrap {
    display: flex;
    flex-direction: column;

    .scroll-box {
        flex: 1;
        overflow: hidden;
    }

    .scroll-list-float {
        float: left;
        overflow: hidden;
    }
}

.scroll-wrap-row {
    flex-direction: row;
}

.scroll-wrap-col {
    flex-direction: column;
}


.nav-wrap {
    cursor: pointer;

    &-disabled {
        cursor: not-allowed;
    }
}

.nav-box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 32px;
    font-size: 40px;
}

.nav-prev-row {
    position: relative;
    width: 32px;
    height: 100%;

    &:hover::after {
        border-color: #ccc;
    }

    &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border-top: 2px solid #999;
        border-left: 2px solid #999;
        transform: rotate(-45deg);
        left: 12px;
    }
}

.nav-prev-col {

    &:hover::after {
        border-color: #ccc;
    }

    &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border-top: 2px solid #999;
        border-left: 2px solid #999;
        transform: rotate(45deg);
        top: 12px;
    }
}

.nav-next-row {
    position: relative;
    width: 32px;
    height: 100%;

    &:hover::after {
        border-color: #ccc;
    }

    &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border-bottom: 2px solid #999;
        border-right: 2px solid #999;
        transform: rotate(-45deg);
        right: 12px;
    }
}

.nav-next-col {

    &:hover::after {
        border-color: #ccc;
    }

    &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border-bottom: 2px solid #999;
        border-right: 2px solid #999;
        transform: rotate(45deg);
        bottom: 12px;
    }
}
</style>