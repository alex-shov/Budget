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
    @click="confirm = true"
  >
    Delete
  </q-btn>
</div>

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm">Do you wanna delete?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Yes" color="primary" v-close-popup @click="deleteItem(item.id)" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
export default {
  name: 'BudgetListItem',
  data () {
    return {
      confirm: false
    }
  },
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
