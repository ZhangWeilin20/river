/**
 * store 状态管理
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2021-12-30
 */
import { createStore, Store } from "vuex"
import { InjectionKey } from "vue"

export interface Test {
  count?: number
}

export const key: InjectionKey<Store<Test>> = Symbol("test")

export const store = createStore<Test>({
  state: {
    count: 0
  }
})
