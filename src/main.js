import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'
import './public-path.js'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import BootstrapVue3 from 'bootstrap-vue-3'

const APP_NAME = require('../package.json').name

let app = null

let router = null

function render(props = {}) {
    app = createApp(App)

    const { container } = props

    router = createRouter({
        history: createWebHistory(`/${APP_NAME}/`),
        routes,
    })

    const defaultTitle = 'Rule Engine'
    router.beforeEach((to, from, next) => {
        document.title = to.meta.title ? to.meta.title : defaultTitle
        next()
    })

    app.config.globalProperties.debounce = (fn, interval) => {
        let timer = null
        return function () {
            let context = this
            let args = arguments
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, interval)
        }
    }

    app.config.globalProperties.throttle = (fn, interval) => {
        let timer = null
        return function () {
            let context = this
            let args = arguments
            if (!timer) {
                fn.apply(context, args)
                timer = setTimeout(() => {
                    clearTimeout(timer)
                    timer = null
                }, interval)
            }
        }
    }

    let alertDict = {}

    app.config.globalProperties.createAlert = (message, alertType) => {
        if (alertDict[message + alertType]) {
            return alertDict[message + alertType]
        }

        let wrapper = document.createElement('div')

        // wrapper.innerHTML =
        //     `<a-alert type= {{alterType}}>${message}</a-alert>`

        wrapper.innerHTML = `<div class="alert alert-${alertType} position-fixed fixed-top text-center rounded-3 mt-3 m-auto p-2 w-25" role="alert"> ${message} </div>`

        document.getElementById('app').append(wrapper)

        wrapper = wrapper.firstChild
        wrapper.style.transition = 'all 0.5s'

        wrapper.show = function () {
            this.style.zIndex = 999
            this.style.opacity = 1
        }

        wrapper.hide = function () {
            this.style.opacity = 0
            this.style.zIndex = -10
        }

        wrapper.changeMessage = function (msg) {
            this.innerText = msg
        }

        wrapper.hide()

        return wrapper
    }

    app
        .use(router)
        .use(store)
        .use(Antd)
        .use(BootstrapVue3)
        .mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
    render({})
}

export async function mount(props) {
    console.log('[micro-system] props from main framework', props)

    render(props)
}

export async function unmount() {
    console.log('[micro-system] vue app unmounted')
    app.unmount()
    app = null
}

