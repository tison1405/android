<script>
const axios = require("axios");
export default {
    name:"relativeMail",
    props: {
        
    },
    data() {
        return{
           form:{
               mail:"",
           },
           result:""
        }
    },
    methods: {
       async checkMail() {
         const { data } = await axios.post("http://localhost:7000/api/user/", this.form)
         this.result = data
         console.log(data.message)   
        }
    }
}
</script>

<template>
    <div>
        <input
            id="email"
            class="formInput"
            v-model="form.mail"
            @change="checkMail"
            type="email"
            name="email"
            placeholder="Inscrir l'adresse mail."
            required
        >
        <button v-if="this.result.id" >Invit</button>
        <button v-else-if="this.result.message" >Send Email</button>
    </div>
</template>

<style lang="scss">
.formInput{
    height: 50px;
    background-color: rgb(189,215,238);
    color: white;
    border-style : solid;
    border-color : rgb(215,231,245) rgb(202,223,241) rgb(113,129,143) rgb(152,173,191);
    border-width : 8px 8px 8px 8px ;
    text-align: center;
    width: 250px;
    margin-top: 10px;
}

</style>