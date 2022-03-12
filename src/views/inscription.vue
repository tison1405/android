<template>
    <body class="inscription">
        <a href="#/">
          <h1 class="titre">MyCritics</h1>
        </a>
        <form
          id="form"
          @submit="checkForm"
          method="post"
          novalidate="true"
        >
          <div class="form-section-sign col-md-6">
            <label for="genre" class="form-label">Genre</label>
            <div id="gender">
              <input
                id="homme"
                class="gender-radio"
                v-model="gender"
                name="radio"
                type="radio"
                value="H"
                required
              >
              <span class="form-radio">M</span>
              <input
                id="femme"
                class="gender-radio"
                v-model="gender"
                name="radio"
                type="radio"
                value="F"
                required
              >
              <span class="form-radio">F</span>
            </div>
          </div>

          <p class="form-section-sign col-md-6">
            <label for="lastname" class="form-label">Nom</label>
            <input
              id="lastname"
              class="form-input"
              v-model="lastname"
              type="text"
              name="name"
              placeholder="Inscrir votre nom."
              required
            >
          </p>

          <p class="form-section-sign col-md-6">
            <label for="name" class="form-label">Prénom</label>
            <input
              id="name"
              class="form-input"
              v-model="name"
              type="text"
              name="name"
              placeholder="Inscrir votre prénom."
              required
            >
          </p>

          <p class="form-section-sign col-md-6">
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

           <p class="form-section-sign col-md-6">
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

          <p class="form-section-sign col-md-6">
            <label for="birthdate" class="form-label">Date de naissance</label>
            <input
              id="birthdate"
              class="form-input"
              v-model="birthdate"
              type="date"
              name="birthdate"
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
  name: 'inscription',
  components: {
  },
  data () {
    return {
      errors: [],
      form : {},
      name: null,
      lastname: null,
      email: null,
      password: null,
      birthdate: null,
      gender: null,
      user:""
    }
  },
   methods: {
     async checkForm (e) {
      const validEmail = (value) => {
        var re = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
      }
      const validPassword = (value) => {
        var re =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(value);
      }
      e.preventDefault();
      this.errors = [];
      console.log(this.gender);
      if (!this.email) {
        this.errors.push('Email obligatoire.');
      } else if (! validEmail(this.email)) {
        this.errors.push('Valid email required.');
      }
      
      if (!this.password) {
        this.errors.push('Mot de passe obligatoire.');
      } else if (! validPassword(this.password)) {
        this.errors.push('Valid password required.');
      }

      if (!this.name) {
        this.errors.push('Prénom obligatoire.');
      }

      if (!this.lastname) {
        this.errors.push('Nom obligatoire.');
      }
      
      if (!this.gender) {
        this.errors.push('Genre obligatoire.');
      }
      
      if (!this.birthdate) {
        this.errors.push('Date de naissance obligatoire.');
      }

      if (!this.errors.length) {
        var d = new Date();
        this.form.email = this.email;
        this.form.password= this.password;
        this.form.genre= this.gender;
        this.form.name= this.name;
        this.form.lastname= this.lastname;
        this.form.birthdate= this.birthdate;
        this.form.added= d.getFullYear()+'-'+("0"+(d.getMonth()+1)).slice(-2)+'-'+("0"+d.getDate()).slice(-2)+" "+("0"+d.getHours()).slice(-2) + ":" + ("0"+d.getMinutes()).slice(-2) + ":" + ("0"+d.getSeconds()).slice(-2);
        const { data } = await axios.post("http://localhost:7000/api/user/signUp", this.form)
        this.user = data;
        if (this.user.message) {
          this.errors.push(this.user.message);
        } else {
          this.form.id = this.user.id;
          this.form.token = this.user.token
          this.$store.commit('DATA_USER', this.form);
          
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
.form-section-sign {
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
        width: 200px;
        font-size: 12px;
    }
#gender {
  width: 200px;
  display: flex;
  justify-content: space-around;
}
  
.gender-radio {
  width: 24px;
  height: 45px;
}
.form-radio {
  width: 45px;
  font-size: 20px;
  background-color: rgb(189,215,238);
  color: white;
  border-style : solid;
  border-color : rgb(215,231,245) rgb(202,223,241) rgb(113,129,143) rgb(152,173,191);
  border-width : 8px 8px 8px 8px ;
  text-align: center;
  height: 45px;
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
.inscription{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#form{
    margin-top:40px;
    width: 100%;
}


</style>