<template>
  <ConfigProvider :locale="locale">
    <div id="mars-main-view" class="mars-main-view">
      <div id="centerDiv" class="centerDiv-container">
        <mars-map :url="configUrl" @onload="marsOnload"/>
      </div>
      <template v-if="loaded">
        <template v-for="comp in widgets" :key="comp.key">
          <component
            :is="comp.component"
            v-if="openAtStart.includes(comp.name) && comp.visible"
            v-model:visible="comp.visible"
            v-bind="getWidgetAttr(comp)"
          />
        </template>
      </template>
    </div>
  </ConfigProvider>
</template>

<script lang="ts" setup>
/**
 * 渲染主入口
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2021-12-30
 */
import zhCN from "ant-design-vue/es/locale/zh_CN"
import { provide, ref } from "vue"
import { ConfigProvider } from "ant-design-vue"
import { useWidget, Widget } from "@mars/common/store/widget"
import MarsMap from "@mars/components/mars-work/mars-map.vue"

const locale = zhCN

const { widgets, openAtStart } = useWidget()

const configUrl = `${process.env.BASE_URL}config/config.json`

let mapInstance: any = null
provide("getMapInstance", () => {
  return mapInstance
})

const loaded = ref(false)
const marsOnload = (map: any) => {
  console.log("map构造完成", map)
  mapInstance = map
  loaded.value = true
}

const getWidgetAttr = (widget: Widget) => {
  let attr = {}
  if (widget.meta && widget.meta.props) {
    attr = {
      ...attr,
      ...widget.meta.props
    }
  }
  if (widget.data && widget.data.props) {
    attr = {
      ...attr,
      ...widget.data.props
    }
  }
  return attr
}
</script>

<style lang="less" scoped>
.mars-main-view {
  height: 100%;
  position: relative;
}

.centerDiv-container {
  height: 100%;
  overflow: hidden;
}
</style>
