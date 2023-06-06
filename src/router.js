import { createRouter, createWebHistory } from 'vue-router';
import TaskList from './components/TaskList.vue';
import CompletedTasks from './components/CompletedTasks.vue';

/*import Vue from 'vue';
import VueRouter from 'vue-router';*/

const routes = [
  {
    path: '/',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/completed',
    name: 'CompletedTasks',
    component: CompletedTasks,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
