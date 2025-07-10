<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="input-form">
    <h2>New Input Form</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-field">
        <label for="name">Name:</label>
        <input id="name" v-model="form.name" type="text" placeholder="Enter your name" />
      </div>
      <div class="form-field">
        <label for="email">Email:</label>
        <input id="email" v-model="form.email" type="email" placeholder="Enter your email" />
      </div>
      <div class="form-field">
        <label for="message">Message:</label>
        <textarea id="message" v-model="form.message" placeholder="Enter your message"></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
    <div v-if="submitted" class="submitted-data">
      <h3>Submitted Data</h3>
      <pre>{{ form }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})
const submitted = ref(false)

const handleSubmit = () => {
  // 可在此呼叫 API 將資料送往後端，例如用 fetch 或 axios
  console.log('Form submitted:', form.value)
  submitted.value = true

  // 若需要提交後重置表單，可解除下列註解
  // form.value = { name: '', email: '', message: '' }
}
</script>

<style scoped>
.input-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}
.input-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}
.form-field {
  margin-bottom: 1rem;
}
.form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.form-field input,
.form-field textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background-color: #45a049;
}
.submitted-data {
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
}
</style>