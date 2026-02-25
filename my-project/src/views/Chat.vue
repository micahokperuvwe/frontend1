<template>
  <div class="h-screen flex bg-gray-900 text-white overflow-hidden">
    <!-- Sidebar -->
    <div class="w-80 flex-shrink-0 bg-gray-800 flex flex-col border-r border-gray-700">
      <div class="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <div class="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center text-lg font-bold">
            {{ authStore.user?.displayName.charAt(0).toUpperCase() }}
          </div>
          <h2 class="text-xl font-semibold truncate">{{ authStore.user?.displayName }}</h2>
        </div>
        <button @click="logout" class="text-gray-400 hover:text-white transition" title="Logout">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        </button>
      </div>

      <!-- Search / Add Contact -->
      <div class="p-4 border-b border-gray-700">
        <div class="relative">
          <input 
            v-model="searchQuery"
            @keyup.enter="searchUsers"
            type="text" 
            placeholder="Search email..." 
            class="w-full bg-gray-700 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        
        <!-- Search Results -->
        <div v-if="searchResults.length > 0" class="mt-2 bg-gray-700 rounded-lg max-h-40 overflow-y-auto">
          <div v-for="user in searchResults" :key="user._id" @click="accessChat(user._id)" class="flex justify-between items-center p-3 hover:bg-gray-600 transition group cursor-pointer">
            <div class="flex flex-col truncate pr-2">
              <span class="text-sm font-medium">{{ user.displayName }}</span>
              <span class="text-xs text-gray-400 truncate">{{ user.email }}</span>
            </div>
            <button class="bg-indigo-600 hover:bg-indigo-500 px-3 py-1 text-xs rounded-md transition opacity-0 group-hover:opacity-100">Chat</button>
          </div>
        </div>
      </div>

      <!-- Chats List -->
      <div class="flex-1 overflow-y-auto p-2">
        <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2 pt-2">Recent Chats</h3>
        <div 
          v-for="chat in chats" 
          :key="chat._id"
          @click="selectChat(chat)"
          :class="['flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition', selectedChat?._id === chat._id ? 'bg-indigo-900 border border-indigo-700' : 'hover:bg-gray-700']"
        >
          <div class="h-12 w-12 bg-gray-600 rounded-full flex items-center justify-center text-lg font-bold">
            {{ getOtherUser(chat).displayName.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-medium text-sm truncate">{{ getOtherUser(chat).displayName }}</h4>
            <p class="text-xs truncate flex items-center space-x-1 mt-0.5" :class="getOtherUser(chat).status === 'online' ? 'text-green-400' : 'text-gray-400'">
              <span v-if="getOtherUser(chat).status === 'online'" class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span class="truncate">{{ chat.lastMessage?.content || 'Started a chat' }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div v-if="selectedChat" class="flex-1 flex flex-col bg-gray-900 relative">
      <!-- Chat Header -->
      <div class="h-16 px-6 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center text-lg font-bold">
            {{ getOtherUser(selectedChat).displayName.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h2 class="text-lg font-semibold">{{ getOtherUser(selectedChat).displayName }}</h2>
            <p class="text-xs mt-0.5" :class="getOtherUser(selectedChat).status === 'online' ? 'text-green-400' : 'text-gray-400'">
              <span v-if="getOtherUser(selectedChat).status === 'online'">Online</span>
              <span v-else>
                {{ getOtherUser(selectedChat).lastSeen ? 'Last seen ' + new Date(getOtherUser(selectedChat).lastSeen).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' }) : 'Offline' }}
              </span>
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="startCall('audio')" class="text-gray-400 hover:text-indigo-400 transition" title="Voice Call">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          </button>
          <button @click="startCall('video')" class="text-gray-400 hover:text-indigo-400 transition" title="Video Call">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          </button>
        </div>
      </div>

      <!-- Messages Area -->
      <div class="flex-1 p-6 overflow-y-auto space-y-4" id="messages-container">
        <div 
          v-for="msg in messages" 
          :key="msg._id"
          :class="['flex', msg.senderId._id === authStore.user._id ? 'justify-end' : 'justify-start']"
        >
          <div 
            :class="['max-w-[70%] px-4 py-2 rounded-2xl', msg.senderId._id === authStore.user._id ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-100 rounded-bl-none']"
          >
            <p class="text-sm">{{ msg.content }}</p>
            <span class="text-[10px] text-gray-300 block mt-1 text-right flex items-center justify-end space-x-1">
              <span>{{ new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
              <template v-if="msg.senderId._id === authStore.user._id">
                <svg v-if="msg.status === 'sent'" class="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <div v-if="msg.status === 'delivered' || msg.status === 'read'" class="relative w-4 h-3 flex items-center justify-end">
                    <svg :class="['w-3 h-3 absolute right-1.5', msg.status === 'read' ? 'text-blue-400' : 'text-gray-300']" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <svg :class="['w-3 h-3 absolute right-0', msg.status === 'read' ? 'text-blue-400' : 'text-gray-300']" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
              </template>
            </span>
          </div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="p-4 bg-gray-800 border-t border-gray-700">
        <form @submit.prevent="sendMessage" class="flex space-x-2">
          <input 
            v-model="newMessage"
            type="text" 
            placeholder="Type a message..." 
            class="flex-1 bg-gray-700 text-white rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button type="submit" :disabled="!newMessage.trim()" class="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full p-3 transition disabled:opacity-50">
            <svg class="w-6 h-6 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
          </button>
        </form>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="flex-1 bg-gray-900 flex flex-col items-center justify-center text-gray-500 relative">
      <div class="h-32 w-32 bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-xl border border-gray-700">
        <svg class="w-16 h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
      </div>
      <h2 class="text-2xl font-light text-gray-300">Select a chat to start messaging</h2>
    </div>

    <!-- Active Call Overlay -->
    <div v-if="callActive || receivingCall" class="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center bg-opacity-95 backdrop-blur-md">
      <div v-if="receivingCall && !callAccepted" class="text-center space-y-6 animate-pulse">
        <div class="h-24 w-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
        </div>
        <h2 class="text-3xl font-bold">{{ callerName }} is calling...</h2>
        <div class="flex space-x-6 justify-center mt-8">
          <button @click="acceptCall" class="bg-green-500 hover:bg-green-400 text-white rounded-full p-6 shadow-xl transition transform hover:scale-110">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          </button>
          <button @click="rejectCall" class="bg-red-500 hover:bg-red-400 text-white rounded-full p-6 shadow-xl transition transform hover:scale-110">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>

      <div v-else class="w-full h-full relative">
        <video ref="remoteVideoRef" autoplay playsinline class="w-full h-full object-cover"></video>
        <video ref="localVideoRef" autoplay playsinline muted class="absolute bottom-10 right-10 w-48 h-64 object-cover rounded-xl shadow-2xl border-4 border-gray-800"></video>
        
        <!-- Call Controls -->
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-6 bg-gray-800 bg-opacity-70 p-4 rounded-full backdrop-blur-md">
          <button @click="toggleAudio" :class="['p-4 rounded-full transition shadow-lg', audioEnabled ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-500 hover:bg-red-400']">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          </button>
          <button @click="toggleVideo" :class="['p-4 rounded-full transition shadow-lg', videoEnabled ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-500 hover:bg-red-400']">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          </button>
          <button @click="endCall" class="p-4 rounded-full bg-red-600 hover:bg-red-500 transition shadow-lg">
            <svg class="w-6 h-6 transform rotate-135" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          </button>
        </div>
        <p v-if="!callAccepted" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold animate-pulse">
            Calling {{ getOtherUser(selectedChat).displayName }}...
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { socket } from '../services/socket';
import Peer from 'simple-peer/simplepeer.min.js';

const authStore = useAuthStore();
const router = useRouter();

const searchQuery = ref('');
const searchResults = ref<any[]>([]);
const chats = ref<any[]>([]);
const selectedChat = ref<any>(null);
const messages = ref<any[]>([]);
const newMessage = ref('');

// WebRTC State
const localVideoRef = ref<HTMLVideoElement | null>(null);
const remoteVideoRef = ref<HTMLVideoElement | null>(null);
const localStream = ref<MediaStream | null>(null);
const peerConnection = ref<any>(null);
const callActive = ref(false);
const receivingCall = ref(false);
const callAccepted = ref(false);
const callerName = ref('');
const callerId = ref('');
const callerSignal = ref<any>(null);
const audioEnabled = ref(true);
const videoEnabled = ref(true);

const logout = () => {
  authStore.logout();
  socket.disconnect();
  router.push('/login');
};

const getOtherUser = (chat: any) => {
  return chat.participants[0]._id === authStore.user._id ? chat.participants[1] : chat.participants[0];
};

const searchUsers = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }
  try {
    const res = await fetch(`http://localhost:5000/api/users?search=${encodeURIComponent(searchQuery.value)}`, {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    });
    searchResults.value = await res.json();
  } catch (err) {
    console.error(err);
  }
};

const fetchChats = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/chats', {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    });
    chats.value = await res.json();
  } catch (err) {
    console.error(err);
  }
};

const accessChat = async (userId: string) => {
  try {
    const res = await fetch('http://localhost:5000/api/chats', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}` 
      },
      body: JSON.stringify({ userId })
    });
    const chat = await res.json();
    if (!chats.value.find((c) => c._id === chat._id)) chats.value.unshift(chat);
    
    selectedChat.value = chat;
    searchQuery.value = '';
    searchResults.value = [];
    await fetchMessages();
  } catch (err) {
    console.error(err);
  }
};

const selectChat = async (chat: any) => {
  selectedChat.value = chat;
  await fetchMessages();
};

const fetchMessages = async () => {
  if (!selectedChat.value) return;
  try {
    const res = await fetch(`http://localhost:5000/api/messages/${selectedChat.value._id}`, {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    });
    messages.value = await res.json();
    socket.emit("join chat", selectedChat.value._id);
    scrollToBottom();
  } catch (err) {
    console.error(err);
  }
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  try {
    const res = await fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}` 
      },
      body: JSON.stringify({ content: newMessage.value, chatId: selectedChat.value._id })
    });
    const message = await res.json();
    socket.emit("new message", message);
    messages.value.push(message);
    newMessage.value = '';
    scrollToBottom();
    
    // Update local chat last message
    const chatIndex = chats.value.findIndex(c => c._id === selectedChat.value._id);
    if(chatIndex !== -1) {
      chats.value[chatIndex].lastMessage = message;
    }
  } catch (err) {
    console.error(err);
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    const container = document.getElementById('messages-container');
    if (container) container.scrollTop = container.scrollHeight;
  });
};

// WebRTC logic
const getMedia = async (type: 'audio' | 'video') => {
  try {
    localStream.value = await navigator.mediaDevices.getUserMedia({ video: type === 'video', audio: true });
    if (localVideoRef.value) {
      localVideoRef.value.srcObject = localStream.value;
    }
  } catch (err) {
    console.error("Error accessing media devices.", err);
  }
};

const startCall = async (type: 'audio' | 'video') => {
  if (!selectedChat.value) return;
  await getMedia(type);
  callActive.value = true;

  const targetUserId = getOtherUser(selectedChat.value)._id;

  peerConnection.value = new Peer({
    initiator: true,
    trickle: false,
    stream: localStream.value as MediaStream
  });

  peerConnection.value.on('signal', (data: any) => {
    socket.emit("call user", {
      userToCall: targetUserId,
      signalData: data,
      from: authStore.user._id,
      name: authStore.user.displayName,
      type: type
    });
  });

  peerConnection.value.on('stream', (stream: MediaStream) => {
    if (remoteVideoRef.value) {
      remoteVideoRef.value.srcObject = stream;
    }
  });

  peerConnection.value.on('close', endCall);
};

const acceptCall = async () => {
  callAccepted.value = true;
  await getMedia('video'); // Default to video for now or based on type if we store it
  
  peerConnection.value = new Peer({
    initiator: false,
    trickle: false,
    stream: localStream.value as MediaStream
  });

  peerConnection.value.on('signal', (data: any) => {
    socket.emit("answer call", { signal: data, to: callerId.value });
  });

  peerConnection.value.on('stream', (stream: MediaStream) => {
    if (remoteVideoRef.value) {
      remoteVideoRef.value.srcObject = stream;
    }
  });

  peerConnection.value.on('close', endCall);

  peerConnection.value.signal(callerSignal.value);
};

const rejectCall = () => {
  socket.emit("reject call", { to: callerId.value });
  resetCallState();
};

const endCall = () => {
  const targetUserId = selectedChat.value ? getOtherUser(selectedChat.value)._id : callerId.value;
  socket.emit("end call", { to: targetUserId });
  resetCallState();
};

const resetCallState = () => {
  callActive.value = false;
  receivingCall.value = false;
  callAccepted.value = false;
  callerName.value = '';
  callerId.value = '';
  callerSignal.value = null;

  if (peerConnection.value) {
    peerConnection.value.destroy();
    peerConnection.value = null;
  }
  if (localStream.value) {
    localStream.value.getTracks().forEach(track => track.stop());
    localStream.value = null;
  }
};

const toggleAudio = () => {
  if (localStream.value) {
    audioEnabled.value = !audioEnabled.value;
    localStream.value.getAudioTracks()[0].enabled = audioEnabled.value;
  }
};

const toggleVideo = () => {
  if (localStream.value && localStream.value.getVideoTracks().length > 0) {
    videoEnabled.value = !videoEnabled.value;
    localStream.value.getVideoTracks()[0].enabled = videoEnabled.value;
  }
};

onMounted(() => {
  fetchChats();
  
  socket.connect();
  socket.emit("setup", authStore.user);
  
  socket.on("message recieved", (newMessageRecieved) => {
    if (!selectedChat.value || selectedChat.value._id !== newMessageRecieved.chatId._id) {
      // Notify user (future phase)
      socket.emit("message delivered", newMessageRecieved._id, newMessageRecieved.senderId._id);
    } else {
      messages.value.push(newMessageRecieved);
      socket.emit("message read", newMessageRecieved._id, newMessageRecieved.senderId._id);
      scrollToBottom();
    }
    fetchChats(); // Refresh chat list to update last messages
  });

  socket.on("message status update", ({ messageId, status }) => {
    const msg = messages.value.find(m => m._id === messageId);
    if(msg) msg.status = status;
    
    // Also update last message in chats list
    chats.value.forEach(c => {
        if(c.lastMessage?._id === messageId) c.lastMessage.status = status;
    });
  });

  socket.on("user_status_change", (data) => {
    chats.value.forEach(chat => {
      chat.participants.forEach((p: any) => {
        if (p._id === data.userId) {
          p.status = data.status;
          if (data.lastSeen) p.lastSeen = data.lastSeen;
        }
      });
    });
  });

  socket.on("call incoming", (data) => {
    receivingCall.value = true;
    callerName.value = data.name;
    callerId.value = data.from;
    callerSignal.value = data.signal;
  });

  socket.on("call accepted", (signal) => {
    callAccepted.value = true;
    if (peerConnection.value) {
      peerConnection.value.signal(signal);
    }
  });

  socket.on("call rejected", () => {
    resetCallState();
    alert("Call was rejected");
  });

  socket.on("call ended", () => {
    resetCallState();
  });
  
  // Register Service Worker and Push
  registerPush();
});

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const registerPush = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const register = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      
      const res = await fetch('http://localhost:5000/api/push/public-key');
      const { publicKey } = await res.json();
      
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      });
      
      await fetch('http://localhost:5000/api/push/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.token}`
        }
      });
    } catch(err) {
      console.error('Service Worker/Push subscription failed', err);
    }
  }
};
</script>
