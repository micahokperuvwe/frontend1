<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 px-4">
    <div class="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-white mb-2">Create Account</h2>
        <p class="text-gray-400">Join to start messaging</p>
      </div>
      <form class="space-y-4" @submit.prevent="handleRegister">
        <div>
          <label for="displayName" class="block text-sm font-medium text-gray-300">Display Name</label>
          <input id="displayName" v-model="displayName" type="text" required class="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="John Doe" />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300">Email address</label>
          <input id="email" v-model="email" type="email" required class="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="you@example.com" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
          <input id="password" v-model="password" type="password" required class="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="••••••••" />
        </div>
        <div v-if="error" class="text-red-500 text-sm text-center bg-red-100/10 py-2 rounded">{{ error }}</div>
        <button type="submit" :disabled="loading" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition">
          {{ loading ? 'Creating account...' : 'Register' }}
        </button>
      </form>
      <div class="text-center text-sm">
        <span class="text-gray-400">Already have an account? </span>
        <router-link to="/login" class="font-medium text-blue-500 hover:text-blue-400 transition">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const displayName = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const handleRegister = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value, displayName: displayName.value })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    
    authStore.setCredentials(data, data.token);
    router.push('/chat');
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>
