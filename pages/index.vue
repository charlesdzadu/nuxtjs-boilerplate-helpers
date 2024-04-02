
<script setup lang="ts">
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthStore } from "~/stores/auth";



const config = useRuntimeConfig();
const authStore = useAuthStore();

const login = async () => {
	const url = `/api/auth/login`;
	const email = "charles1@dzadu.dev";
	const password = "thisisnotapasword";
	const auth = getAuth()
	try {
		console.log('auth')
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		const token = await user.getIdToken()
		console.log('token', token)

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: token,
			}),

		})
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log('error', errorCode, errorMessage)

	}
}

const createNewAccount = async () =>  {


const data = {
	"first_name": "Roderic",
	"last_name": "Davies",
}

const url = `${config.public.apiBaseUrl}/accounts/create-my-account`;
const headers = {
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${authStore.token}`
}
console.log('headers', headers)
const response = await fetch(url, {
	method: 'POST',
	headers: headers,
	body: JSON.stringify(data),
})

const result = await response.json()

console.log('result', result)

}
</script>
<template>
	  <div>
	<h1>Home</h1>
	<button @click="login">Login</button>
	<button @click="createNewAccount">create account</button>
  </div>
</template>
