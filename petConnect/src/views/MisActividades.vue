<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const mostrarModalAdoptar = ref(false)
    const abrirModalAdoptar = ()=>{
      mostrarModalAdoptar.value = true
    }
    const cerrarModalAdoptar = ()=>{
      mostrarModalAdoptar.value = false
    }
    const mostrarModalCerrar = ref(false)
    const abrirModalCerrar = ()=>{
      mostrarModalCerrar.value = true
    }
    const cerrarModalCerrar = ()=>{
      mostrarModalCerrar.value = false
    }
    const nombre = ref("Usuario");
    onMounted(() =>{
      const nombreGuardado = localStorage.getItem("nombreUsuario");
      if(nombreGuardado){
        nombre.value= nombreGuardado;
        cargarMisActividades();
      }
    })
    const cargarMisActividades = async()=>{
      try{
        const idUsuario = localStorage.getItem("idUsuario");
        if (!idUsuario) return;
        const respuesta = await axios.get(`http://localhost:3000/api/mis-actividades/:usuarioId/${idUsuario}`);
        actividades.value = respuesta.data;
      }
      catch(error){
        console.log("Error al traer mis actividades: ",error);
      }
    }
    const actividades = ref([])
</script>

<template>
  <div class="contenedor">
    <div class="bloqueArriba">
      <div class="usuario"  @click="abrirModalCerrar()">
        <img src="../assets/huella.png" class="iconoU">
        <div>{{nombre}}</div>
      </div>
      <img src="../assets/logoBlanco.png" class="logo">
      <div class="redesSociales2">
        <div id="icono1" class="icono"></div>
        <div id="icono2" class="icono"></div>
        <div id="icono3" class="icono"></div>
      </div>
    </div>
    <div class="bloqueBotones">
      <button class="botonSecundario" @click="$router.push('/paginaUsuario')">Nuevas Actividades</button>
      <button class="botonPrimario2">Mis Actividades</button>
      <button class="botonSecundario" @click="abrirModalAdoptar()">Adoptar</button>
    </div>
    <div class="bloqueActividades">
      <div v-for="actividad in actividades" :key="actividad._id" class="tarjeta">
        <div class="tarjetaSub">
          <h2 class="texto">{{ actividad.nombre }}</h2>
          <div class="editar">
            <div id="icono4"></div>
          </div>
        </div>
        <p class="texto">{{ actividad.descripcion }}</p>
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
  <div class="modalCerrarSesion">
      <div v-if="mostrarModalCerrar" class="overlay2" @click.self="cerrarModalCerrar">
        <div class="modal3">
            <h2 class="texto5">Mi cuenta</h2>
          <div class="descripcion">
            <button class="botonPrimario3" @click="$router.push('/login')">Cerrar Sesión</button>
          </div>
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
  .modal2{
    background-color: #fcfcfc;
    border-radius: 2em;
    width: 40%;
    height: 40%;
    display: flex;
    flex-direction: column;
  }
  .modal3{
    background-color: #fcfcfc;
    border-radius: 2em;
    width: 15%;
    height: 15%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: -43em;
    margin-left: 2em;
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
  .overlay2{
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.13);
    display: flex;
    justify-content:left;
    align-items: center;
    z-index: 9999;
  }
  .texto5{
    color: #110501;
    font-weight: 100;
    width: 19em;
    height: 3em;
    text-align: center;
    font-weight:500;
    font-size: x-large;
  }
  .texto2{
    color: #110501;
    font-weight: 100;
    width: 19em;
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
  .descripcion{
    display:flex;
    align-items: center;
    text-align: center;
    padding-left: 1.5em;
    padding-right: 1.5em;
    margin-top: -2.5em;
    gap:4em;
  }
  .fotoAdopcion{
    background-image: url("../assets/perroAdopta.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 20em;
    width: 10em;
  }
  .cabeceraModal{
    align-items: start;
    display: flex;
    flex-direction: row;
    margin-left: 1.5em;
    margin-right: 1.5em;
    margin-top: 1em;
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
  .editar{
    width: 3em;
    height: 3em;
    align-items: center;
    justify-content: center
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
    align-items: center;
  }
  .usuario{
    display: flex;
    flex-direction: row;
    gap:2em;
    align-items: center;
    margin-left: -5em;
    cursor: pointer;
  }
  .usuario:hover{
    transform: scale(1.05);
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
    height: 2em;
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
  .botonPrimario3{
    height: 2.5em;
    background-color: #110501;
    color: #ffffff;
    border-radius: 15em;
    width: 10em;
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
    cursor: none;
  }
  .botonSecundario:hover{
    background-color: #110501;
    color: #ffffff;
    padding: 1em;
    border-radius: 15em;
    cursor: pointer;
    font-size: large;
  }
  .botonTerciario:hover{
    background-color: #ffffff;
    color: #8a8787;
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
    width: 18em;
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
  #icono4{
    background-image: url("../assets/Edit.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 1em;
    padding: 1em;
    cursor: pointer;
  }
  #icono4:hover{
    transform: scale(1.1);
  }
</style>