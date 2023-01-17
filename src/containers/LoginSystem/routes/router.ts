import { createRouter, createWebHistory } from 'vue-router';
import LoginModal from '../components/LoginModal.vue';
import AdminSection from '../components/AdminSection.vue';

export default createRouter({
    history: createWebHistory(),
    routes :
        [ {path : '/:catchAll(.*)', redirect: '/login'},
        { path : '/login', component: LoginModal },
        { path : '/admin', component: AdminSection },
        ],
})
