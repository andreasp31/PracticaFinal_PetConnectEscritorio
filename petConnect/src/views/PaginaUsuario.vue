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
    const mostrarModal = ref(false)
    const actividadSeleccionada = ref(null)
    const abrirModal = (actividad)=>{
      actividadSeleccionada.value = actividad
      mostrarModal.value = true
    }
    const mostrarModalAdoptar = ref(false)
    const abrirModalAdoptar = ()=>{
      mostrarModalAdoptar.value = true
    }
    const cerrarModalAdoptar = ()=>{
      mostrarModalAdoptar.value = false
    }
    const horasDispo = ["09:00","11:00","13:00","17:00","19:00"];
    const horaSeleccionada = ref(null);
    const seleccionarHora =(hora)=>{
      horaSeleccionada.value = hora;
    }
    const cerrarModal = ()=>{
      mostrarModal.value = false
      horaSeleccionada.value = false
    }
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
      <button class="botonSecundario" @click="$router.push('/misActividades')">Mis Actividades</button>
      <button class="botonSecundario" @click="abrirModalAdoptar()">Adoptar</button>
    </div>
    <div class="bloqueActividades">
      <div v-for="actividad in actividades" :key="actividad._id" class="tarjeta">
        <div class="tarjetaSub">
          <h2 class="texto">{{ actividad.nombre }}</h2>
          <button class="botonPrimario" @click="abrirModal(actividad)">Ver más</button>
        </div>
        <p class="texto">{{ actividad.descripcion }}</p>
      </div>
    </div>
    <div class="modalActividad">
      <div v-if="mostrarModal" class="overlay" @click.self="cerrarModal">
        <div class="modal">
          <div class="cabeceraModal2">
            <div @click="cerrarModal" class="botonCerrar2"></div>
          </div>
          <h2 class="texto4">{{ actividadSeleccionada?.nombre }}</h2>
          <div class="descripcion2">
            <p class="texto5">{{ actividadSeleccionada?.descripcion }}</p>
            <div class="botonesHora">
              <button v-for="hora in horasDispo" :key="hora" :class="['botonHora', { activo: horaSeleccionada === hora }]" @click="seleccionarHora(hora)">{{ hora }}</button>
            </div>
          </div>
          <div class="pieActividad">
            <button class="botonPrimario2">Inscribirme</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modalAdoptar">
      <div v-if="mostrarModalAdoptar" class="overlay" @click.self="cerrarModalAdoptar">
        <div class="modal2">
          <div class="cabeceraModal">
            <div @click="cerrarModalAdoptar" class="botonCerrar"></div>
            <h2 class="texto2">Próximamente!</h2>
          </div>
          <div class="descripcion">
            <p class="texto3">Estamos creando un espacio dedicado a conectar animales de protectoras con familias que busquen un nuevo mejor amigo. Muy pronto podrás conocer sus historias, recibir asesoramiento sobre el proceso y dar el paso para cambiar una vida para siempre.</p>
            <div class="fotoAdopcion"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


/*Para que los estilos solo afecten a esta vista */
<style scoped>
  .botonesHora{
    display: flex;
    flex-direction: row;
    gap: 2em;
  }
  .pieActividad{
    display: flex;
    padding: 4em;
    align-items: center;
    justify-content: center;
  }
  .botonHora{
    background-color: #ffffff;
    color: #110501;
    cursor: pointer;
    padding: 1em;
    height: 3em;
    width: 6em;
    font-size: large;
    border-color: #110501;
    border-width: 0.1em;
    border-style: solid;
    border-radius: 15em;
  }
  .botonHora:hover{
    background-color: #110501;
    color: #ffffff;
  }
  .botonHora.activo{
    background-color: #110501;
    color: #ffffff;
  }
  .overlay{
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content:center;
    align-items: center;
    z-index: 9999;
  }
  .botonCerrar{
    width: 2.5em;
    height: 2.5em;
    margin-left: 1em;
    cursor: pointer;
    background-image: url("../assets/botonCerrar.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .botonCerrar2{
    width: 2.5em;
    height: 2.5em;
    margin-left: 1em;
    margin-top:1em;
    cursor: pointer;
    background-image: url("../assets/botonCerrar.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .fotoAdopcion{
    background-image: url("../assets/perroAdopta.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 20em;
    width: 10em;
  }
  .botonCerrar:hover{
    transform: scale(1.1);
  }
  .cabeceraModal2{
    align-items: start;
    display: flex;
    flex-direction: row;
    margin-left: 1.5em;
    margin-right: 1.5em;
    margin-top: 1.5em;
    background-image: url(../assets/perroGato.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 20em;
    width: 47em;
    border-radius:1.5em;
  }
  .cabeceraModal{
    align-items: start;
    display: flex;
    flex-direction: row;
    margin-left: 1.5em;
    margin-right: 1.5em;
    margin-top: 1em;
  }
  .modal{
    background-color: #fcfcfc;
    border-radius: 2em;
    width: 50em;
    height: 50em;
    display: flex;
    flex-direction: column;
  }
  .modal2{
    background-color: #fcfcfc;
    border-radius: 2em;
    width: 40%;
    height: 40%;
    display: flex;
    flex-direction: column;
  }
  .descripcion{
    display:flex;
    align-items: center;
    text-align: center;
    padding-left: 1.5em;
    padding-right: 1.5em;
    margin-top: -2.5em;
    gap:4em;
  }
  .descripcion2{
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-left: 1.5em;
    padding-right: 1.5em;
    gap:2em;
  }
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
    height: 450px;
    overflow-y: auto;
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
    height: 2.5em;
    background-color: #eec699;
    color: #110501;
    border-radius: 15em;
    width: 10em;
    font-size: medium;
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
  .botonSecundario:hover{
    background-color: #110501;
    color: #ffffff;
    height: 3em;
    padding: 1em;
    border-radius: 15em;
    cursor: pointer;
    font-size: large;
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
  .texto2{
    color: #110501;
    font-weight: 100;
    width: 19em;
    text-align: center;
    font-weight:500;
    font-size: xx-large
  }
  .texto4{
    color: #110501;
    font-weight: 100;
    width: 25em;
    text-align: center;
    font-weight:500;
    font-size: xx-large
  }
  .texto3{
    color: #110501;
    font-weight: 100;
    width: 28em;
    padding-left: 2em;
    text-align: left;
  }
   .texto5{
    color: #110501;
    font-weight: 100;
    width: 28em;
    padding-left: 2em;
    text-align: center;
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
    height: 295px;
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