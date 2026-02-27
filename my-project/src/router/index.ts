import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('../views/Home.vue') },
        { path: '/login', component: () => import('../views/Login.vue'), meta: { requiresGuest: true } },
        { path: '/register', component: () => import('../views/Register.vue'), meta: { requiresGuest: true } },
        {
            path: '/chat',
            component: () => import('../views/Chat.vue'),
            meta: { requiresAuth: true }
        }
    ]
});

router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.token) {
        next('/login');
    } else if (to.meta.requiresGuest && authStore.token) {
        next('/chat');
    } else {
        next();
    }
});

export default router;
