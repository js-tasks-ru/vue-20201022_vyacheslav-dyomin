export const CounterButton = {
  template: '<button type="button" @click="handleClick">{{ count }}</button>',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  model: {
    prop: 'count',
    event: 'increment'
  },
  methods: {
    handleClick() {
      this.$emit('increment', this.count + 1);
    },
  },
};
