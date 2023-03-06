<template>
  <Form  @submit="onSubmit" />
  <Balance />
  <BudgetList />
</template>

<script>
import { defineComponent } from 'vue'
import Form from 'components/Form'
import Balance from 'components/Balance'
import BudgetList from 'components/BudgetList'
import { mapState, mapGetters } from 'vuex'

export default defineComponent({
  name: 'Budget',
  components: {
    Balance,
    Form,
    BudgetList
  },

  computed: {
    ...mapState({
      balance: state => state.balance
    }),
    ...mapGetters(
      ['getExchangeRate']
    )
  },
  methods: {
    onSubmit (data) {
      this.$store.commit('SET_COMING', data)
      if (data.type === 'INCOMING') {
        const newBalance = this.balance + data.value
        this.$store.commit('SET_BALANCE', newBalance)
      } else {
        const newBalance = this.balance - data.value
        this.$store.commit('SET_BALANCE', newBalance)
      }
      // }
    }
  }
})
</script>
