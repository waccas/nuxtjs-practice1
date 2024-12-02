<!-- components/SubscribersList.vue -->
<template>
  <div class="bg-white shadow-md rounded-lg overflow-x-auto">
    <table class="w-full">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-3 text-left">Email</th>
          <th class="p-3 text-left">Subscribed Date</th>
          <th class="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(subscriber, key) in subscribers"
          :key="key"
          class="border-b hover:bg-gray-100"
        >
          <td class="p-3">{{ subscriber.email }}</td>
          <td class="p-3">{{ formatDate(subscriber.subscribedAt) }}</td>
          <td class="p-3">
            <button
              @click="confirmDelete(subscriber.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="subscribers.length === 0" class="p-4 text-center text-gray-500">
      No subscribers found
    </div>

    <ConfirmationModal
      :show="showConfirmation"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ref as dbRef, onValue, remove } from "firebase/database";

const subscribers = ref([]);
const showConfirmation = ref(false);
const subscriberToDelete = ref(null);

const { $firebaseDatabase: db } = useNuxtApp();

onMounted(() => {
  const subscribersRef = dbRef(db, "newsletter-subscribers");
  onValue(subscribersRef, (snapshot) => {
    const data = snapshot.val();
    subscribers.value = data
      ? Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }))
      : [];
  });
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const confirmDelete = (id) => {
  subscriberToDelete.value = id;
  showConfirmation.value = true;
};

const handleConfirmDelete = async () => {
  try {
    await remove(
      dbRef(db, `newsletter-subscribers/${subscriberToDelete.value}`)
    );
  } catch (error) {
    console.error("Error deleting subscriber:", error);
  }
  showConfirmation.value = false;
  subscriberToDelete.value = null;
};

const handleCancelDelete = () => {
  showConfirmation.value = false;
  subscriberToDelete.value = null;
};
</script>
