<template>
  <div class="contenedor">
    <div class="bloqueIzquierdo">
      <img src="../assets/logoPet.png" class="logo">
      <div>
        <h2 class="texto">Más que un refugio, un punto de encuentro.</h2>
        <h2 class="texto">Conecta con nuestros animales a través de paseos, juegos y actividades guiadas diseñadas para fortalecer su felicidad y la tuya.</h2>
      </div>
      <div class="botones">
        <button class="botonPrimario" @click="$router.push('/login')">Iniciar sesión</button>
        <button class="botonPrimario" @click="$router.push('/registrar')">Registrarse</button>
      </div>
    </div>
    <div class="bloqueDerecho">
      <img src="../assets/fotoPerro2.png" class="foto">
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
    width: 18em;
    gap:2em;
  }
  button:hover {
    background-color: #110501;
    color: #e0dbd4;
  }
  .botonPrimario{
    height: 3em;
    background-color: #eec699;
    color: #110501;
    border-radius: 15em;
  }
  .texto{
    color: #110501;
    font-weight: 100;
    width: 28em;
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