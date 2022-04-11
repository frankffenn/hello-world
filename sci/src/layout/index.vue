<template>
    <div class="app-wrapper">
        <Sidebar/>
        <div class="main-container">
            <Navbar />
            <router-view></router-view>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
export default defineComponent ({
    name:'Layout',
    components:{
    Navbar,
    Sidebar
}
})
</script>

<style lang="css" scoped>
.app-wrapper {
    display: flex;
    flex-direction: row;
}

.main-container {
    width: 100%;
    min-height: 100vh;
}
</style>