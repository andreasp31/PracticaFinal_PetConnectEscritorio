<template>
  <nav v-if="!['/paginaUsuario', '/misActividades'].includes($route.path)">
    <div class="redesSociales">
      <div id="icono1" class="icono"></div>
      <div id="icono2" class="icono"></div>
      <div id="icono3" class="icono"></div>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script setup>
</script>

<style>
@font-face {
  font-family: "fuente";
  src: url("./assets/fonts/Inter_18pt-Regular.ttf") format('truetype');
}

:root {
  font-family: "fuente", sans-serif;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  width: 1920px;
  height: 1080px;
  overflow: hidden; 
}

#app {
  width: 100%;
  height: 100%;
}

.redesSociales{
    display:flex;
    gap: 1.3em;
    width: 98%;
    justify-content: end;
    margin-top: 2em;
  }
  .icono{
    height: 2.2em;
    width: 2.2em;
    background-color: #110501;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-size: contain;
  }
  #icono1{
    -webkit-mask-image: url(./assets/facebook.svg);
    mask-image: url(./assets/facebook.svg);
  }
  #icono2{
    -webkit-mask-image: url(./assets/Instagram.svg);
    mask-image: url(./assets/Instagram.svg);
  }
  #icono3{
    -webkit-mask-image: url(./assets/tiktok.svg);
    mask-image: url(./assets/tiktok.svg);
  }
  .icono:hover{
    background-color: #eec699;
    cursor: pointer;
    transform: scale(1.2);
  }
</style>