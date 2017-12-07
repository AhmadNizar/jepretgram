import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const http = axios.create({
  baseURL: `http://localhost:3000`
})

export default new Vuex.Store({
  state: {
    photos: []
  },
  mutations: {
    setAllPost (state, payload) {
      state.photos = payload
    }
  },
  actions: {
    uploadFile ({ commit }, payload) {
      http.post('/photos', {
        title: payload.title,
        file: payload.file
      }, {
        headers: {
          token: localStorage.getItem('tokenJepret')
        }
      })
      .then(({data}) => console.log(data))
      .catch(err => console.error(err))
    },
    getAllPost ({ commit }) {
      http.get('/photos')
      .then(({data}) => {
        commit('setAllPost', data)  
      })
      .catch(err => console.error(err))
    }
  }
})
