<template>
    <body class="connection">
        <a href="#/">
          <h1 class="titre">MyCritics</h1>
        </a>
        <form
          id="formConnexion"
          @submit="checkForm"
          method="post"
          novalidate="true"
        >
          <p class="form-section-connexion col-md-6">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              class="form-input"
              v-model="email"
              type="email"
              name="email"
              placeholder="Inscrir votre email."
              required
            >
          </p>

           <p class="form-section-connexion col-md-6">
            <label for="password" class="form-label">Mot de passe</label>
            <input
              id="password"
              class="form-input"
              v-model="password"
              type="password"
              name="password"
              placeholder="Inscrir votre mot de passe."
              required
            >
          </p>

          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
          </p>

          <input
            type="submit"
            class="btnForm"
            value="valider"
          >

        </form>

            

    </body>

</template>

<script>
const axios = require("axios");
export default {
  name: 'connection',
  components: {
  },
  data () {
    return {
      errors: [],
      form : {},
      email: null,
      password: null,
      user:"",
      date:{
        lastlogon:"",
        id:""
      }
    }
  },
   methods: {
     async checkForm (e) {
      e.preventDefault();
      this.errors = [];
      if (!this.email) {
        this.errors.push('Email obligatoire.');
      }
     
      if (!this.password) {
        this.errors.push('Mot de passe obligatoire.');
      }

      if (!this.errors.length) {
         this.form.email = this.email;
         this.form.password= this.password;
         var d = new Date();
        const { data } = await axios.post("http://localhost:7000/api/user/login", this.form)
        this.user = data;
        if (this.user.message) {
          this.errors.push(this.user.message);
        } else {
          this.$store.commit('DATA_USER', this.user);
          this.date.lastlogon= d.getFullYear()+'-'+("0"+(d.getMonth()+1)).slice(-2)+'-'+("0"+d.getDate()).slice(-2)+" "+("0"+d.getHours()).slice(-2) + ":" + ("0"+d.getMinutes()).slice(-2) + ":" + ("0"+d.getSeconds()).slice(-2);
          this.date.id= this.user.id;
          console.log(this.user);
          const { data } = await axios.put("http://localhost:7000/api/user/lastlogon", this.date)
          if(data.message) {
            console.log(data.message);
          }
          document.location.href = "#/inputMainPage";
        }

      }
    }
  }

}
</script>

<style lang="scss">
.btnForm{
       background-color: rgb(68,114,196);
        color: white;
        margin-top: 40px;
        padding-left: 10px;
        padding-right: 10px;
        border-style : solid;
        border-color : rgb(119,148,201) rgb(105,142,208) rgb(41,68,118) rgb(55,92,158);
        border-width : 8px 8px 8px 8px ;
        width: 120px;
        height: 50px;
        font-size: 20px;
}
.form-section-connexion {
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: unset;
  padding: 8px;
}
.form-input{
        height: 45px;
        background-color: rgb(189,215,238);
        color: white;
        border-style : solid;
        border-color : rgb(215,231,245) rgb(202,223,241) rgb(113,129,143) rgb(152,173,191);
        border-width : 8px 8px 8px 8px ;
        text-align: center;
    }
.form-label{
        height: 45px;
        background-color: rgb(68,114,196);
        color: white;
        border-style : solid;
        border-color : rgb(119,148,201) rgb(105,142,208) rgb(41,68,118) rgb(55,92,158);
        border-width : 8px 8px 8px 8px ;
        width: 145px;
        margin-right: 10px;
    
    }
.connection{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:150px;
}
#formConnexion{
    margin-top:40px;
    width: 100%;
}


</style>