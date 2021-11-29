<template>
  <div class="container">
    <h1>My First Smart Contract</h1>
    <p>Contract Address: {{greetAddress}}</p>
    <div class="mt mt-2">
      <button class="btn btn-primary" @click="requestAccount">
        Connect to Metamask
      </button>
    </div>
    <div class="mt mt-2">
      <button class="btn btn-primary" @click="fetchGreeting">Greet</button>
    </div>
    <div class="mt mt-2">
      <input type="text" class="form form-control" v-model="greetting"/>
      <button class="btn btn-primary" @click="setGreeting">SetGreet</button>
    </div>
  </div>
</template>

<script>
import { ethers, providers } from "ethers";
import Greeter  from "../artifacts/contracts/Greeter.sol/Greeter.json";
import {toRefs} from 'vue';
export default {
  name: "App",
  components: {},
  setup() {
    const data = {
      greetAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Contract Address
      greetting: '',
    }

    async function requestAccount() {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    async function fetchGreeting() {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          data.greetAddress,
          Greeter.abi, 
          provider,
        );

        try {
          const data = await contract.greet();
          console.log("get greet: ", data);
          //return data;
        } catch (err) {
          console.log("Error:", err);
        }
      }

    }

    async function setGreeting() {
      if (!data.greetting) return
      if (typeof window.ethereum !== "undefined") {
         await requestAccount()
         const  provider = new ethers.providers.Web3Provider(window.ethereum);
         const signer = provider.getSigner();
         const contract = new ethers.Contract(data.greetAddress, Greeter.abi, signer);
         const transaction = await contract.setGreeting(data.greetting);
         await transaction.wait()
         fetchGreeting()
      }
    }

    return {
      ...toRefs(data),
      requestAccount,
      fetchGreeting,
      setGreeting,
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
