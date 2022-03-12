<script>
export default {
    name:"serieList",
    props: {
        name: {
            type: String,
            required: true
        },
        numberCritics: {
            type: Number,
            required: true
        },
        numberLine: {
            type : Number,
            required : true
        }

    }
}
</script>

<template>
    <div class="critic">
        <p>{{numberLine +1}}. {{name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()}} - {{numberCritics}} votes</p>
    </div>
</template>

<style lang="scss">
.critic {
    display: flex;
    font-size: 26px;
    padding: 15px;
}
</style>