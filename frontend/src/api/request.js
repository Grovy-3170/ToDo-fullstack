import api from "./interceptor";

export const fetchToDoList = async()=>{
    return api.get(`/api/`);
}

export const updateToDo = async(id, data)=>{
    return api.put(`/api/${id}/`, data);
}

export const createToDo = async(data)=>{
    return api.post(`/api/create/`, data);
}

export const deleteToDo = async(id)=>{
    return api.delete(`/api/delete/${id}/`);
}