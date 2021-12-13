<template>
  <Form
    @submit="onSubmit" />
  <Balance
    :balance="balance"
  />
  <BudgetList
    :allComing="allComing"
    @deleteItem="onDelete"
    @editItem="editItem"
    @editValue="editValue"
  />
</template>

<script>
import { defineComponent, ref } from 'vue'
import Form from 'components/Form'
import Balance from 'components/Balance'
import BudgetList from 'components/BudgetList'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'Budget',
  components: {
    Balance,
    Form,
    BudgetList
  },
  data () {
    return {
      // balance: 0,
      allComing: ref([])
    }
  },
  mounted () {
    this.$api.get().then(({ data }) => {
      this.$store.commit('SET_EXCHANGE_RATE', data.Valute)
    }).catch(() => {
      this.$store.commit('SET_ERROR')
    })
  },
  computed: {
    ...mapState({
      balance: state => state.balance
    })
  },
  methods: {
    onSubmit (data) {
      this.allComing.push(data)
      // if (this.allComing.length) {
      // const lastComing = this.allComing[this.allComing.length - 1]
      if (data.type === 'INCOMING') {
        const newBalance = this.balance + data.value
        this.$store.commit('SET_BALANCE', newBalance)
        // this.balance += +lastComing.value
      } else {
        const newBalance = this.balance - data.value
        this.$store.commit('SET_BALANCE', newBalance)
      }
      // }
    },
    onDelete ({ id, type, value }) {
      const index = this.allComing.findIndex(i => i.id === id)
      if (type === 'INCOMING') {
        const newBalance = this.balance - value
        this.$store.commit('SET_BALANCE', newBalance)
      } else {
        const newBalance = this.balance + value
        this.$store.commit('SET_BALANCE', newBalance)
      }
      this.allComing.splice(index, 1)
    },
    editItem ({ comment, id }) {
      this.allComing.find(i => i.id === id).comment = comment
    },
    editValue ({ value, id }) {
      this.allComing.find(i => i.id === id).value = value
      let balance = 0
      this.allComing.forEach(i => {
        if (i.type === 'INCOMING') balance += i.value
        else balance -= i.value
      })
      this.$store.commit('SET_BALANCE', balance)
    }
  }
})
</script>
