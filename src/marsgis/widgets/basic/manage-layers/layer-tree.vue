<template>
  <mars-dialog :min-width="320" bottom="50" left="10" title="模型构件" top="70" width="320">
    <mars-tree :tree-data="LayerTreeData" checkable @check="onModelChecked" @select="flytoModelNode"/>
  </mars-dialog>
</template>
<script lang="ts" setup>
import { onMounted, ref, toRaw } from "vue"
import MarsDialog from "@mars/components/mars-work/mars-dialog.vue"
import * as mapWork from "./map"
import axios from "axios"
import { $message } from "@mars/components/mars-ui/index"
import { useWidget } from "@mars/common/store/widget"

const { getWidget } = useWidget()

const widgetData = getWidget("layer-tree")

// 加载拥有关联图层的树控件
const LayerTreeData = ref<any[]>([])

let keyVal = 0

onMounted(async () => {
  const url = widgetData.data.url

  const scenetree = url.substring(0, url.lastIndexOf("/") + 1) + "scenetree.json"

  const scene: any = await axios.get(scenetree)

  if (scene.data) {
    let item = scene.data
    if (scene.data.scenes) {
      item = scene.data.scenes[0]
    }
    const childeren = isHaveChildren(item.children)
    LayerTreeData.value.push({
      title: item.name,
      key: keyVal,
      id: item.id,
      sphere: item.sphere ? item.sphere : null,
      children: childeren
    })
  } else {
    LayerTreeData.value = []
  }
})

function isHaveChildren(arr: any) {
  if (!arr) {
    return []
  }
  keyVal++
  const childeren: any[] = []
  arr.forEach((item: any) => {
    const childrenObject: any = {}
    childrenObject.title = item.name ? item.name : "element"
    childrenObject.key = keyVal + "-" + Math.random()
    childrenObject.id = item.id
    childrenObject.sphere = item.sphere

    const childOne: any = isHaveChildren(item.children)
    if (childOne.length !== 0) {
      childrenObject.children = childOne
    }
    return childeren.push(childrenObject)
  })
  return childeren
}

// 点击节点 定位
const flytoModelNode = (selectedKeys: any, selected: any) => {
  const id = toRaw(widgetData.data.id)
  mapWork.flytoModelNode(id, selected.node.sphere)
}

// 选中节点 修改样式
const onModelChecked = (keys: string[], e: any) => {
  const id = toRaw(widgetData.data.id)
  // 判断
  if (keys.length > 2000) {
    $message(`勾选数据${keys.length}大于2000，请减少勾选数量。`)
    return
  }
  mapWork.checkModelStyle(id, e.checkedNodes)
}
</script>

<style lang="less" scoped></style>
