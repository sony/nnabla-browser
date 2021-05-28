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
import { GraphInfoState, NNtxtFile, RootState } from '@/types/store'
import Vue, { PropType } from 'vue'

/** local interface **/
interface NNtxtCouputedType {
  isSelected: boolean;
  nntxtPath: string;
  graphInfo: GraphInfoState;
}

interface NNtxtPropsType {
  nntxt: NNtxtFile;
  dirName: string;
  level: number;
}

export default Vue.extend<{}, {}, NNtxtCouputedType, NNtxtPropsType>({
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
    },
    graphInfo: function (): GraphInfoState {
      return (this.$store.state as RootState).graphInfo
    }
  },
  methods: {
    clickEvent: function (): void {
      if (this.nntxtPath !== this.graphInfo.nntxtPath) {
        this.$store.dispatch('graphInfo/fetchGraph', this.nntxtPath)
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
