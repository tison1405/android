<script>
import Header from '../components/header.vue'
import Menu from '../components/menu.vue'
import RelativeMail from '../components/relativeEmail.vue'
import Post from '../api/post';
import { mapState } from "vuex"

export default {
  name: 'inputMainPage',
  components: {
    Header,
    Menu,
    RelativeMail
  },
  data () {
    return {
        createTribe:"",
        relativeArray: [
            1,
        ],
        info: {
            tribeName:"",
            tribeId:"",
            userId:"",
            admin: 1
        },
        titleSave:"",
        tribeAdminSave:""
      
    }
  },
  computed: {
		...mapState ({
      user: "user",
		})
    },
  methods: {
     addRelativeMail(){
         let number = this.relativeArray.length+1;
         console.log(number);
         this.relativeArray.push(number);
     },
    loadTitle() {
        const ENDPOINT = '/tribe';
        Post (ENDPOINT, this.user, this.info)
        .then(res => {
          this.titleSave = res.data.create;
          this.info.tribeId = res.data.id;

          if (this.titleSave == 1) {
              this.info.userId = this.user.info.id;
              const ENDPOINT = '/tribe_user';
              Post (ENDPOINT, this.user, this.info)
              .then(res => {
                this.tribeAdminSave = res.data.creat;
                
              })
          }
        })
    }
  }
}
</script>

<template>
    <div>
        <Header/>
        <Menu page = "3"/>
        <div class="title2">
            <div v-if="this.tribeAdminSave == 1">
                <h2 class="title2__name" >
                    {{info.tribeName}}
                </h2>
                <div>
                    <label for="email" class="title2__formLabel">Invit relatives</label>
                    <RelativeMail
                        v-for="item in relativeArray"
                        :key="item"
                    />
                    <button @click="addRelativeMail">Add invit</button>
                </div>
            </div>

            <div v-else>
                <h2 class="title2__name" >
                    Create tribe
                </h2>
                <div id="formCreateTribe">
                    <label for="name" class="title2__formLabel">New Tribe Name</label>
                    <div>
                        <input
                            id="name"
                            class="title2__formInput"
                            v-model="info.tribeName"
                            type="name"
                            name="name"
                            placeholder="Inscrir le nom de la tribe."
                            required
                        >
                        <button class="title2__btn" @click="loadTitle">Valider</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.title2 {
    margin-top: 20px;
    &__name {
        color: rgb(68,114,196);
    }
    &__btnForm {
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
        height: 50px;
        font-size: 20px;
    }
    &__formInput {
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
    &__formLabel {
        text-align: initial;
        color: rgb(68,114,196);
    }
}
#formCreateTribe {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}
</style>