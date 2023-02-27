<template>
  <div class="total-value" :class="color">Balance: {{ totalBalance }} {{ rub }}</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Balance',
  props: {
    currency: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      balance: state => state.balance
    }),
    color () {
      if (this.balance > 0) return 'positive'
      if (this.balance < 0) return 'negative'
      return 'zero'
    },
    totalBalance () {
      if (this.currency) {
        return this.balance / this.$store.getters.getExchangeRate.find(i => i.Name === this.currency).Value
      }
      return this.balance
    },
    rub () {
      return this.currency ? '' : 'руб.'
    }
  }
}
</script>

<style scoped>
.total-value {
  font-size: 34px;
  font-weight: 500;
  text-transform: uppercase;
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
