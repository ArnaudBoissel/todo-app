<template>
  <v-container fluid>
    <v-card class="task-list">
      <v-card-text>
        <v-row align="center">
          <v-col cols="10">
            <v-text-field
              v-model="newTask"
              label="New Task"
              dense
              class="task-list__new-task-input"
              @keyup.enter="addTask"
            ></v-text-field>
          </v-col>
          <v-col cols="2" class="text-right">
            <v-btn @click="addTask" color="primary" dark class="task-list__add-button">Add</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text v-if="tasks.length > 0">
        <v-list>
          <v-list-item v-for="task in tasks" :key="task.id" :class="{ 'task-list__task-highlight': task.confirmed }">
            <v-list-item-content>
              <v-text-field
                v-model="task.name"
                dense
                class="task-list__task-name"
                outlined
                :readonly="!task.editable"
              ></v-text-field>
            </v-list-item-content>
            <v-list-item-action>
              <v-speed-dial direction="left" :right="true">
                <template v-slot:activator>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-btn v-if="!task.confirmed" icon @click="confirmTask(task)">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn v-else icon @click="cancelTask(task)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn icon v-if="!task.editable" @click="enableEditing(task)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon v-else @click="disableEditing(task)">
                  <v-icon>mdi-pencil-off</v-icon>
                </v-btn>
                <v-btn icon @click="deleteTask(task)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn icon @click="archiveTask(task)">
                  <v-icon>mdi-archive</v-icon>
                </v-btn>
              </v-speed-dial>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-text v-else>
        <p>No tasks at the moment.</p>
      </v-card-text>
    </v-card>
    <v-card class="archived-tasks">
      <v-card-text>
        <v-row justify="center">
          <v-btn color="primary" dark @click="viewCompletedTasks">View Completed Tasks</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      archivedTasks: [],
      newTask: ''
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({
          id: Date.now(),
          name: this.newTask,
          completed: false,
          confirmed: false,
          editable: false
        });
        this.newTask = '';
      }
    },
    enableEditing(task) {
      task.editable = true;
    },
    disableEditing(task) {
      task.editable = false;
    },
    confirmTask(task) {
      task.confirmed = true;
    },
    cancelTask(task) {
      task.confirmed = false;
    },
    deleteTask(task) {
      const index = this.tasks.indexOf(task);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    },
    archiveTask(task) {
      const index = this.tasks.indexOf(task);
      if (index !== -1) {
        const archivedTask = {
          id: task.id,
          name: task.name
        };
      console.log("archivage", archivedTask)
        this.tasks.splice(index, 1);
        this.archivedTasks.push(archivedTask);
      console.log("archivage", this.archivedTasks)
      }
    },
    viewCompletedTasks() {
      console.log("view", this.archivedTasks)
      this.$router.push({
        name: 'CompletedTasks',
        params: { archivedTasks: this.archivedTasks }
      });
    }
  }
};
</script>

<style scoped>
.task-list {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

.task-list__new-task-input {
  margin-bottom: 10px;
}

.task-list__add-button {
  width: 100%;
  color: #fff;
  background-color: #2196f3;
}

.task-list__task-name {
  font-size: 16px;
  font-weight: bold;
  max-width: 70%;
}

.task-list__task-highlight {
  background-color: #b9f6ca;
}

.archived-tasks {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
}
</style>
