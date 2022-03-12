<script>
import { mapState } from "vuex"
export default {
    name:"header",
    props:[],
    computed: {
		...mapState ({
            user: "user",
		})
    }   
}
</script>

<template>
<div class="head">
    <div class="head__title">
      <h1 class="head__title--text">MyCRITICS</h1>
    </div>
    <img v-if="!this.user.photo" src="../assets/images/inconnu.png"  alt="photo utilisateur inconnu" class="userArea__userPhoto--photoUse"/>
    <img v-else :src= user.photo alt="photo utilisateur" class="userArea__userPhoto--photoUse"/>
</div>
</template>

<style lang="scss">
.head {
    margin: 9px;
    display: flex;
    justify-content: space-between;
    height: 40px;
    &__title{
        background-color: #2f5597;
        color: white;
        padding: 3px;
        width: fit-content;
        &--text{
            font-size: 30px;
        }
    }
}
#nav{
    padding: inherit;
}

</style>