<script>
import { mapState } from "vuex"
export default {
    name:"menu",
    props:["page"],
    computed: {
		...mapState ({
            user: "user",
		})
    }   
}
</script>

<template>
    <div class="menu">
        <div v-if="this.page==1" class="option2">
            <a href="#/inputMainPage" class="option2__link2">MyCritics</a>
        </div>
        <div v-else class="menu__option">
            <a href="#/inputMainPage" class="menu__option--link">MyCritics</a>
        </div>
        <div v-if="this.page==2" class="option2">
            <a href="#/trend" class="option2__link2">Trend</a>
        </div>
        <div v-else class="menu__option">
            <a href="#/trend" class="menu__option--link">Trend</a>
        </div>
        <div v-if="this.page==3" class="option2">
            <a href="#/mytribs" class="option2__link2">MyTribe</a>
        </div>
        <div v-else class="menu__option">
            <a href="#/mytribs" class="menu__option--link">MyTribe</a>
        </div>
        <div v-if="this.page==4" class="option2">
            <a href="" class="option2__link2">MyProfile</a>
        </div>
        <div v-else class="menu__option">
            <a href="" class="menu__option--link">MyProfile</a>
        </div>
    </div>
</template>

<style lang="scss">
.menu {
    display: flex;
    justify-content: center;
    margin-top: 25px;
    &__option{
        height: 45px;
        background-color: rgb(189,215,238);
        border-radius: 10px;
        border: 2px solid rgb(68,114,196);
        width: 100%;
        line-height: 45px;
        &:hover{
            background-color: rgb(68,114,196);
        }
        &--link{
            text-decoration: none;
            color: white;
            width: 100%;
            display: block;
            height: 100%;
        }
    }
.option2{
        height: 45px;
        background-color: rgb(68,114,196);
        border-radius: 10px;
        border: 2px solid rgb(68,114,196);
        width: 100%;
        line-height: 45px;
        &__link2{
            text-decoration: none;
            color: white;
            width: 100%;
            display: block;
            height: 100%;
        }
    }
}
</style>
