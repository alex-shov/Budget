<template>
<div class="q-pa-md flex flex-center">
  <q-icon :name="icon" :class="style" class="q-mr-sm" />
  <span
    class="ellipsis"
    style="max-width: 55%"
  >
    {{ item.comment }}
    <q-tooltip>{{ item.comment }}</q-tooltip>
  </span>
  <span class="value" :class="style">{{ item.value }}</span>
  <q-btn
    color="red"
    @click="deleteItem(item.id)"
  >
    Delete
  </q-btn>
</div>
</template>

<script>
export default {
  name: 'BudgetListItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    style () {
      return this.item.type === 'INCOMING' ? 'incoming' : 'outcoming'
    },
    icon () {
      return this.item.type === 'INCOMING' ? 'add_circle_outline' : 'remove_circle_outline'
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

.value {
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;
}
.incoming {
  color: green;
  font-size: 16px;
  font-weight: bold;
}
.outcoming {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
</style>
