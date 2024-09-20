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
    tableStyle="min-width: 50rem"
    size="large"
    scrollable
    scrollHeight="800px"
  >
    <Column field="user.name" header="Пользователь" sortable></Column>
    <Column field="statistic.score" header="Счет" sortable>
      <template #body="slotProps"> {{ (slotProps.data.statistic.score * 100) / 5 }} % </template>
    </Column>
    <Column field="statistic.time" header="Время" sortable></Column>
  </DataTable>
</template>

<style scoped></style>
