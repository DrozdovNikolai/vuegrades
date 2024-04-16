<template>
  <div class="appbar">
    <Toolbar class="surface-200 shadow-5 border-solid p-1" style="padding: 0">
      <template #start>
        <Button icon="pi pi-bars" @click="toggleDrawer" />
        <div class="ml-4">
          {{ title }}
        </div>
      </template>

      <template #end> <Button icon="pi pi-sun" text raised rounded @click="changeMode" /></template>
    </Toolbar>

    <Divider />
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores'
import { ref } from 'vue'
import { usePrimeVue } from 'primevue/config'
const mainStore = useMainStore()
function toggleDrawer() {
  mainStore.toggleDrawer()
}
const PrimeVue = usePrimeVue()
function changeMode() {
  PrimeVue.changeTheme('md-light-indigo', 'md-dark-indigo', 'theme-dark', () => {})
}
const title = ref('КубГУ')
</script>
