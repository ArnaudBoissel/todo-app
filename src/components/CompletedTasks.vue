<template>
  <v-container fluid>
    <v-card class="completed-tasks">
      <v-card-text>
        <h2>Completed Tasks</h2>
        <ul>
          <li v-for="task in archivedTasks" :key="task.id">
            {{ task.name }}
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script>
export default {
  props: {
    archivedTasks: {
      type: Array,
      required: true
    }
  },
  mounted() {
    console.log("Archived tasks in CompletedTasks:", this.archivedTasks);
  }
};
</script>

<style scoped>
.completed-tasks {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  font-family: 'Roboto', sans-serif;
}
</style>
