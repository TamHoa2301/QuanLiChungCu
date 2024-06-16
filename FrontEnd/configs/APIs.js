import axios from "axios";

const BASE_URL = 'https://tuantunguyenq23.pythonanywhere.com/';

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lessons/`,
    'lesson-details': (lessonId) => `/lessons/${lessonId}/`,
    'comments': (lessonId) => `/lessons/${lessonId}/comments/`,
    'register': '/users/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'items' : (userId) => `/storages/${userId}/items`
}

export const authAPI = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
});