<template>
<body class="accueil">
<div class="titre">
  <h1>MyCRITICS</h1>
</div>
<div class="identif">
  <a href="#/connection" class="identif__connection">Connexion</a>
  <p class="identif__separation"> / </p>
  <a href="#/inscription" class="identif__inscription">Inscription</a>
</div>
</body>

</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="scss">
.accueil{
  display: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:150px;
}
.titre{
    background-color: rgb(47,85,151);
    color: white;
    padding: 10px;
    width: fit-content;
    text-decoration: inherit;
}
.identif{
  display: flex;
  &__connection{
    text-decoration: none;
    color:rgb(46,117,182);
  }
  &__inscription{
    text-decoration: none;
     color:rgb(46,117,182);
  }
  &__separation{
     color:rgb(46,117,182);
  }

}

</style>
