
<script setup lang="ts">
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthStore } from "~/stores/auth";



const config = useRuntimeConfig();
const authStore = useAuthStore();

const login = async () => {


	const email = "";
	const password = "";

	const auth = getAuth()

	try {
		console.log('before sign in')
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		console.log("after sign in")

		const user = userCredential.user;
		const token = await user.getIdToken()
		console.log('token', token)

		const url = `/api/auth/login`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: token,
			}),

		})
		await authStore.initializeUser();
		navigateTo('/home')

	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log('error', errorCode, errorMessage)

	}
}

const createNewAccount = async () =>  {

	const email = "";
	const password = "";

	const auth = getAuth()
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);

		const user = userCredential.user;
		const token = await user.getIdToken()
		console.log('token', token)

		let url = `/api/auth/login`;
		let response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: token,
			}),

		})

		const data = {
			"first_name": "Charles New",
			"last_name": "New user",
		}

		url = `${config.public.apiBaseUrl}/accounts/create-my-account`;
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
		console.log('headers', headers)
		response = await fetch(url, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(data),
		})

		const result = await response.json()

		console.log('result', result)
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log('error', errorCode, errorMessage)
	}


}


</script>
<template>
	  <div>
	<h1>Home</h1>
	<button @click="login">Login</button>
	<button @click="createNewAccount">create account</button>
  </div>
</template>
