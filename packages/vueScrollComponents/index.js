import vueScrollComponent from "./vue3ScrollComponent.vue";

vueScrollComponent.install = (Vue, options = {}) => {
  Vue.component(options.componentName || vueScroll.name, vueScrollComponent);
};

export default vueScrollComponent;
