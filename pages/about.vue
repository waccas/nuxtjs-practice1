<template>
  <div
    class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-7xl mx-auto">
      <h1
        class="text-4xl sm:text-5xl font-extrabold text-center text-indigo-900 mb-12"
      >
        About Us
      </h1>

      <div class="bg-white rounded-lg shadow-xl overflow-hidden">
        <div class="md:flex">
          <div class="md:flex-shrink-0">
            <div
              class="h-48 w-full md:w-48 bg-indigo-600 flex items-center justify-center"
            >
              <svg
                class="h-20 w-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
          </div>
          <div class="p-8">
            <div
              class="uppercase tracking-wide text-sm text-indigo-600 font-semibold"
            >
              Our Story
            </div>
            <p class="mt-2 text-gray-600">
              At [Your Company Name], we're on a mission to revolutionize [your
              industry]. Founded in [Year], we've grown from a small team with
              big dreams to a dynamic force in the market.
            </p>
            <p class="mt-4 text-gray-600">
              Our journey is defined by innovation, perseverance, and a deep
              commitment to our clients. We believe in pushing boundaries and
              creating solutions that make a real difference.
            </p>
          </div>
        </div>
      </div>

      <div class="mt-12">
        <h2 class="text-3xl font-bold text-center text-indigo-900 mb-8">
          Our Team
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="member in teamMembers"
            :key="member.id"
            class="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div class="h-48 bg-indigo-200 flex items-center justify-center">
              <svg
                class="h-24 w-24 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="font-bold text-xl mb-2">{{ member.name }}</h3>
              <p class="text-indigo-600">{{ member.position }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const teamMembers = [
  { id: 1, name: "John Doe", position: "CEO" },
  { id: 2, name: "Jane Smith", position: "CTO" },
  { id: 3, name: "Mike Johnson", position: "Designer" },
];
</script>
