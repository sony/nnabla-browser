<template>
  <div
    class="nntxt-entry"
    :class="{ active: isSelected }"
    @click="clickEvent"
  >
    {{ nntxt.name }}
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import graphInfoState from '@/store/modules/graphInfo'
import { NNtxtFile } from '@/types/store'

/** local interface **/
interface NNtxtComputedType {
  isSelected: boolean;
  nntxtPath: string;
}

interface NNtxtPropsType {
  nntxt: NNtxtFile;
  dirName: string;
  level: number;
}

export default Vue.extend<{}, {}, NNtxtComputedType, NNtxtPropsType>({
  props: {
    nntxt: {
      type: Object as PropType<NNtxtFile>,
      required: true
    },
    dirName: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true
    }
  },
  computed: {
    nntxtPath: function (): string {
      return (this.level > 0 ? this.dirName + '/' : '') + this.nntxt.name
    },
    isSelected: function (): boolean {
      return this.$store.state.directoryInfo.activeFile === this.nntxtPath
    }
  },
  methods: {
    clickEvent: function (): void {
      if (!this.isSelected) {
        graphInfoState.fetchGraph(this.nntxtPath)
      }
    }
  }
})
</script>

<style>
.nntxt-entry {
  cursor: pointer;
  user-select: none;
  height: 30px;
  line-height: 30px;
}

.nntxt-entry.active {
  cursor: pointer;
  color: var(--color-brand);
  background: var(--color-gray0);
}

.nntxt-entry:hover {
  background: var(--color-gray0);
}
</style>
