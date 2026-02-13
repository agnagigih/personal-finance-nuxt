<script setup>
import { useAuthStore } from '~/stores/authStore'

const auth = useAuthStore()
  auth.init()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
