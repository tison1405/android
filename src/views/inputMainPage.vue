<script>
import Header from '../components/header.vue'
import Menu from '../components/menu.vue'
import { mapState } from "vuex"
import Popin from '../components/popinMedias.vue'
import Post from '../api/post';
import PopinRating from '../components/popinRating.vue';
import PopinTitle from '../components/popinTitle.vue'
export default {
  name: 'inputMainPage',
  components: {
    Header,
    Menu,
    Popin,
    PopinRating,
    PopinTitle
  },
  data () {
    return {
      revele: false,
      reveleRating: false,
      reveleTitle: false,
      media:{
        category:0,
        network:0,
        title:"",
        creatTitle:"",
        selection:"",
        dateAdded:"",
        id:""
      },
      rate:"",
      comments:"",
      critic:0
    }
  },
  computed: {
		...mapState ({
      user: "user",
		})
	},
  methods: {
     async toggleModale() {
      this.media.creatTitle = "";
      this.revele = !this.revele
      const ENDPOINT = '/media';
        Post (ENDPOINT, this.user, this.media)
        .then(res => {
          this.media.selection = res.data.result;
        })
    },
    async toggleModaleRating() {
      this.reveleRating = !this.reveleRating
      const ENDPOINT ='/rating';
      Post (ENDPOINT, this.user, this.media)
      .then(res => {
        this.rate = res.data.result;
      })
    },
    toggleModalTitle() {
      this.reveleTitle = !this.reveleTitle
      this.media.title ="";
    },
    returned(){
      location.reload();
    },
    setMessage(payload) {
      this.media.title = payload.message;
      if (this.media.title == 'a'){
        this.revele = !this.revele
        this.reveleTitle = !this.reveleTitle
      } else {
        this.revele = !this.revele
      }
    },
    setMessageRating(payload) {
      this.rate = payload.message;
      this.reveleRating = !this.reveleRating
    },
    setMessageTitle(payload) {
      this.media.creatTitle = payload.message;
      this.media.title = "";
      this.reveleTitle = !this.reveleTitle
    },
    async sendComents() {
      var d = new Date();
      if (this.media.creatTitle) {
        this.media.dateAdded = d.getFullYear()+'-'+("0"+(d.getMonth()+1)).slice(-2)+'-'+("0"+d.getDate()).slice(-2)+" "+("0"+d.getHours()).slice(-2) + ":" + ("0"+d.getMinutes()).slice(-2) + ":" + ("0"+d.getSeconds()).slice(-2);
        const ENDPOINT = '/media/creat';
        //insertion dans la table media
        Post (ENDPOINT, this.user, this.media)
        .then(res => {
          this.media.id = res.data.id;
          const data = {
            mediaId:this.media.id,
            rate:this.rate.id, 
            comments:this.comments, 
            userId:this.user.info.id,
            dateAdded:this.media.dateAdded
            };
          const ENDPOINT = '/critic/creat'
          Post (ENDPOINT, this.user, data)
          .then(res => {
            this.critic = res.data.result;
            console.log(this.critic);
          })
        });
      } else {
        this.media.dateAdded = d.getFullYear()+'-'+("0"+(d.getMonth()+1)).slice(-2)+'-'+("0"+d.getDate()).slice(-2)+" "+("0"+d.getHours()).slice(-2) + ":" + ("0"+d.getMinutes()).slice(-2) + ":" + ("0"+d.getSeconds()).slice(-2);
        const data = {
            mediaId:this.media.title.id,
            rate:this.rate.id, 
            comments:this.comments, 
            userId:this.user.info.id,
            dateAdded:this.media.dateAdded
            };
          const ENDPOINT = '/critic/creat'
          Post (ENDPOINT, this.user, data)
          .then(res => {
            this.critic = res.data.result;
            console.log(this.critic);
          })
      }   
    }
  }
}
</script>

<template>
<div>
  <Header/>
  <Menu page = "1"/>
  <h2 class="title2">Share your critics</h2>
  <div v-if="this.critic == 1">
    <p>Votre critic a bien été enregistrée.</p> 
    <dir class="criticSave" v-if="this.media.title.media_title">{{media.title.media_title}}</dir>
    <dir class="criticSave" v-if="this.media.creatTitle">{{media.creatTitle}}</dir>
    <dir class="criticSave">{{rate.rating_name}}</dir>
    <div class="criticSave">{{comments}}</div>
    <button class="btnFormReturn" @click="returned">Poster une aute Critic.</button>
  </div>
  <form v-if="this.critic == 0"
    id="form"
    novalidate="true"
  >
    <p class="form-section-sign col-md-6">
      <label for="Category" class="form-label">Category</label>
      <select
        id="Category"
        class="form-input-select"
        v-model="media.category"
        required
      >
        <option value="0">choisissez</option>
        <option value="1">Film</option>
        <option value="2">Séries</option>
        <option value="3">Livres</option>
      </select>
    </p>

    <p class="form-section-sign col-md-6" v-if="this.media.category ==1 || this.media.category==2">
      <label for="network" class="form-label">Network</label>
      <select
        id="network"
        class="form-input-select"
        v-model="media.network"
        required
      >
        <option value="0">choisissez</option>
        <option value="1">Netflix</option>
        <option value="2">Amazon vidéo</option>
        <option value="3">OCS</option>
        <option value="4">HBO</option>
        <option value="5">Prim vidéo</option>
        <option value="6">TF1</option>
        <option value="7">M6</option>
        <option value="8" v-if="this.media.category == 1">Sortie au cinéma</option>
        <option value="10">Canal+</option>
        <option value="11">Apple tv</option>
        <option value="12">Salto</option>
      </select>
    </p>

    <p class="form-section-sign col-md-6" v-if="this.media.network !=0 && this.media.title != 'a' ">
      <label for="name" class="form-label">Title</label>
      <button class="form-input-select" @click="toggleModale">
        <span v-if="this.media.title">{{media.title.media_title}}</span>
        <span v-else-if="this.media.creatTitle">{{media.creatTitle}}</span>
        <span v-else>Choisissez</span>
      </button>
      <Popin 
        :revele="revele"
        :toggleModale="toggleModale"
        :options="media.selection"
        @custom-event-name="setMessage"
      />
    </p>
    <PopinTitle
      :reveleTitle="reveleTitle"
      :toggleModaleTitle="toggleModalTitle"
      @custom-event-nameTitle="setMessageTitle"
    />

    <p class="form-section-sign col-md-6" v-if="this.media.category !=0">
      <label for="name" class="form-label">Rate</label>
      <button class="form-input-select" @click="toggleModaleRating">
        <span v-if="this.rate.rating_name">{{rate.rating_name}}</span>
        <span v-else>Choisissez</span>
      </button>

      <PopinRating 
      :reveleRating="reveleRating"
      :optionsRating="rate" 
      :toggleModaleRating="toggleModaleRating"
      @custom-event-nameRating="setMessageRating"
      />
    </p>

    
   

    <p class="form-section-sign col-md-6">
      <label for="comments" class="form-label">Comments</label>
      <textarea 
        type="text" 
        class="form-input-textarea" 
        id="comments" 
        v-model="comments"  
        placeholder="Ecrivez votre commentaire ici"
        maxlength="50"
      ></textarea>
    </p>

    <button class="btnForm" @click="sendComents">Valider</button>
  </form>
</div>
</template>

<style lang="scss">
.criticSave{
  font-size: 28px;
  margin: 35px;
}
.btnForm{
        background-color: rgb(68,114,196);
        color: white;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 10px;
        padding-right: 10px;
        border-style : solid;
        border-color : rgb(119,148,201) rgb(105,142,208) rgb(41,68,118) rgb(55,92,158);
        border-width : 8px 8px 8px 8px ;
        width: 120px;
        height: 50px;
        font-size: 20px;
}
.btnFormReturn{
        background-color: rgb(68,114,196);
        color: white;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 10px;
        padding-right: 10px;
        border-style : solid;
        border-color : rgb(119,148,201) rgb(105,142,208) rgb(41,68,118) rgb(55,92,158);
        border-width : 8px 8px 8px 8px ;
        width: 246px;
        height: 50px;
        font-size: 20px;
}

.title2 {
  color: rgb(68,114,196);
  margin: 25px;
}
.form-input-textarea {
        height: 150px;
        background-color: rgb(189,215,238);
        color: white;
        border-style : solid;
        border-color : rgb(215,231,245) rgb(202,223,241) rgb(113,129,143) rgb(152,173,191);
        border-width : 8px 8px 8px 8px ;
        text-align: center;
        width: 200px;
        font-size: 20px;
}
.form-input-textarea::placeholder {
  color: white;
}
.form-input-select{
        height: 45px;
        background-color: rgb(189,215,238);
        color: white;
        border-style : solid;
        border-color : rgb(215,231,245) rgb(202,223,241) rgb(113,129,143) rgb(152,173,191);
        border-width : 8px 8px 8px 8px ;
        text-align: center;
        width: 200px;
        font-size: 20px;
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
.form-section-sign {
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: unset;
  padding: 8px;
}
</style>