<script setup>
    import { ref } from 'vue'
    const password = ref('')
    const login = async()=>{
      try{
        const respuesta = await fetch("")
      }
      catch(errror){
        console.log("Error al conectar con el servidor: ",error)
      }
    }
    const actividades = ref([
      { _id: 1, nombre: 'Paseo por el parque',descripcion: 'Un paseo relajante para tu mascota.' },
      { _id: 2, nombre: 'Guardería Canina', descripcion: 'Cuidamos a tu perro todo el día.' },
      { _id: 3, nombre: 'Entrenamiento', descripcion: 'Mejora el comportamiento de tu peludo.' },
      { _id: 4, nombre: 'Entrenamiento', descripcion: 'Mejora el comportamiento de tu peludo.' },
      { _id: 1, nombre: 'Paseo por el parque',descripcion: 'Un paseo relajante para tu mascota.' },
      { _id: 2, nombre: 'Guardería Canina', descripcion: 'Cuidamos a tu perro todo el día.' },
      { _id: 3, nombre: 'Entrenamiento', descripcion: 'Mejora el comportamiento de tu peludo.' },
      { _id: 4, nombre: 'Entrenamiento', descripcion: 'Mejora el comportamiento de tu peludo.' },
  // Puedes añadir o quitar objetos aquí para ver cómo reacciona el Grid
    ])
</script>

<template>
  <div class="contenedor">
    <div class="bloqueArriba">
      <div class="usuario">
        <img src="../assets/huella.png" class="iconoU">
        <div>Nombre</div>
      </div>
      <img src="../assets/logoBlanco.png" class="logo">
      <div class="redesSociales2">
        <div id="icono1" class="icono"></div>
        <div id="icono2" class="icono"></div>
        <div id="icono3" class="icono"></div>
      </div>
    </div>
    <div class="bloqueBotones">
      <button class="botonPrimario2">Nuevas Actividades</button>
      <button class="botonSecundario">Mis Actividades</button>
      <button class="botonTerciario">Adoptar</button>
    </div>
    <div class="bloqueActividades">
      <div v-for="actividad in actividades" :key="actividad._id" class="tarjeta">
        <div class="tarjetaSub">
          <h2 class="texto">{{ actividad.nombre }}</h2>
          <button class="botonPrimario">Inscribirse</button>
        </div>
        <p class="texto">{{ actividad.descripcion }}</p>
      </div>
    </div>
  </div>
</template>


/*Para que los estilos solo afecten a esta vista */
<style scoped>
  .contenedor{
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0em;
    overflow-y: visible;
    align-items: center;
  }
  .bloqueActividades{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap:2em;
    padding: 1em;
    width: 90%;
    overflow: hidden;
    justify-content: center;
    margin-top: 2em;
  }
  .tarjeta{
    display: flex;
    flex-direction: column;
    border-color: #110501;
    border-width: 0.1em;
    border-style: solid;
    border-radius: 2em;
    padding: 1em;
    max-width: 30em;
  }
  .tarjetaSub{
    display: flex;
    flex-direction: row;
  }
  .usuario{
    display: flex;
    flex-direction: row;
    gap:2em;
    align-items: center;
    margin-left: -5em;
  }
  .iconoU{
    height: 2em;
  }
  .huecos{
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    align-items:center;
    width: 60%;
  }
  .botones{
    display: flex;
    flex-direction: column;
    width: 60%;
    align-items: center;
    justify-content: center;
    gap:0.5em;
  }
  .redesSociales2{
    display:flex;
    gap: 1.3em;
  }
  .icono{
    height: 2.2em;
    width: 2.2em;
    background-color: #ffffff;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-size: contain;
  }
  .bloqueBotones{
    display: flex;
    flex-direction: row;
    gap:2em;
    justify-content: center;
    width: 100%;
    padding-top: 2em;
  }
  .botonPrimario{
    height: 3em;
    background-color: #eec699;
    color: #110501;
    border-radius: 15em;
    width: 12em;
    font-size: large;
  }
  .botonPrimario2{
    height: 3em;
    background-color: #110501;
    color: #ffffff;
    border-radius: 15em;
    width: 12em;
    font-size: large;
  }
  .botonSecundario{
    height: 3em;
    background-color: #ffffff;
    color: #110501;
    cursor: pointer;
    padding: 1em;
    width: 12em;
    font-size: large;
    border-color: #110501;
    border-width: 0.1em;
    border-style: solid;
    border-radius: 15em;
    font-size: large;
  }
  .botonTerciario{
    height: 3em;
    background-color: #ffffff;
    color: #8a8787;
    cursor: pointer;
    padding: 1em;
    width: 12em;
    font-size: large;
    border-color: #8a8787;
    border-width: 0.1em;
    border-style: solid;
    border-radius: 15em;
    font-size: large;
  }
  .botonSecundario:hover{
    background-color: #110501;
    color: #eec699;
    padding: 1em;
    padding-left: 2em;
    padding-right: 2em;
    border-radius: 15em;
    cursor: pointer;
  }
  .botonTerciario:hover{
    padding: 1em;
    padding-left: 2em;
    padding-right: 2em;
    border-radius: 15em;
    cursor: pointer;
  }
  button:hover {
    background-color: #110501;
    color: #e0dbd4;
  }
   button:focus,
   button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
   }
  .texto{
    color: #110501;
    font-weight: 100;
    width: 28em;
    text-align: left;
  }
  .textoEnlace{
    color: #110501;
    font-weight: 100;
    width: 28em;
    cursor: pointer;
  }
  .correo{
    background-color: rgb(255, 255, 255);
    border-radius: 20em;
    height: 3em;
    width: 28em;
    padding: 0.5em;
    padding-left: 1.5em;
    border-color: #110501;
    border-style: solid;
    color: #110501;
    font-size: medium;
  }
  .bloqueArriba{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap:30em;
    align-items: self-start;
    width: 100%;
    height: 30%;
    background-image: url("../assets/fondoPerro2.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding: 2em;
  }
  .bloqueDerecho{
    margin-top: -53em;
    width: 60em;
    align-content: end;
    align-self: flex-end;
  }
  .logo{
    object-fit:cover;
    height: 6em;
    margin-left: 8em;
  }
</style>