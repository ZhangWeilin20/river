<template>
  <mars-dialog bottom="40" height="400" right="20" title="我的弹窗" top="40" width="300">
    <a-row :gutter="5">
      <a-col :span="19">
        <mars-input v-model:value="extent" :allowClear="true"></mars-input>
      </a-col>
      <a-col :span="5">
        <a-space size="small">
          <mars-button class="small-btn" @click="onClickDrawExtent">绘制</mars-button>
        </a-space>
      </a-col>
    </a-row>
    <template #icon>
      <bookmark-one size="18" theme="outline"/>
    </template>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { BookmarkOne } from "@icon-park/vue-next"
import MarsDialog from "@mars/components/mars-work/mars-dialog.vue"
import * as mapWork from "./map"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import { useWidget } from "@mars/common/store/widget"

const { getWidget } = useWidget()

const widget = getWidget("my-widget")

widget.onUpdate((e) => {
  console.log(e)
})

useLifecycle(mapWork)

const extent = ref("")

const onClickDrawExtent = async () => {
  console.log(extent.value)
  const data = await mapWork.drawExtent()

  extent.value = data.extent
}
</script>
<style lang="less"></style>
