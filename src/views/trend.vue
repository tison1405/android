<template>
    <dir>
        <Header/>
        <Menu page = "2"/>
        <div class="category">
            <button class="category__item" @click="film" id="film">Films</button>
            <div class="category__div">|</div>
            <button class="category__item--serie" @click="serie" id="serie">Series</button>
            <div class="category__div">|</div>
            <button class="category__item" @click="livre" id="livre">Livres</button>
        </div> 
        <p class="form-section-sign col-md-6">
            <select
                id="trib"
                class="form-input-select"
                v-model="trib"
                required
                @change="tribing"
            >
                <option value="0">General</option>
                <option v-for="trib in tribs" v-bind:value="trib.id" :key="trib.tribe_name">
                    {{ trib.tribe_name }}
                </option>
            </select>

            <select
                id="rate"
                class="form-input-select"
                v-model="rate"
                required
                @change="rating"
            >
                <option v-for="rate in rates" v-bind:value="rate.id" :key="rate.id" class="optionRate">
                    {{ rate.rating_name }}
                </option>
            </select>
        </p>
        <SerieList 
            v-for="item in critics"
            :name="item.media_title"
            :numberCritics="item.nb_critic"
            :numberLine= critics.indexOf(item)
            :key = item.nb_critic
        />
    </dir>
</template>
<script>
import Header from '../components/header.vue';
import Menu from '../components/menu.vue';
import { mapState } from "vuex";
import getRates from '../api/getRate';
import getCritics from '../api/getCritics';
import SerieList from '../components/serieList.vue' 
export default {
  name: 'inputMainPage',
  components: {
    Header,
    Menu,
    SerieList
  },
  data () {
    return {
        trib: 0,
        rate: 7,
        rates:"",
        category:2,
        critics:""
      
    }
  },
  computed: {
		...mapState ({
      user: "user",
      tribs: "tribs"
		})
	},
  beforeMount() {
    this.$store.commit('GET_TRIBS_USER');
    getRates(this.user, 2)
          .then(res => {
          this.rates = res.data.result;
          this.rate = res.data.result[0].id;
          getCritics(this.user,this.category,this.rate, this.trib)
            .then(res => {
            this.critics = res.data.critics;
             });
          });
    
  },
  methods: {
      async film() {
          console.log(this.critics);
          document.getElementById('film').style.backgroundColor = 'rgb(68,114,196)';
          document.getElementById('film').style.color = 'white';
          document.getElementById('serie').style.backgroundColor = 'white';
          document.getElementById('serie').style.color = 'rgb(68,114,196)';
          document.getElementById('livre').style.backgroundColor = 'white';
          document.getElementById('livre').style.color = 'rgb(68,114,196)';
          this.category = 1;
          getRates(this.user, this.category)
          .then(res => {
          this.rates = res.data.result;
          this.rate = res.data.result[0].id;
          getCritics(this.user,this.category,this.rate,this.trib)
            .then(res => {
            this.critics = res.data.critics;
             });
          });
         
      },
      async serie() {
          document.getElementById('serie').style.backgroundColor = 'rgb(68,114,196)';
          document.getElementById('serie').style.color = 'white';
          document.getElementById('film').style.backgroundColor = 'white';
          document.getElementById('film').style.color = 'rgb(68,114,196)';
          document.getElementById('livre').style.backgroundColor = 'white';
          document.getElementById('livre').style.color = 'rgb(68,114,196)';
          this.category = 2;
          getRates(this.user, this.category)
          .then(res => {
          this.rates = res.data.result;
          this.rate = res.data.result[0].id
          getCritics(this.user,this.category,this.rate,this.trib)
            .then(res => {
            this.critics = res.data.critics;
             });
          });
      },
     async livre() {
          document.getElementById('livre').style.backgroundColor = 'rgb(68,114,196)';
          document.getElementById('livre').style.color = 'white';
          document.getElementById('film').style.backgroundColor = 'white';
          document.getElementById('film').style.color = 'rgb(68,114,196)';
          document.getElementById('serie').style.backgroundColor = 'white';
          document.getElementById('serie').style.color = 'rgb(68,114,196)';
          this.category = 3;
          getRates(this.user, this.category)
          .then(res => {
          this.rates = res.data.result;
          this.rate = res.data.result[0].id
          getCritics(this.user,this.category,this.rate,this.trib)
            .then(res => {
            this.critics = res.data.critics;
             });
          });
      },
      rating() {
          getCritics(this.user,this.category,this.rate,this.trib)
            .then(res => {
            this.critics = res.data.critics;
             });
      },
      tribing() {
         getCritics(this.user,this.category,this.rate,this.trib)
            .then(res => {
            this.critics = res.data.critics;
             });
      }
    
  }
}
</script>

<style lang="scss">
.category {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 20px;
    color: rgb(68,114,196);
    margin-top: 10px;
    &__item {
        padding-bottom: 6px;
        padding-top: 6px;
        padding-left: 20px;
        padding-right: 20px;
        &--serie {
            background-color:rgb(68,114,196) ;
            color: white;
            padding-bottom: 6px;
            padding-top: 6px;
            padding-left: 20px;
            padding-right: 20px;
        }
    }
    &__div {
        padding-bottom: 6px;
        padding-top: 6px;
        padding-left: 20px;
        padding-right: 20px;
    }
}
.form-section-sign {
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: unset;
    padding: 8px;
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
</style>