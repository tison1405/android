<script>
import Header from '../components/header.vue'
import Menu from '../components/menu.vue'

export default {
  name: 'inputMainPage',
  components: {
    Header,
    Menu,
  },
  data () {
    return {
      
    }
  }
}
</script>

<template>
    <div>
        <Header/>
        <Menu page = "3"/>
        <div class="title2">
            <h2 class="title2__name">
                Create a new tribe
            </h2>
            <a class="title2__btnForm" href= "#/managetribe">Create a new tribe</a>
        </div>
    </div>
</template>

<style lang="scss">
.title2 {
    margin-top: 20px;
    &__name {
        text-align: initial;
        color: rgb(68,114,196);
    }
    &__btnForm {
         background-color: rgb(68,114,196);
        color: white;
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 10px;
        padding-right: 10px;
        border-style : solid;
        border-color : rgb(119,148,201) rgb(105,142,208) rgb(41,68,118) rgb(55,92,158);
        border-width : 8px 8px 8px 8px ;
        height: 50px;
        font-size: 20px;
        text-decoration: none;
        display: block;
        width: 240px;
    }

}
</style>