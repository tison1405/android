<script>
import { mapState } from "vuex";
export default {
    name: "popinTitle",
    props: [
        "reveleTitle",
        "toggleModaleTitle",
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
            this.$emit('custom-event-nameTitle', { message: this.title });
        }

       
    } 
}
</script>

<template>
    <div class="block-modale" v-if="reveleTitle">
        <div class="overlay" @click="toggleModaleTitle"></div>
        <div class="modale card">
            <div class="btn-modale btn " @click="toggleModaleTitle">x</div>
            <p class="inputTitle">
                <label for="title" class="form-labelTitle">Title</label>
                <input
                    id="title"
                    class="form-inputTitle"
                    v-model="title"
                    type="text"
                    placeholder="Inscrir le titre."
                    required
                >
            </p>
            
            <button @click="emitCustomEvent" class="btnForm">Valider</button>
        </div>
    </div>
</template>

<style lang="scss">
.inputTitle{
    display: flex;
    flex-direction: column;
}
.form-labelTitle {
    height: 45px;
    background-color: #4472c4;
    color: white;
    border-color: #7794c9 #698ed0 #294476 #375c9e;
    border-width: 8px 8px 8px 8px;
    font-size: 29px;
}
.optionRate {
    white-space: pre-wrap;
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
.form-inputTitle{
    height: 67px;
    background-color: #bdd7ee;
    color: white;
    border-color: #d7e7f5 #cadff1 #71818f #98adbf;
    border-width: 8px 8px 8px 8px;
    text-align: center;
    font-size: 22px;
    margin-top: 14px;
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
    padding-top: 56px;
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 40px;
    position: fixed;
    top:30%;
    width: 95%;
}
.btn-modale{
    position: absolute;
    top:10px;
    right: 10px;
    background-color: rgb(68,114,196);
    color: white;
}
</style>