<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Бюджет
        </q-toolbar-title>

        <div>Реализовано на Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          МЕНЮ
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { onMounted, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

const linksList = [
  {
    title: 'Бюджет',
    caption: 'Мои доходы и расходы',
    icon: 'savings',
    route: { name: '/' }
  },
  {
    title: 'Валюта',
    caption: 'Пересчёт в валюту',
    icon: 'currency_exchange',
    route: { name: 'currency' }
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const store = useStore()

    onMounted(async () => {
      await store.dispatch('getCurrentCurrency')
    })

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
