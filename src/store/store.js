import Vue from 'vue'
import Vuex from 'vuex'
// import vuexAlong from 'vuex-along'

Vue.use(Vuex)

let treeData = [{
  organguid: '1',
  parentguid: '0',
  organtype: '1',
  organDesc: '',
  organname: '中国文学',
  children: [{
    organguid: '4',
    parentguid: '1',
    organtype: '2',
    organDesc: '',
    organname: '近代文学'
  }, {
    organguid: '5',
    parentguid: '1',
    organtype: '2',
    organDesc: '',
    organname: '古典文学'
  }]
},
{
  organguid: '2',
  parentguid: '0',
  organtype: '1',
  organDesc: '',
  organname: '小说',
  children: [{
    organguid: '6',
    parentguid: '2',
    organtype: '2',
    organDesc: '',
    organname: '经典小说'
  }, {
    organguid: '7',
    parentguid: '2',
    organtype: '2',
    organDesc: '',
    organname: '古侠小说'
  }]
}, {
  organguid: '3',
  parentguid: '0',
  organtype: '1',
  organDesc: '',
  organname: '辅导资料',
  children: [{
    organguid: '8',
    parentguid: '3',
    organtype: '2',
    organDesc: '',
    organname: '高考'
  }, {
    organguid: '9',
    parentguid: '3',
    organtype: '2',
    organDesc: '',
    organname: '出国考试',
    children: [{
      organguid: '10',
      parentguid: '9',
      organtype: '3',
      organDesc: '',
      organname: '雅思'
    }, {
      organguid: '11',
      parentguid: '9',
      organtype: '3',
      organDesc: '',
      organname: '托福'
    }, {
      organguid: '12',
      parentguid: '9',
      organtype: '3',
      organDesc: '',
      organname: 'GRE'
    }]
  }]
}]
try {
  if (localStorage.treeData) {
    treeData = localStorage.treeData
  }
} catch (e) {}
const store = new Vuex.Store({
  state: {
    treeData: treeData
  },
  // plugins: [vuexAlong],
  mutations: {
    SET_TREEDATA (state, payload) {
      let j = {
        organname: 'sd',
        parentguid: ''
      }
      state.treeData.push(j)
      try {
        localStorage.treeData = state.treeData
      } catch (e) {}
    }
  },
  actions: {
    setTreeData ({ commit }, payload) {
      commit('SET_TREEDATA', payload)
    }
  },
  strict: false
})

export default store
