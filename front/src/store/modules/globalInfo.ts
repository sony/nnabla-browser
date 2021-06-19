import { Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators'
import { EditorState } from '@/types/store'
import store from '@/store'

@Module({ dynamic: true, store, namespaced: true, name: 'editor' })
class EditorStateModule extends VuexModule implements EditorState {
  activeTabName = 'graph'

  @Mutation
  SET_ACTIVE_TAB_NAME (tabName: string): void {
    this.activeTabName = tabName
  }
}

export default getModule(EditorStateModule)
