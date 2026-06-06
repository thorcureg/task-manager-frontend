import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost/task-manager/backend/api'
});

export const getTasks = () => 
    API.get('/tasks');

export const createTasks = (data) => 
    API.post('/tasks/store',data);

export const updateTasks = (id, data) => 
    API.put(`/tasks/update/${id}`, data);

export const deleteTasks = (id) => 
    API.delete(`/tasks/delete/${id}`);