// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/scss/reset.scss';
import './assets/scss/common.scss';
import App from './App'
import router from './router'
import VueSummernote from '@/components/editer'

require('bootstrap')
require('bootstrap/dist/css/bootstrap.min.css')
require('summernote/dist/summernote.css')

Vue.use(ElementUI);
Vue.use(VueSummernote, {
  height: 300,
  disableDragAndDrop: true,
  toolbar: [
    ['style', ['style']],
    ['font', ['bold', 'underline', 'clear']],
    ['fontname', ['fontname']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['table', ['table']],
    ['insert', ['link', 'picture', 'video']],
    ['view', ['fullscreen']]
    // ['view', ['fullscreen', 'codeview', 'help']]
  ]
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
