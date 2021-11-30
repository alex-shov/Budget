<template>
  <Form
    @submit="onSubmit" />
  <Balance
    :balance="balance"
  />
  <BudgetList
    :allComing="allComing"
    @deleteItem="onDelete"
  />
</template>

<script>
import { defineComponent } from 'vue'
import Form from 'components/Form'
import Balance from 'components/Balance'
import BudgetList from 'components/BudgetList'

export default defineComponent({
  name: 'Budget',
  components: {
    Balance,
    Form,
    BudgetList
  },
  data () {
    return {
      balance: 0,
      allComing: []
    }
  },
  methods: {
    onSubmit (data) {
      this.allComing.push({ ...data })
      if (this.allComing.length) {
        const lastComing = this.allComing[this.allComing.length - 1]
        if (lastComing.type === 'INCOMING') {
          this.balance += +lastComing.value
        } else this.balance -= +lastComing.value
      }
    },
    onDelete (id) {
      const index = this.allComing.findIndex(i => i.id === id)
      if (this.allComing[index].type === 'INCOMING') {
        this.balance -= +this.allComing[index].value
      } else {
        this.balance += +this.allComing[index].value
      }
      this.allComing.splice(index, 1)
    }
  }
})
</script>
