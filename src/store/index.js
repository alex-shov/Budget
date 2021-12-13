import { createStore } from 'vuex'

export default createStore({
  state: {
    balance: 0,
    exchangeRate: {},
    error: false
  },
  mutations: {
    SET_BALANCE (state, newBalance) {
      state.balance = newBalance
    },
    SET_EXCHANGE_RATE (state, data) {
      state.exchangeRate = data
    },
    SET_ERROR (state) {
      state.error = true
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
