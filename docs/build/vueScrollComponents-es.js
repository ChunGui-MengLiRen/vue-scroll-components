import { reactive as U, ref as H, computed as o, watch as T, onMounted as O, onBeforeUnmount as V, openBlock as $, createElementBlock as z, normalizeClass as g, unref as u, renderSlot as x, createElementVNode as p, createCommentVNode as W, normalizeStyle as j, nextTick as G } from "vue";
const J = (a, m) => {
  const s = a.__vccOpts || a;
  for (const [l, e] of m)
    s[l] = e;
  return s;
}, K = {
  key: 0,
  class: "slot-data-copy"
}, P = {
  __name: "vue3ScrollComponent",
  props: {
    // 是否滚动
    scroll: {
      type: Boolean,
      default: !0
    },
    // 滚动速度
    speed: {
      type: Number,
      default: 1
    },
    // 滚动的数据
    data: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: "seamless"
      // seamless 无限滚动、 navigation 手动控制
    },
    // 配置
    options: {
      type: Object,
      default: () => ({
        direction: "up",
        // down 往下、 up 往上 、left 向左、 right 向右
        rem: !1,
        // 启用 rem 单位
        hover: !0,
        // 鼠标 hover 控制滚动
        singleStep: 0,
        // 单步滚动步长
        singleWaitTime: 1e3,
        // 单步停止等待时间
        navStep: 30,
        //  navigation 滚动步长
        navEase: "linear",
        // navigation 滚动动画
        navDelay: 400
        // navigation 滚动动画时长
      })
    }
  },
  emits: ["update:scroll", "update:speed", "dataUpdate", "scrollEnd"],
  setup(a, { expose: m, emit: s }) {
    const l = a, e = U({
      x: 0,
      // X 方向滚动大小
      y: 0,
      // Y 方向滚动大小
      width: 0,
      height: 0,
      boxWidth: 0,
      boxHeight: 0,
      stop: !1,
      reqFrame: null,
      timer: null,
      singleLength: 0
    }), S = H(null), w = H(null), n = o(() => ({
      direction: "up",
      rem: !1,
      hover: !0,
      singleStep: 0,
      singleWaitTime: 1e3,
      navStep: 30,
      navEase: "linear",
      navDelay: 400,
      ...l.options
    })), b = o(() => r.value ? e.x < 0 : e.y < 0), k = o(() => {
      const t = Math.abs(e.x), d = Math.abs(e.y);
      return r.value ? e.width - e.boxWidth - t > 0 : e.height - e.boxHeight - d > 0;
    }), D = o(() => ({
      // overflow: 'hidden',
      display: r.value ? "flex" : "block",
      // width: isHorizontal.value ? 'fit-content' : 'auto',
      // width: isHorizontal.value ? 2 * baseData.boxWidth + 'px' : 'auto',
      transform: `translate3d(${e.x}px,${e.y}px,0px)`,
      transition: l.type == "navigation" ? `all ${n.value.navEase} ${n.value.navDelay}ms` : "none"
    })), r = o(() => n.value.direction === "left" || n.value.direction === "right"), _ = o(() => l.type == "seamless" && l.scroll), v = o(() => {
      const t = n.value.rem ? parseInt(window.getComputedStyle(document.documentElement, null).fontSize) : 1;
      return n.value.singleStep * t;
    }), i = o(() => {
      const t = n.value.rem ? parseInt(window.getComputedStyle(document.documentElement, null).fontSize) : 1;
      return n.value.navStep * t;
    }), c = o(() => {
      const t = v.value, d = l.speed;
      return t > 0 && t % d > 0 && console.error("单步滚动时speed需是singleStep的约数,否则无法保证单步滚动结束的位置的准确性。"), d;
    }), C = () => {
      b.value && (r.value ? Math.abs(e.x) < i.value ? e.x = 0 : e.x += i.value : Math.abs(e.y) < i.value ? e.y = 0 : e.y += i.value);
    }, E = () => {
      k.value && (r.value ? e.width - e.boxWidth + e.x < i.value ? e.x = e.boxWidth - e.width : e.x -= i.value : e.height - e.boxHeight + e.y < i.value ? e.y = e.boxHeight - e.height : e.y -= i.value);
    }, F = () => {
      G(() => {
        e.boxWidth = S.value.offsetWidth, e.boxHeight = S.value.offsetHeight, e.width = w.value.offsetWidth, e.height = w.value.offsetHeight, _.value ? h() : (f(), e.x = e.y = 0);
      });
    }, h = () => {
      e.stop || (f(), e.reqFrame = window.requestAnimationFrame(() => {
        const { direction: t, singleWaitTime: d } = n.value, L = e.width, M = e.height;
        switch (t) {
          case "up":
            Math.abs(e.y) >= M && (s("scrollEnd"), e.y = 0), e.y -= c.value, v.value && (e.singleLength += c.value);
            break;
          case "down":
            e.y >= 0 && (s("scrollEnd"), e.y = M * -1), e.y += c.value, v.value && (e.singleLength += c.value);
            break;
          case "left":
            Math.abs(e.x) >= L && (s("scrollEnd"), e.x = 0), e.x -= c.value, v.value && (e.singleLength += c.value);
            break;
          case "right":
            e.x >= 0 && (s("scrollEnd"), e.x = L * -1), e.x += c.value, v.value && (e.singleLength += c.value);
        }
        v.value ? (e.timer && clearTimeout(e.timer), e.singleLength >= v.value ? (e.singleLength = 0, e.timer = setTimeout(() => {
          h();
        }, d)) : h()) : h();
      }));
    }, f = () => {
      window.cancelAnimationFrame && window.cancelAnimationFrame(e.reqFrame || "");
    }, q = () => {
      e.stop = !1, h();
    }, A = () => {
      e.stop = !0, e.timer && clearTimeout(e.timer), f();
    }, N = () => {
      _.value && n.value.hover && A();
    }, I = () => {
      _.value && n.value.hover && q();
    }, y = () => {
      f(), clearTimeout(e.timer), F();
    };
    return m({ resetScroll: y, prevClick: C, nextClick: E }), T(() => l.scroll, async (t) => {
      l.type != "navigation" && (t ? y() : (f(), clearTimeout(e.timer)));
    }), T(() => l.data, async (t) => {
      l.type != "navigation" && (s("dataUpdate"), y());
    }, { deep: !0 }), T(() => l.speed, async (t) => {
      l.type != "navigation" && t && y();
    }), O(() => {
      y();
    }), V(() => {
      f(), clearTimeout(e.timer);
    }), (t, d) => ($(), z("div", {
      class: g(["scroll-wrap", u(r) ? "scroll-wrap-row" : "scroll-wrap-col"])
    }, [
      a.type == "navigation" ? x(t.$slots, "prev", {
        key: 0,
        prevClick: C,
        prevState: u(b)
      }, () => [
        p("div", {
          class: g([u(b) ? "nav-wrap" : "nav-wrap-disabled"]),
          onClick: C
        }, [
          p("div", {
            class: g(["nav-box", u(r) ? "nav-prev-row" : "nav-prev-col"])
          }, null, 2)
        ], 2)
      ], !0) : W("", !0),
      p("div", {
        ref_key: "scrollBox",
        ref: S,
        class: "scroll-box"
      }, [
        p("div", {
          style: j(u(D)),
          onMouseenter: N,
          onMouseleave: I
        }, [
          p("div", {
            ref_key: "scrollList",
            ref: w,
            class: "slot-data"
          }, [
            x(t.$slots, "default", {}, void 0, !0)
          ], 512),
          a.type == "seamless" ? ($(), z("div", K, [
            x(t.$slots, "default", {}, void 0, !0)
          ])) : W("", !0)
        ], 36)
      ], 512),
      a.type == "navigation" ? x(t.$slots, "next", {
        key: 1,
        nextClick: E,
        nextState: u(k)
      }, () => [
        p("div", {
          class: g([u(k) ? "nav-wrap" : "nav-wrap-disabled"]),
          onClick: E
        }, [
          p("div", {
            class: g(["nav-box", u(r) ? "nav-next-row" : "nav-next-col"])
          }, null, 2)
        ], 2)
      ], !0) : W("", !0)
    ], 2));
  }
}, B = /* @__PURE__ */ J(P, [["__scopeId", "data-v-c2569f26"]]);
B.install = (a, m = {}) => {
  a.component(m.componentName || vueScroll.name, B);
};
export {
  B as default
};
//# sourceMappingURL=vueScrollComponents-es.js.map
