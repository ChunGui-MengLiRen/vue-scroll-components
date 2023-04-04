import vueScrollComponent from "./vue3ScrollComponent.vue";

vueScrollComponent.install = (Vue, options = {}) => {
  Vue.component(options.componentName || vueScrollComponent.name, vueScrollComponent);
};

export default vueScrollComponent;
