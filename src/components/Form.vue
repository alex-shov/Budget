<template>
  <div class="q-pa-md flex flex-center" >
    <q-card class="my-card q-pa-lg"  style="width: 500px" >
      <q-form
        ref="myForm"
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-select
          outlined
          dense
          v-model="anyComing.type"
          :options="options"
          label="Движение средств"
        />
        <div>
          <q-input
            outlined
            dense
            v-model="anyComing.comment"
            label="Comment *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type comment']"
          />
          <q-input
            outlined
            dense
            type="number"
            v-model="anyComing.value"
            label="Value *"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || 'Please type value',
          val => val > 0 || 'Please type value more than 0'
        ]"
          />
        </div>
        <div>
          <q-btn dense label="Submit" type="submit" color="primary"/>
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
        id: uid()
      })
      this.onReset()
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
