<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

definePageMeta({
	middleware: ['authenticated'],
})
</script>

<template>
	  <div>
	<h1>Home</h1>

	<pre> {{ authStore.user }} </pre>
  </div>
</template>
