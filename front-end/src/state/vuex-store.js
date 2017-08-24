import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        goodsDetail: null
    },
    mutations: {
        user (state, payload) {
            state.user = payload;
        },
    }
});