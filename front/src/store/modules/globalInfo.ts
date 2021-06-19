import { EditorState } from '@/types/store'
import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({ dynamic: true, store, namespaced: true, name: 'editor' })
class EditorStateModule extends VuexModule implements EditorState {
  activeTabName = 'graph'

  @Mutation
  SET_ACTIVE_TAB_NAME (tabName: string) {
    this.activeTabName = tabName
  }
}

export default getModule(EditorStateModule)
