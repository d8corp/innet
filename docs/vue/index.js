const length = 10000 // 1000

Vue.component('my-button', {
  template: '<button @click="add">{{count}}</button>',
  data: () => ({
    count: 0
  }),
  // mounted () {
  //   setTimeout(() => this.count = 1)
  // },
  methods: {
    add () {
      this.count++
    }
  }
})

new Vue({
  el: '#app',
  data: {
    items: [...new Array(length)].map((v, i) => i)
  }
})
