<template>
  <Dialog v-model:visible="isLoading" modal :style="{ width: '25rem', boxShadow: 'none' }">
    <template #container>
      <div class="align-items-center">
        <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        <Button class="col-5 my-4" @click="mainStore.cancelRequest()">Отмена</Button>
      </div>
    </template>
  </Dialog>

  <Dialog v-model:visible="isCancelled" modal :style="{ width: '25rem', boxShadow: 'none' }">
    <template #container>
      <Button class="col-12 my-4" @click="reload()">Попробовать ещё раз</Button>
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

const isCancelled = computed(() => {
  return mainStore.cancelled
})

const reload = () => {
  window.location.reload()
}
</script>
