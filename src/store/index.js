import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'

import menus from './modules/menus'
import segmentations from './modules/segmentations'

Vue.use(Vuex)

const state = {
  userId: 'abcd',
  currentLayout: {
    // name: '2By2'
    name: 'both'
  },
  focusedCanvas: {},
  currentAction: {},
  currentSelect: {},
  showTags: false,
  tagInfo: {},
  tagLeftInfo: {},
  tagRightInfo: {},
  showAnalysisReportPopup: false,
  capturedImage: {
    layout1: null,
    layout2: null,
    layout3: null
  },
  analysisReport: null,
  report: {},
  maskOpacity: 100
}

const getters = {
  focusedCanvas: state => state.focusedCanvas,
  tagInfo: state => state.tagInfo,
  tagLeftInfo: state => state.tagLeftInfo,
  tagRightInfo: state => state.tagRightInfo,
  showAnalysisReportPopup: state => state.showAnalysisReportPopup,
  capturedImage: state => state.capturedImage,
  analysisReport: state => state.analysisReport,
  report: state => state.report,
  maskOpacity: state => state.maskOpacity
}

const store = new Vuex.Store({
  state,
  modules: {
    menus,
    segmentations
  },
  getters,
  actions,
  mutations
})

export default store
