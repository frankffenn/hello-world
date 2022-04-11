<template>
  <div class="container">
        <nav>
            <div class="header">
                <h1 class="logo">科学+</h1>
            </div>
            <ul>
                <router-link class="item" v-for="(item,index) in chainList" :key="index" :to="item.path">
                    <li @click="handleClick(index)" :class="active === index? 'active':''">
                        <span class="icon"></span>
                        <span class="title">{{item.name}}</span>
                    </li>
                </router-link>
            </ul>
        </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'Sidebar',
  props: {
    
  },
  setup() {
     const data = reactive({
         active: 0,
         chainList:[{
             name: '开盘列表',
             path: '/newlist',
             icon: ''
         },
         {
             name: '预售列表',
             path: '/presale',
             icon: ''
         }],
     })

    const handleClick = (index: number)=>{
       return data.active = index;
    }   

     return {...toRefs(data), handleClick}
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: row;
}

.logo {
    color: #fff;
    padding-top: 20px;
}

nav {
   background-color: #0F1730;
   width: 250px;
   min-height: 100vh;
}

ul a{
    text-decoration: none;
    font-size: 14px;
    color: #dfdfdf;
    text-align: center;
    line-height: 40px;
}

li {
    margin: 5px 5px;
    border-radius: 10px;
    padding: 5px 0;
}

li.active {
   background: #fff;
   color: #0F1730;
}

</style>
