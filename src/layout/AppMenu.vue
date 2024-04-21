<script setup>
import { ref } from 'vue'

import AppMenuItem from './AppMenuItem.vue'
import AppUserInfo from '@/components/base/AppUserInfo.vue'
const model = ref([
  {
    items: [
      { label: 'Грэйды', icon: 'pi pi-fw pi-table', to: '/' },
      { label: 'Студенты', icon: 'pi pi-fw pi-table', to: '/student' },
      { label: 'Курсы', icon: 'pi pi-fw pi-table', to: '/course' },
      { label: 'График', icon: 'pi pi-fw pi-chart-line', to: '/chart' }
    ]
  }
])
</script>

<template>
  <ul class="layout-menu">
    <AppUserInfo></AppUserInfo>
    <Divider />
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
