<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    //Horas disponibles de cada actividad
    const horasDispo = ["09:00","11:00","13:00","17:00","19:00"];
    const horaSeleccionada = ref('');
    const seleccionarHora =(fechaHora)=>{
      horaSeleccionada.value = fechaHora;
    }
    //modales
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
    const mostrarModal = ref(false)
    const actividadSeleccionada = ref(null)
    const abrirModal = (actividad)=>{
      actividadSeleccionada.value = actividad
      mostrarModal.value = true
    }
    const cerrarModal = ()=>{
      mostrarModal.value = false;
      horaSeleccionada.value = null
    }
    const mostrarModalConfirmar = ref(false);
    const abrirConfirmar = () => {
      mostrarModalConfirmar.value = true;
    };
    const cerrarConfirmar = () => {
      mostrarModalConfirmar.value = false;
    };
    const nombre = ref("Usuario");
    //coger el nombre para seguir enseñando arriba en la cabecera
    onMounted(() =>{
      const nombreGuardado = localStorage.getItem("nombreUsuario");
      if(nombreGuardado){
        nombre.value= nombreGuardado;
        cargarMisActividades();
      }
    })
    //listar las actividades en las que estan inscritas
    const cargarMisActividades = async()=>{
      try{
        const email = localStorage.getItem("emailUsuario");
        const respuesta = await axios.get(`http://localhost:3000/api/mis-actividades/${email}`);
        actividades.value = respuesta.data;
      }
      catch(error){
        console.log("Error al traer mis actividades: ",error);
      }
    }
    const actividades = ref([]);
    //buscar la hora a la que se ha apuntado ese usuario en una actividad 
    const cargarFecha = (actividad) => {
      if (!actividad || !actividad.personasApuntadas) return "...";

      const email = localStorage.getItem("emailUsuario");
      for (let i = 0; i < actividad.personasApuntadas.length; i++) {
        const registro = actividad.personasApuntadas[i];
        if (registro.usuarioEmail === email) {
          return registro.hora; 
        }
      }
      return "Sin hora";
    }
    //elimina al usuario de la lista de apuntados de esa actividad
    const cancelarReserva = async()=>{
      const emailUsuario = localStorage.getItem("emailUsuario");
      const actividadId = actividadSeleccionada.value._id;
      try{
        cerrarConfirmar();
        cerrarModal();
        router.push('/paginaUsuario');
        await axios.delete("http://localhost:3000/api/actividades/cancelar", {
          data: { actividadId, email: emailUsuario }
        });
        console.log("Reserva cancelada.");
        
      }
      catch(error){
        console.log("Error al cancelar:", error);
      }
    }
    const actualizarHora = async()=>{
      const emailUsuario = localStorage.getItem("emailUsuario");
      const actividadId = actividadSeleccionada.value._id;
      try{
        await axios.put("http://localhost:3000/api/actividades/actualizarHora", {
          actividadId,
          email: emailUsuario,
          nuevaHora: horaSeleccionada.value
        });
        console.log("Hora cambiada!");
        cerrarModal();
        await cargarMisActividades();
      }
      catch(error){
        console.log("Error al actualizar:", error);
      }
    }
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
            <div id="icono4" @click="abrirModal(actividad)"></div>
          </div>
        </div>
        <div class="bloqueFecha">
          <p class="textoFecha">Fecha: {{ new Date(actividad.fechaHora).toLocaleDateString() }}</p>
          <p class="textoFecha">Hora: {{ cargarFecha(actividad) }} </p>
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
  <div class="modalActividad">
      <div v-if="mostrarModal" class="overlay" @click.self="cerrarModal">
        <div class="modal">
          <div class="cabeceraModal2">
            <div @click="cerrarModal" class="botonCerrar2"></div>
            <button class="botonCancelar" @click="abrirConfirmar">Cancelar Reserva</button>
          </div>
          <h2 class="textoEditar4">{{ actividadSeleccionada?.nombre }}</h2>
          <div class="bloqueFecha2">
            <p class="textoFecha">Fecha: {{ new Date(actividadSeleccionada?.fechaHora).toLocaleDateString() }}</p>
            <p class="textoFecha">Hora: {{ cargarFecha(actividadSeleccionada) }} </p>
          </div>
          <p class="textoEditar5">Cambio de hora:</p>
          <div class="descripcion2">
            <div class="botonesHora">
              <button v-for="hora in horasDispo" :key="hora" :class="['botonHora', { activo: horaSeleccionada === hora }]" @click="seleccionarHora(hora)">{{ hora }}</button>
            </div>
          </div>
          <div class="pieActividad">
            <button class="botonPrimario2" @click="actualizarHora()">Actualizar</button>
          </div>
        </div>
      </div>
  </div>
    <div v-if="mostrarModalConfirmar" class="overlay3">
      <div class="modalConfirmar">
        <h2 class="texto6">¿Estás seguro?</h2>
        <p class="texto6">Vas a cancelar tu reserva para esta actividad. Esta acción no se puede deshacer.</p>
        <div class="bloqueBotones">
          <button class="botonSecundario" @click="cerrarConfirmar">Volver</button>
          <button class="botonCancelar" @click="cancelarReserva">Sí, cancelar</button>
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
  .bloqueFecha{
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: left;
    justify-content: left;
  }
  .modalConfirmar {
    background-color: #fcfcfc;
    color: #110501;
    border-radius: 2em;
    width: 30em;
    padding: 2em;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    gap: 1.5em;
    z-index: 10000;
    box-shadow: 0px 10px 30px rgba(0,0,0,0.3);
  }
  .bloqueFecha2{
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 3em;
    margin-top: -2em;
    padding-left: 1em;
  }
  .botonCancelar{
    height: 3em;
    background-color: #460c0c;
    color: #ffffff;
    border-radius: 15em;
    width: 12em;
    font-size: large;
  }
  .pieActividad{
    display: flex;
    padding: 4em;
    align-items: center;
    justify-content: center;
    margin-top: -1em;
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
  .botonesHora{
    display: flex;
    flex-direction: row;
    gap: 2em;
  }
  .descripcion2{
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-left: 1.5em;
    padding-right: 1.5em;
    margin-top: -2em;
  }
  .texto4{
    color: #110501;
    font-weight: 100;
    width: 25em;
    text-align: center;
    font-weight:500;
    font-size: xx-large
  }
  .textoEditar4{
    color: #110501;
    font-weight: 100;
    width: 25em;
    text-align: center;
    font-weight:500;
    font-size: xx-large;
    margin-top: 1em;
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
  .modal{
    background-color: #fcfcfc;
    border-radius: 2em;
    width: 50em;
    height: 32em;
    gap:1em;
    display: flex;
    flex-direction: column;
  }
  .cabeceraModal2{
    align-items: start;
    display: flex;
    flex-direction: row;
    margin-left: 1.5em;
    margin-right: 1.5em;
    margin-top: 1.5em;
    height: 2em;
    width: 47em;
    gap:30em;
    border-radius:1.5em;
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
    z-index: 999;
  }
  .overlay3{
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content:center;
    align-items: center;
    z-index: 10000;
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
  .textoEditar5{
    color: #110501;
    font-weight: 100;
    height: 2em;
    text-align: left;
    font-weight:500;
    font-size: large;
    margin-top: -2em;
    padding-left: 3.5em;
    margin-bottom: 2em;
    width: 25em;
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
  .textoFecha{
    color: #110501;
    font-weight: 100;
    width: 10em;
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