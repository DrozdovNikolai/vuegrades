<template>
  <Dialog v-model:visible="isLoading" modal :style="{ width: '25rem' }">
    <template #container="{ closeCallback }">
      <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
    </template>
  </Dialog>
</template>

<script setup>
import { useMainStore } from '@/stores'
import { computed } from 'vue'
const mainStore = useMainStore()

const isLoading = computed(() => {
  return mainStore.isLoading
})
</script>
