<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
      <h3 class="text-lg font-bold mb-4">Confirm Delete</h3>
      <p class="mb-6">Are you sure you want to delete this message?</p>
      <div class="flex justify-end space-x-3">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
});
defineEmits(["confirm", "cancel"]);
</script>
