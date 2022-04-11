<template>
  <div class="container">
    <button>连接钱包</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'Navbar',
  props: {
    
  },
  setup() {

  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    width: 100%;
    height: 40px;
}

button {
    padding: 10px 16px;
    position: absolute;
    right: 20px;
    top: 20px;
    border: 1px solid  #E92E66;
    background-color: #fff;
    color: #E92E66;
    border-radius: 10px 0 10px 0;
    cursor: pointer;
    font-size: 12px;
}

button:hover {
    background-color: #E92E66;
    color: #fff;
}

</style>
