<template>
  <div>
  <div class="total-value" :class="color">Balance: {{ balance }}</div>
    <div>{{this.$store.state.balance}}</div>
  </div>
</template>

<script>
export default {
  name: 'Balance',
  props: {
    balance: {
      type: Number,
      default: 0
    }
  },
  computed: {
    color () {
      if (this.balance > 0) return 'positive'
      if (this.balance < 0) return 'negative'
      return 'zero'
    }
  }
}
</script>

<style scoped>
.total-value {
  font-size: 34px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 20px;
  text-align: center;
}
.positive {
  color: green;
}
.negative {
  color: red;
}
.zero {
  color: black;
}
</style>
