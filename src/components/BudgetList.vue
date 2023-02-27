<template>
  <div class="q-pa-md flex flex-center" >
    <q-card class="q-pa-md" style="width: 500px" >
      <q-card-section class="q-pt-none">
        <div class="text-h5 text-center q-mb-sm">Budget List</div>
        <div class="flex justify-between">
        <q-input
          outlined
          dense
          v-model="inputValue"
          label="Search"
        >
          <template v-slot:append v-if="inputValue">
            <q-icon name="close" @click="inputValue = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <q-btn-group push>
          <q-btn push :outline="filterType === 'all'" label="All" @click="filterType = 'all'" />
          <q-btn push :outline="filterType === 'in'" icon="add_circle_outline" @click="filterType = 'in'" />
          <q-btn push :outline="filterType === 'out'" icon="remove_circle_outline" @click="filterType = 'out'" />
        </q-btn-group>
        </div>
      </q-card-section>
      <q-separator  />
      <q-card-section v-if="allComingFilter.length">
      <BudgetListItem
        v-for="item in allComingFilter"
        :key="item.id"
        :item="item"
      />
        </q-card-section>
      <div
        v-else
        class="q-pa-md flex flex-center">
        Empty List
      </div>
    </q-card>

  </div>
</template>

<script>
import BudgetListItem from 'components/BudgetListItem'
import { mapState } from 'vuex'

export default {
  name: 'BudgetList',
  components: {
    BudgetListItem
  },
  data () {
    return {
      filterType: 'all',
      inputValue: ''
    }
  },
  methods: {
    deleteItem (props) {
      this.$emit('deleteItem', props)
    },
    editItem (props) {
      this.$emit('editItem', props)
    },
    editValue (props) {
      this.$emit('editValue', props)
    }
  },
  computed: {
    ...mapState({
      allComing: state => state.allComing
    }),
    allComingFilter () {
      if (this.filterType === 'out') {
        return this.allComing.filter(item => item.type === 'OUTCOMING')
          .filter(i => i.comment.toLowerCase().includes(this.inputValue.toLowerCase()))
      }
      if (this.filterType === 'in') {
        return this.allComing.filter(item => item.type === 'INCOMING')
          .filter(i => i.comment.toLowerCase().includes(this.inputValue.toLowerCase()))
      }
      return this.allComing.filter(i => i.comment.toLowerCase().includes(this.inputValue.toLowerCase()))
    }
  }
}
</script>

<style scoped>

</style>
