import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { injectState, key } from "@mars/common/store/widget"
import widgetStore from "@mars/pages/index/widget-store"
import MarsUI from "@mars/components/mars-ui"
import directive from "@mars/directive/index"

import "mars3d/dist/mars3d.css"

createApp(App).use(store).use(router).use(MarsUI).use(injectState(widgetStore), key).use(directive).mount("#app")
