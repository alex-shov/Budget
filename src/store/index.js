import { createStore } from 'vuex'
import { Notify } from 'quasar'
import axios from 'axios'

export default createStore({
  state: {
    balance: 0,
    allComing: [],
    exchangeRate: {},
    error: false
  },
  actions: {
    getCurrentCurrency () {
      axios.get('https://www.cbr-xml-daily.ru/daily_json.js').then(({ data }) => {
        this.commit('SET_EXCHANGE_RATE', data.Valute)
      }).catch(() => {
        Notify.create({
          message: 'Не получен с сервера список валют!',
          type: 'negative',
          timeout: 2000
        })
      })
    }
  },
  mutations: {
    SET_COMING (state, data) {
      state.allComing.push(data)
    },
    SET_BALANCE (state, newBalance) {
      state.balance = newBalance
    },
    EDIT_ITEM (state, { comment, id }) {
      state.allComing.find(i => i.id === id).comment = comment
    },
    EDIT_VALUE (state, { value, id }) {
      state.allComing.find(i => i.id === id).value = value
      let balance = 0
      state.allComing.forEach(i => {
        if (i.type === 'INCOMING') balance += i.value
        else balance -= i.value
      })
      state.balance = balance
    },
    DELETE_ITEM (state, { id, type, value }) {
      const index = state.allComing.findIndex(i => i.id === id)
      let newBalance
      if (type === 'INCOMING') {
        newBalance = state.balance - value
      } else {
        newBalance = state.balance + value
      }
      state.balance = newBalance
      state.allComing.splice(index, 1)
    },
    SET_EXCHANGE_RATE (state, data) {
      state.exchangeRate = data
    }
  },
  getters: {
    getCurrent (state) {
      return Object.values(state.exchangeRate).map(i => i.Name)
    },
    getExchangeRate (state) {
      return Object.values(state.exchangeRate)
    }
  }
})
