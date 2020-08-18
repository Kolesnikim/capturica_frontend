export default {
    state: {
        generalFirst: {}
    },
    getters: {
        getGeneralFirst(state) {
            return state.generalFirst;
        }
    },
    mutations: {
        setGeneralFirst(state, payload) {
            state.generalFirst = payload
        }
    },
    actions: {
        apiRequestGeneralFirst(context, payload) {
            context.commit('setGeneralFirst', payload);
            console.log(this.state);
        }
    },
}
