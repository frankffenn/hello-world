<template>
    <div class="w-screen h-screen bg-myblue flex items-center justify-center">
       <div class="relative md:w-80 md:h-4/5 w-screen h-full bg-center shadow-2xl">
            <img class="absolute w-full h-full" src="/src/assets/bg.jpg" />
            <div class="absolute inset-0 w-full h-full bg-indigo-100 bg-opacity-25"></div>
            <img class="relative h-32 w-32 rounded-full h-24 w-24 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border-8 border-grey-600" src="/src/assets/avatar.png" />
            <div class="relative mt-24 p-3 rounded-xl shadow-sm">
                <div class="font-sans text-white uppercase text-center ">Wellcome Back!</div>
                <div class="flex p-3 mx-6 border-b-2 border-white-500">
                    <font-awesome-icon class="text-white text-xl" icon="user" />
                    <input placeholder="Username" class="placeholder-white placeholder-opacity-75 ml-4 bg-transparent text-white w-full focus:outline-none focus:rang" type="tel" />
                </div>
                <div class="flex p-3 mx-6 flex border-b-2 border-white-500">
                    <font-awesome-icon class="text-white text-xl" icon="unlock-alt" />
                    <input placeholder="Password" class="placeholder-white placeholder-opacity-75 ml-4 bg-transparent text-white focus:outline-none focus:rang w-full" type="password" />
                    <font-awesome-icon class="w-auto text-white" icon="eye-slash" />
                </div>
            </div>
            <div class="relative font-sans bg-white text-center mx-10 h-10 rounded-lg leading-10 text-gray-900">Log In</div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>