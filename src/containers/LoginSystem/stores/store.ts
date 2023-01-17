import { createStore } from 'vuex';

export const store = createStore( {
    state: {
     activeUser: {
       userName: '',
       userEmail: '',
       userPassword: '',
     },
      receivedOrdersData: {
        id: '',
        email: '',
        amount: '',
        date: ''
      },
      
    },
    mutations: {
      addActiveUser(state, value) {
        state.activeUser = value
      },
      changeOrdersData(state, value) {
        state.receivedOrdersData = value;
      },
    }
})
