import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: null,
        error: false,
        colsOrder: [],
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        },
        setColsOrder(state, payload) {
            state.colsOrder = payload;
        },
        setSelectedItem(store, payload) {
            const dataCopy = {...store.data};
            dataCopy.Data[payload.editedItem.index][payload.editedItem.itemName] = payload.selectedItem;
            store.data = dataCopy;
        }
    },
    actions: {
        getData({commit}) {
            fetch('./json/example.json')
                .then(result => result.json())
                .then(res => {this.error = false; commit('setData', res)})
                .catch(error => this.error = true)
        }
    }
})
