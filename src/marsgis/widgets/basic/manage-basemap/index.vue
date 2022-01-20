<template>
  <mars-dialog :height="500" :right="10" :top="50" :width="380" title="底图">
    <ul class="basemap">
      <li v-for="(item, i) in baseMaps" :key="i" :class="{ 'active-card': active === item.uuid }" class="basemap-card" @click="changeBaseMaps(item)">
        <div><img :src="`/${item.options.icon || 'img/basemaps/bingAerial.png'}`" class="icon"/></div>
        <div>{{ item.name }}</div>
      </li>
    </ul>
    <template #footer>
      <a-switch v-model:checked="chkHasTerrain" @change="changeTerrain"/>
      <span class="f-ml">显示地形</span>
    </template>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { markRaw, onUnmounted, ref } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import MarsDialog from "@mars/components/mars-work/mars-dialog.vue"
import * as mapWork from "./map"

// 启用map.ts生命周期
useLifecycle(mapWork)

const baseMaps = ref<any[]>([])

const active = ref("")

const chkHasTerrain = ref(false)

mapWork.eventTarget.on("mapLoaded", initData)

onUnmounted(() => {
  mapWork.eventTarget.off("mapLoaded", initData)
})

function initData(e: any) {
  baseMaps.value = e.baseMaps.map((m: any) => {
    if (m.isAdded && m.show) {
      active.value = m.uuid
    }
    return {
      name: m.name,
      uuid: m.uuid,
      options: markRaw(m.options)
    }
  })

  chkHasTerrain.value = e.hasTerrain || false
}

function changeBaseMaps(item: any) {
  mapWork.changeBaseMaps((active.value = item.uuid))
}

function changeTerrain() {
  mapWork.changeTerrain(chkHasTerrain.value)
}
</script>
<style lang="less" scoped>
.basemap {
  height: calc(100% - 40px);
}

.basemap-card {
  display: inline-block;
  width: 75px;
  list-style-type: none;
  margin-top: 10px;
  margin-left: 10px;
  float: left;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  color: #fff;

  &:hover {
    .active-card();
  }

  .icon {
    border: 2px solid #fff;
    width: 75px;
    height: 70px;
  }
}

.active-card {
  color: #337fe5 !important;

  .icon {
    border-color: #337fe5;
  }
}
</style>
