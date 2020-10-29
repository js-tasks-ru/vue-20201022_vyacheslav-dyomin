import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const app = new Vue({
  el: '#app',

  data() {
    return {
      buttonValue: 0,
    };
  },
  methods: {
    handleClickButton() {
      this.buttonValue++;
    },
  },
});
