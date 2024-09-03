<script>
  import { onMount } from 'svelte';
  import './style.css';


  let phoneNumber = '';
  let accountNumber = '';
  let amount = '';
  let responseMessage = '';

  async function handleSubmit() {
    try {
      const response = await fetch('http://localhost:50001/api/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber,
          accountNumber: accountNumber,
          amount: amount,
        }),
      });

      const data = await response.json();
      responseMessage = data.msg;

      const transaction = {
        phone: phoneNumber,
        accountNumber: accountNumber,
        amount: amount,
        status: data.status ? 'successful' : 'failed'
      };


      if (data.status) {
        console.log("Transaction initiated successfully");
      } else {
        console.log("Transaction initiation failed");
      }
    } catch (error) {
      console.error("Error:", error);
      responseMessage = "Failed to initiate transaction.";
    }
  }
</script>



<form on:submit|preventDefault={handleSubmit} class="max-w-md mx-auto p-4 bg-gray-100 rounded-lg">
  <label for="phoneNumber" class="block text-gray-700">Phone Number:</label>
  <input
          type="tel"
          id="phoneNumber"
          bind:value={phoneNumber}
          placeholder="Enter phone number"
          required
          class="block w-full p-4 mb-4 border border-gray-300 rounded"
  />

  <label for="accountNumber" class="block text-gray-700">Account Number:</label>
  <input
          type="text"
          id="accountNumber"
          bind:value={accountNumber}
          placeholder="Enter account number"
          required
          class="block w-full p-2 mb-4 border border-gray-300 rounded"
  />

  <label for="amount" class="block text-gray-700">Amount:</label>
  <input
          type="number"
          id="amount"
          bind:value={amount}
          placeholder="Enter amount"
          required
          class="block w-full p-2 mb-4 border border-gray-300 rounded"
  />

  <button type="submit" class="block w-full p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
    Pay Now
  </button>

  {#if responseMessage}
    <div class="mt-4 text-gray-800">{responseMessage}</div>
  {/if}
</form>



