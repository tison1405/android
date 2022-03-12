<script>
import { mapState } from "vuex";
export default {
    name: "popinMedias",
    props: [
        "revele",
        "toggleModale",
        "options",
    ],
    data() {
        return{
           title:""
        }
    },
    computed: {
		...mapState({
            user: "user"
        }), 
    },
    methods: {
        emitCustomEvent() {
            this.$emit('custom-event-name', { message: this.title });
        }

       
    } 
}
</script>

<template>
    <div class="block-modale" v-if="revele">
        <div class="overlay" @click="toggleModale"></div>
        <div class="modale card">
            <div class="btn-modale btn " @click="toggleModale">x</div>
            <select
                id="Catefory"
                class="form-input-title"
                v-model="title"
                required
                size="4"
            >
                 <option v-for="option in options" v-bind:value="option" :key="option.id">
                    {{ option.media_title }}
                </option>
                <option value="a">n'est pas dans la liste</option>

            </select>
            <button @click="emitCustomEvent" class="btnForm">Valider</button>
        </div>
    </div>
</template>

<style lang="scss">
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
.form-input-title{
    height: 200px;
    background-color: rgb(189,215,238);
    color: white;
    border-style : solid;
    border-color : rgb(215,231,245) rgb(202,223,241) rgb(113,129,143) rgb(152,173,191);
    border-width : 8px 8px 8px 8px ;
    text-align: center;
    font-size: 20px;
}

.block-modale{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.overlay{
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.modale{
    background:#f1f1f1;
    color: #333;
    padding: 50px;
    position: fixed;
    top:30%;
    width: 80%;
}
.btn-modale{
    position: absolute;
    top:10px;
    right: 10px;
    background-color: rgb(68,114,196);
    color: white;
}
</style>