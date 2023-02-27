<template>
  <div class="text-h4 text-center q-my-sm">Пересчёт в валюту</div>
  <div class="q-pa-md flex flex-center" >
    <q-card class="my-card q-pa-lg"  style="width: 500px" >

        <q-select
          v-bind="$attrs"
          outlined
          v-model="currency"
          :options="this.$store.getters.getCurrent"
          :option-label="Name"
          :option-value="Value"
          label="Выберите валюту"
        />
    </q-card>

  </div>
  <Balance
    :currency="currency"
  />
</template>

<script>
import Balance from 'components/Balance'

export default {
  components: {
    Balance
  },

  name: 'Currency',
  data () {
    return {
      currency: null
    }
  },
  computed: {
    error () {
      return this.$store.state.error
    }
  }
}

</script>

<style scoped>

</style>
