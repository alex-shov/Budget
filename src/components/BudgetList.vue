<template>
  <div class="q-pa-md flex flex-center" >
    <q-card class="my-card q-pa-lg" style="width: 500px" >
      <q-card-section>
        <div class="text-center text-weight-bold">Budget List</div>
      </q-card-section>
      <q-separator  />
      <q-card-section v-if="allComing.length">
      <BudgetListItem
        v-for="item in allComing"
        :key="item.id"
        :item="item"
        @deleteItem="deleteItem"
      />
        </q-card-section>
      <div
        v-else
        class="q-pa-md flex flex-center">
        Список пуст
      </div>
    </q-card>

  </div>
</template>

<script>
import BudgetListItem from 'components/BudgetListItem'

export default {
  name: 'BudgetList',
  components: {
    BudgetListItem
  },
  props: {
    allComing: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    deleteItem (id) {
      this.$emit('deleteItem', id)
    }
  }
}
</script>

<style scoped>
.budget-list-wrap {
  max-width: 500px;
  margin: auto;
}
</style>
