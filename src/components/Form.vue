<template>
  <div class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg"  style="width: 500px" >
      <q-form
        ref="myForm"
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
      <div>
        <q-select
          outlined
          dense
          v-model="anyComing.type"
          :options="options"
          label="Движение средств"
        />
        <q-tooltip>Приход/расход денежных средств</q-tooltip>
      </div>
        <div>
          <q-input
            outlined
            dense
            v-model="anyComing.comment"
            label="Comment *"
            lazy-rules
            :rules="[ val => val && val.trim() !== '' || 'Please type comment']"
          />
          <q-input
            outlined
            dense
            type="number"
            v-model.number="anyComing.value"
            label="Value *"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || 'Please type value',
          val => val > 0 || 'Please type value more than 0'
        ]"
          />
        </div>
        <div>
          <q-btn dense label="Add" type="submit" color="primary"/>
          <q-btn dense label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { uid } from 'quasar'

export default {
  name: 'Form',

  data () {
    return {
      anyComing: {
        type: 'INCOMING',
        comment: '',
        value: null
      },
      options: ['INCOMING', 'OUTCOMING']
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit', {
        ...this.anyComing,
        value: this.anyComing.value, // Number(this.anyComing.value),
        id: uid()
      })
      this.onReset()
      this.$refs.myForm.resetValidation()
    },
    onReset () {
      this.anyComing.type = 'INCOMING'
      this.anyComing.comment = ''
      this.anyComing.value = null
    }
  }
}
</script>

<style scoped>

</style>
