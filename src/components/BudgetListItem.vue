<template>
<div class="q-pa-md flex flex-center">
  <q-icon :name="icon" :class="style" class="q-mr-sm" />
  <span
    class="ellipsis"
    style="width: 55%"
  >
    {{ item.comment }}

    <q-popup-edit :model-value="item.comment" auto-save v-slot="scope">
        <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set"
                 @update:model-value="editItem(scope.value, item.id)"/>
      </q-popup-edit>
    <q-tooltip>{{ item.comment }}</q-tooltip>
  </span>
  <span class="value" :class="style">{{ item.value }}
  <q-popup-edit :model-value="item.value" auto-save v-slot="scope">
    <q-input v-model.number="scope.value" dense autofocus @keyup.enter="scope.set"
             @update:model-value="editValue(scope.value, item.id)"/>
  </q-popup-edit>
    </span>
  <q-btn
    color="red"
    @click="confirm = true"
  >
    Delete
  </q-btn>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm">Do you wanna delete?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Yes" color="primary" v-close-popup @click="deleteItem(item.id, item.type, item.value)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>

</template>

<script>
import { Notify } from 'quasar'

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
    deleteItem (id, type, value) {
      this.$store.commit('DELETE_ITEM', { id, type, value })
    },
    editItem (comment, id) {
      this.$store.commit('EDIT_ITEM', { comment, id })
    },
    editValue (value, id) {
      if (typeof value !== 'number') {
        Notify.create({
          message: 'Вы ввели не число!',
          type: 'negative',
          timeout: 500
        })
        return
      }
      this.$store.commit('EDIT_VALUE', { value, id })
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
