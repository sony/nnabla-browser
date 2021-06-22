import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule
} from 'vuex-module-decorators'
import { EditorState } from '@/types/store'
import { httpClient } from '@/utils/httpClient'
import store from '@/store'
import { RawFunction } from '@/types/nnablaApi'
import { extractRawFunctions } from '@/utils/nnablaApi'

@Module({ dynamic: true, store, namespaced: true, name: 'editor' })
class EditorStateModule extends VuexModule implements EditorState {
  nnablaFunctions: RawFunction[] = []

  @Mutation
  SET_NNABLA_FUNCTIONS (functions: RawFunction[]): void {
    this.nnablaFunctions = functions
  }

  @Action({})
  fetchNnablaApi (): void {
    httpClient.getNnablaApi().then(res => {
      const nnablaApi = JSON.parse(res.data)
      this.SET_NNABLA_FUNCTIONS(extractRawFunctions(nnablaApi))
    })
  }
}

export default getModule(EditorStateModule)
