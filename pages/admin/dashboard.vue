<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="container mx-auto">
      <!-- Header with logout -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Admin Dashboard</h1>
        <button
          @click="logout"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <!-- Tab buttons -->
      <div class="flex space-x-4 mb-4">
        <button
          @click="activeTab = 'messages'"
          :class="[
            'px-4 py-2 rounded',
            activeTab === 'messages' ? 'bg-blue-500 text-white' : 'bg-gray-200',
          ]"
        >
          Messages
        </button>
        <button
          @click="activeTab = 'subscribers'"
          :class="[
            'px-4 py-2 rounded',
            activeTab === 'subscribers'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200',
          ]"
        >
          Subscribers
        </button>
      </div>

      <!-- Messages Tab -->
      <div
        v-if="activeTab === 'messages'"
        class="bg-white shadow-md rounded-lg overflow-x-auto"
      >
        <table class="w-full">
          <thead class="bg-gray-200">
            <tr>
              <th class="p-3 text-left">Name</th>
              <th class="p-3 text-left">Email</th>
              <th class="p-3 text-left">Message</th>
              <th class="p-3 text-left">Date</th>
              <th class="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(message, key) in messages"
              :key="key"
              class="border-b hover:bg-gray-100"
            >
              <td class="p-3">{{ message.name }}</td>
              <td class="p-3">{{ message.email }}</td>
              <td class="p-3 truncate max-w-xs">{{ message.message }}</td>
              <td class="p-3">
                {{ formatDate(message.submittedAt) }}
              </td>
              <td class="p-3">
                <button
                  @click="confirmDelete(message.id)"
                  class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <p v-if="deleteError" class="text-red-500 text-sm mt-2">
                  {{ deleteError }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- No messages message -->
        <div v-if="messages.length === 0" class="p-4 text-center text-gray-500">
          No messages found
        </div>

        <!-- Confirmation Modal -->
        <ConfirmationModal
          :show="showConfirmation"
          @confirm="handleConfirmDelete"
          @cancel="handleCancelDelete"
        />
      </div>

      <!-- Subscribers Tab -->
      <div v-if="activeTab === 'subscribers'">
        <SubscribersList />
      </div>
    </div>
  </div>
</template>

<!-- Script section remains unchanged -->

<script setup>
import { ref as dbRef, onValue, remove } from "firebase/database";
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import ConfirmationModal from "~/components/ConfirmationModal.vue";
import { ref } from "vue";
import SubscribersList from "~/components/SubscribersList.vue";

const activeTab = ref("messages");
const showConfirmation = ref(false);
const messageToDelete = ref(null);

const confirmDelete = (messageId) => {
  messageToDelete.value = messageId;
  showConfirmation.value = true;
};

const handleConfirmDelete = async () => {
  await deleteMessage(messageToDelete.value);
  showConfirmation.value = false;
  messageToDelete.value = null;
};

const handleCancelDelete = () => {
  showConfirmation.value = false;
  messageToDelete.value = null;
};

const messages = ref([]);
const router = useRouter();

// Fetch messages on component mount
onMounted(async () => {
  const { $firebaseDatabase, $firebaseAuth } = useNuxtApp();

  // Check if user is authenticated
  if (!$firebaseAuth.currentUser) {
    router.push("/admin/login");
    return;
  }

  // Reference to contacts in database
  const contactsRef = dbRef($firebaseDatabase, "contacts");

  // Listen for data changes
  onValue(contactsRef, (snapshot) => {
    const data = snapshot.val();
    messages.value = data
      ? Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }))
      : [];
  });
});

// Format date for readability
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

// Delete a specific message
const deleteMessage = async (key) => {
  const { $firebaseDatabase } = useNuxtApp();
  const messageRef = dbRef($firebaseDatabase, `contacts/${key}`);

  try {
    await remove(messageRef);
  } catch (error) {
    console.error("Error deleting message:", error);
  }
};

// Logout functionality
const logout = async () => {
  const { $firebaseAuth } = useNuxtApp();

  try {
    await signOut($firebaseAuth);
    router.push("/admin/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
definePageMeta({
  middleware: ["auth"],
});
</script>
