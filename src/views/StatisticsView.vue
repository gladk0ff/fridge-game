<script setup>
import { loadStatistic, statistic } from '@S/store/statistic'
import { onMounted } from 'vue'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

onMounted(() => {
  loadStatistic()
})
</script>

<template>
  <DataTable
    :value="statistic.items"
    tableStyle="min-width: 50rem;min-height:"
    size="large"
    scrollable
    scrollHeight="700px"
    :loading="statistic.updating"
  >
    <Column
      field="user.name"
      header="Пользователь"
      sortable
      style="background-color: var(--p-yellow-400)"
      bodyStyle="font-weight:bold;text-transform:uppercase"
    ></Column>
    <Column
      field="statistic.score"
      header="Счет"
      sortable
      style="background-color: var(--p-yellow-300)"
    >
      <template #body="slotProps"> {{ (slotProps.data.statistic.score * 100) / 5 }} % </template>
    </Column>
    <Column
      field="statistic.time"
      header="Время"
      sortable
      style="background-color: var(--p-yellow-200)"
    ></Column>
  </DataTable>
</template>

<style scoped></style>
