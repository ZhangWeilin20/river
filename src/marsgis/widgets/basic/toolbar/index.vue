<template>
  <mars-pannel customClass="base-pannel" right="10" top="10">
    <template v-for="(item, i) in data" :key="i">
      <mars-button v-if="item.widget && !item.children" type="link" @click="showWidget(item.widget)">
        <component :is="item.icon"/>
        <span>{{ item.name }}</span>
      </mars-button>
      <mars-dropdown v-if="item.children && !item.widget" placement="bottomRight" trigger="click">
        <mars-button type="link">
          <component :is="item.icon"/>
          <span>{{ item.name }}</span>
          <down size="18" theme="outline"/>
        </mars-button>
        <template #overlay>
          <a-menu @click="clickMenu">
            <a-menu-item v-for="child in item.children" :key="child.widget">
              <component :is="child.icon"/>
              <span>{{ child.name }}</span>
            </a-menu-item>
          </a-menu>
        </template>
      </mars-dropdown>
      <a-divider v-if="i < data.length - 1" type="vertical"/>
    </template>
  </mars-pannel>
</template>

<script lang="ts" setup>
/**
 * 导航菜单按钮 （右上角）
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2021-12-10
 */
import { h } from "vue"
import { Down, International, Layers, Local, Ruler, Tool } from "@icon-park/vue-next"
import MarsPannel from "@mars/components/mars-work/mars-pannel.vue"
import { useWidget } from "@mars/common/store/widget"

const { activate } = useWidget()

const data = [
  { name: "底图", icon: h(International, { theme: "outline", size: "18" }), widget: "manage-basemap" },
  { name: "图层", icon: h(Layers, { theme: "outline", size: "18" }), widget: "manage-layers" },
  {
    name: "工具",
    icon: h(Tool, { theme: "outline", size: "18" }),
    children: [
      { name: "图上量算", icon: h(Ruler, { theme: "outline", size: "18" }), widget: "measure" },
      // { name: "空间分析", icon: h(Analysis, { theme: "outline", size: "18" }), widget: "analysis" },
      { name: "坐标定位", icon: h(Local, { theme: "outline", size: "18" }), widget: "select-point" }
      // { name: "地区导航", icon: h(Navigation, { theme: "outline", size: "18" }), widget: "navigation" },
      // { name: "我的标记", icon: h(Mark, { theme: "outline", size: "18" }), widget: "addmarker" },
      // { name: "视角书签", icon: h(Bookmark, { theme: "outline", size: "18" }), widget: "bookmark" },
      // { name: "地图打印", icon: h(Printer, { theme: "outline", size: "18" }), widget: "print" },
      // { name: "飞行漫游", icon: h(TakeOff, { theme: "outline", size: "18" }), widget: "roamLine" },
      // { name: "图上标绘", icon: h(HandPaintedPlate, { theme: "outline", size: "18" }), widget: "plot" },
      // { name: "路线导航", icon: h(Connection, { theme: "outline", size: "18" }), widget: "query-route" },
      // { name: "卷帘对比", icon: h(SwitchContrast, { theme: "outline", size: "18" }), widget: "map-split" },
      // { name: "分屏对比", icon: h(FullScreenPlay, { theme: "outline", size: "18" }), widget: "screen-compare" },
      // { name: "百度街景", icon: h(City, { theme: "outline", size: "18" }), widget: "street-view" }
    ]
  }
]

const showWidget = (widget: string) => {
  console.log(widget)
  activate(widget)
}

const clickMenu = ({ key }: any) => {
  showWidget(key)
}
</script>

<style lang="less">
.base-pannel {
  background: none !important;
  padding: 0 !important;
  border: none !important;
  background-color: rgba(43, 44, 47, 0.8) !important;

  .ant-btn {
    padding: 5px 10px;
  }
}
</style>
