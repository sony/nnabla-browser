// Copyright 2021 Sony Group Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule
} from 'vuex-module-decorators'
import { EditorState } from '@/types/store'
import { RawFunction } from '@/types/nnablaApi'
import { extractRawFunctions } from '@/utils/nnablaApi'
import { httpClient } from '@/utils/httpClient'
import store from '@/store'

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
