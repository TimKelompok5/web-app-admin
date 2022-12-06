<script>
// demos
import DashboardCongratulationJohn from './DashboardCongratulationJohn.vue'
import DashboardStatisticsCard from './DashboardStatisticsCard.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    DashboardCongratulationJohn,
    DashboardStatisticsCard,
  },
  setup() {
    return {
     
    }
  },
})
</script>

<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <dashboard-congratulation-john></dashboard-congratulation-john>
    </v-col>
    <v-col
      cols="12"
      md="8"
    >
      <dashboard-statistics-card></dashboard-statistics-card>
    </v-col>
  </v-row>
</template>