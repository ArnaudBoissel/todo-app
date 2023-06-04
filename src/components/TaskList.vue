<template>
  <div>
    <div v-for="(task, index) in tasks" :key="index">
      {{ task.name }}
      <button @click="renameTask(index)">Renommer</button>
      <button @click="deleteTask(index)">Supprimer</button>
      <button @click="confirmTask(index)" v-if="!task.confirmed">Confirmer</button>
      <button @click="cancelTask(index)" v-if="task.confirmed">Annuler</button>
    </div>
    <div>
      <input v-model="newTask" @keyup.enter="addTask">
      <button @click="addTask">Ajouter</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      newTask: ''
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({
          name: this.newTask,
          completed: false,
          confirmed: false
        });
        this.newTask = '';
      }
    },
    renameTask(index) {
      const newName = prompt('Nouveau nom de la tâche :', this.tasks[index].name);
      if (newName !== null) {
        this.tasks[index].name = newName;
      }
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    confirmTask(index) {
      this.tasks[index].confirmed = true;
    },
    cancelTask(index) {
      this.tasks[index].confirmed = false;
    }
  }
};
</script>
