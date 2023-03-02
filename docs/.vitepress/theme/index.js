// 导入scroll 组件
import DefaultTheme from "vitepress/theme";
import vueScrollComponents from "../../../dist/vueScrollComponents-es.js";
import Scroll01 from "../components/Scroll01.vue";
import Scroll02 from "../components/Scroll02.vue";
import Scroll03 from "../components/Scroll03.vue";
import Scroll04 from "../components/Scroll04.vue";
import Scroll05 from "../components/Scroll05.vue";
import Scroll06 from "../components/Scroll06.vue";
import Scroll07 from "../components/Scroll07.vue";
import Scroll08 from "../components/Scroll08.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("vueScrollComponents", vueScrollComponents);
    app.component("Scroll01", Scroll01);
    app.component("Scroll02", Scroll02);
    app.component("Scroll03", Scroll03);
    app.component("Scroll04", Scroll04);
    app.component("Scroll05", Scroll05);
    app.component("Scroll06", Scroll06);
    app.component("Scroll07", Scroll07);
    app.component("Scroll08", Scroll08);
  },
};
