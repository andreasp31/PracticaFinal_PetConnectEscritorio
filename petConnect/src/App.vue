<template>
  <div class="contenedor">
    <div class="redesSociales">
      <div id="icono1" class="icono"></div>
      <div id="icono2" class="icono"></div>
      <div id="icono3" class="icono"></div>
    </div>
    <div class="bloqueIzquierdo">
      <img src="./assets/logoPet.png" class="logo">
      <div>
        <h2 class="texto">Más que un refugio, un punto de encuentro.</h2>
      <h2 class="texto">Conecta con nuestros animales a través de paseos, juegos y actividades guiadas diseñadas para fortalecer su felicidad y la tuya.</h2>
      </div>
      <div class="botones">
        <button class="botonPrimario">Iniciar sesión</button>
        <button class="botonPrimario">Registrarse</button>
      </div>
    </div>
    <div class="bloqueDerecho">
      <img src="./assets/fotoPerro2.png" class="foto">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const nuevaTarea = ref('')
const tareas = ref(['Analizar requisitos', 'Diseñar DB en Mongo'])

const addTarea = () => {
  if(nuevaTarea.value) {
    tareas.value.push(nuevaTarea.value)
    nuevaTarea.value = ''
  }
}
</script>

<style>
  .contenedor{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .botones{
    display: flex;
    flex-direction: column;
    width: 20em;
    gap:2em;
  }
  .botonPrimario{
    height: 4em;
    background-color: #eec699;
    color: #110501;
    border-radius: 15em;
  }
  .texto{
    color: #110501;
    font-weight: 100;
    width: 28em;
  }
  .redesSociales{
    display:flex;
    gap: 1.3em;
    width: 98%;
    justify-content: end;
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
  .bloqueIzquierdo{
    display: flex;
    flex-direction: column;
    gap:2em;
    align-items: center;
    width: 60%;
    margin-top: 5em;
  }
  .bloqueDerecho{
    margin-top: -29em;
    width: 60em;
    align-content: end;
    align-self: flex-end;
  }
  .foto{
    width: 50em;
  }
  .logo{
    object-fit:cover;
    height: 13em;
  }
</style>