<template>
  <div class="min-h-screen bg-gray-900 text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
    <!-- Navbar -->
    <nav class="fixed w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center space-x-2 group cursor-pointer">
          <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
          <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">NexTalk</span>
        </div>
        
        <div class="hidden md:flex items-center space-x-10 text-sm font-medium text-gray-400">
          <a href="#features" class="hover:text-white transition">Features</a>
          <a href="#about" class="hover:text-white transition">Security</a>
          <a href="#contact" class="hover:text-white transition">Support</a>
        </div>

        <div class="flex items-center space-x-4">
          <router-link to="/login" class="px-6 py-2 text-sm font-medium hover:text-indigo-400 transition">Log in</router-link>
          <router-link to="/register" class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-900/20 transition transform hover:-translate-y-0.5 active:scale-95">
            Get Started
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <!-- Animated Blobs -->
      <div class="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div class="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Real-time messaging, <br/>
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">elevated to perfection.</span>
        </h1>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Experience the next generation of communication. Crystal clear video calls, instant messaging, and end-to-end security, all in one stunning interface.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <router-link to="/register" class="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-200 transition transform hover:scale-105 shadow-2xl">
            Start Chatting Now
          </router-link>
          <button class="w-full sm:w-auto px-8 py-4 bg-gray-800 border border-gray-700 rounded-xl font-bold text-lg hover:bg-gray-700 transition transform hover:scale-105">
            Watch Demo
          </button>
        </div>

        <!-- Mockup -->
        <div class="mt-20 relative px-4 md:px-0">
          <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative bg-gray-800 rounded-[2rem] border border-gray-700 overflow-hidden shadow-2xl">
             <img src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=2070&auto=format&fit=crop" alt="App Mockup" class="w-full opacity-90"/>
             <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </header>

    <!-- Features Section -->
    <section id="features" class="py-24 bg-gray-950 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <h2 class="text-4xl font-bold mb-4">Why choose NexTalk?</h2>
          <p class="text-gray-400 max-w-xl mx-auto">Build for speed, security, and the best user experience imaginable.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Feature 1 -->
          <div class="p-8 rounded-3xl bg-gray-900 border border-gray-800 hover:border-indigo-500/50 transition-colors group">
            <div class="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">Instant Delivery</h3>
            <p class="text-gray-400 leading-relaxed">Socket-powered messaging ensures your words reach their destination in milliseconds.</p>
          </div>

          <!-- Feature 2 -->
          <div class="p-8 rounded-3xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-colors group">
            <div class="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">HD Video Calls</h3>
            <p class="text-gray-400 leading-relaxed">P2P WebRTC technology for crystal clear voice and video communication worldwide.</p>
          </div>

          <!-- Feature 3 -->
          <div class="p-8 rounded-3xl bg-gray-900 border border-gray-800 hover:border-pink-500/50 transition-colors group">
            <div class="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">Secure & Private</h3>
            <p class="text-gray-400 leading-relaxed">End-to-end encryption means your private conversations stay exactly that—private.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-gray-800 text-center">
      <p class="text-gray-500 text-sm">© 2026 NexTalk Inc. Designed for the future of communication.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// No complex logic needed for static home page
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
