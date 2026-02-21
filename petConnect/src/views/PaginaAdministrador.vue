<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const nombreActividad = ref('');
    const descripcion = ref('');
    const fecha = ref('');
    const plazas = ref('');
    const horas = ["09:00","11:00","13:00","17:00","19:00"];
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
    const mostrarModal2 = ref(false)
    const actividadSeleccionada = ref(null)
    const abrirModal = (actividad)=>{
      //Cargar datos para que se vea la info al intentar editar
      actividadSeleccionada.value = actividad
      nombreActividad.value = actividad.nombre;
      descripcion.value = actividad.descripcion;
      plazas.value = actividad.plazas;
      
      // Formatear la fecha
      if (actividad.fecha) {
        fecha.value = new Date(actividad.fecha).toISOString().split('T')[0];
      }
      mostrarModal.value = true
    }
    const abrirModal2 = (actividad)=>{
      //Cargar datos para que se vea la info al intentar editar
      actividadSeleccionada.value = actividad
      nombreActividad.value = actividad.nombre;
      descripcion.value = actividad.descripcion;
      plazas.value = actividad.plazas;
      
      // Formatear la fecha
      if (actividad.fecha) {
        fecha.value = new Date(actividad.fecha).toISOString().split('T')[0];
      }
      mostrarModal2.value = true
    }
    const cerrarModal = ()=>{
      mostrarModal.value = false;
      nombreActividad.value = '';
      descripcion.value = '';
      fecha.value = '';
      plazas.value = '';
    }
    const cerrarModal2 = ()=>{
      mostrarModal2.value = false;
      nombreActividad.value = '';
      descripcion.value = '';
      fecha.value = '';
      plazas.value = '';
    }
    const modalCrearActividades = ref(false);
    const abrirModalCrear = ()=>{
      modalCrearActividades.value = true
      nombreActividad.value = '';
      descripcion.value = '';
      fecha.value = '';
      plazas.value = '';
    }
    const cerrarModalCrear = ()=>{
      modalCrearActividades.value = false
    }
    const mostrarModalConfirmar = ref(false);
    const abrirConfirmar = () => {
      mostrarModalConfirmar.value = true;
    };
    const cerrarConfirmar = () => {
      mostrarModalConfirmar.value = false;
    };
    const cargarActividades = async () => {
      try {
        const respuesta = await axios.get("http://localhost:3000/api/actividades");
        actividades.value = respuesta.data;
      } catch (error) {
        console.error("Error al traer actividades:", error);
      }
    };
    const nombre = ref("Usuario");
    onMounted(() =>{
      const nombreGuardado = localStorage.getItem("nombreUsuario");
      if(nombreGuardado){
        nombre.value= nombreGuardado;
      }
      cargarActividades();
    })
    const actividades = ref([]);
    const registrar = async () => {
      try {
        const nuevaActividad = {
          nombre: nombreActividad.value,
          descripcion: descripcion.value,
          fechaHora: fecha.value,
          plazas: plazas.value
        };

        const respuesta = await axios.post("http://localhost:3000/api/actividades/crear", nuevaActividad);
        
        console.log("Actividad creada:", respuesta.data);
        
        cerrarModalCrear();
        await cargarActividades();
        
      } 
      catch (error) {
        console.error("Error al crear la actividad:", error);
      }
    }
    const actualizar = async()=>{
      try{
        const id = actividadSeleccionada.value._id;
        cerrarModalCerrar();
        const respuesta = await axios.put(`http://localhost:3000/api/actividades/actualizar/${id}`,{
          nombre: nombreActividad.value,
          descripcion: descripcion.value,
          fecha: fecha.value,
          plazas: plazas.value,
        });
        console.log("Actividad actualizada:", respuesta.data);
        await cargarActividades();
        nombreActividad.value = '';
        descripcion.value = '';
        fecha.value = '';
        plazas.value = '';

      }
      catch (error) {
        console.log("Error al guardar la actividad", error);
      }
    }
    const eliminarActividad = async()=>{
      const id = actividadSeleccionada.value._id;
      const actividadId = actividadSeleccionada.value._id;
      try{
        await axios.delete(`http://localhost:3000/api/actividades/eliminar/${id}`, {
          data: { actividadId}
        });
        console.log("Actividad eliminada.");
        cerrarConfirmar();
        cerrarModal();
        await cargarActividades();
        
      }
      catch(error){
        console.log("Error al eliminar:", error);
      }
    }
    const personasHora = (hora) =>{
      if (!actividadSeleccionada.value || !actividadSeleccionada.value.personasApuntadas) return [];
      return actividadSeleccionada.value.personasApuntadas.filter(p => p.hora === hora);
    }
</script>

<template>
  <div class="contenedor">
    <div class="bloqueArriba">
      <div class="usuario"  @click="abrirModalCerrar()">
        <img src="../assets/huella.png" class="iconoU">
        <div>Admin</div>
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
      <button class="botonSecundario" @click="abrirModalCrear">Crear Actividades</button>
      <button class="botonSecundario" @click="abrirModalAdoptar()">Adoptar</button>
    </div>
    <div class="bloqueActividades">
      <div v-for="actividad in actividades" :key="actividad._id" class="tarjeta">
        <div class="tarjetaSub">
          <h2 class="texto">{{ actividad.nombre }}</h2>
          <div class="editar">
            <div id="icono4" @click="abrirModal(actividad)"></div>
            <div id="icono5" @click="abrirModal2(actividad)"></div>
          </div>
        </div>
        <p class="texto5">{{ actividad.descripcion }}</p>
        <div class="bloqueFecha">
          <p class="textoFecha">Fecha: {{ new Date(actividad.fechaHora).toLocaleDateString() }}</p>
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
            <h2 class="texto6">Mi cuenta</h2>
          <div class="descripcion">
            <button class="botonPrimario3" @click="$router.push('/login')">Cerrar Sesión</button>
          </div>
        </div>
      </div>
  </div>
  <div class="modalCrearActividades">
      <div v-if="modalCrearActividades" class="overlay" @click.self="cerrarModalCrear">
        <div class="modal4">
          <div class="cabeceraModal">
            <div @click="cerrarModalCrear" class="botonCerrar"></div>
            <div class="formulario">
              <h2 class="texto2">Nueva Actividad</h2>
              <input class="correo" type="text" placeholder="Nombre de la actividad" v-model="nombreActividad">
              <input class="correo" type="text" placeholder="Descripción de la actividad" v-model="descripcion">
              <input class="campoFecha" type="date" placeholder="Fecha del evento" v-model="fecha">
              <input class="correo" type="number" placeholder="Plazas disponibles" v-model="plazas">
              <div class="cajaBoton">
                <button class="botonPrimario2" @click="registrar">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  <div class="modalActividad">
      <div v-if="mostrarModal" class="overlay" @click.self="cerrarModal">
        <div class="modal">
          <div class="cabeceraModal2">
            <div @click="cerrarModal" class="botonCerrar2"></div>
            <button class="botonCancelar" @click="abrirConfirmar">Eliminar Evento</button>
          </div>
          <h2 class="textoEditar4">{{ actividadSeleccionada?.nombre }}</h2>
            <div class="formulario">
              <p class="texto7">Cambiar Datos:</p>
              <input class="correo" type="text" placeholder="Nombre de la actividad" v-model="nombreActividad">
              <input class="correo" type="text" placeholder="Descripción de la actividad" v-model="descripcion">
              <input class="campoFecha" type="date" placeholder="Fecha del evento" v-model="fecha">
              <input class="correo" type="number" placeholder="Plazas disponibles" v-model="plazas">
              <div class="cajaBoton">
              <button class="botonPrimario2" @click="actualizar">Actualizar</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  <div v-if="mostrarModalConfirmar" class="overlay3">
      <div class="modalConfirmar">
        <h2 class="texto6">¿Estás seguro?</h2>
        <p class="texto6">Vas a eliminar la actividad. Esta acción no se puede deshacer.</p>
        <div class="bloqueBotones">
          <button class="botonSecundario" @click="cerrarConfirmar">Volver</button>
          <button class="botonCancelar" @click="eliminarActividad">Sí, eliminar</button>
        </div>
      </div>
  </div>
  <div class="modalActividad2">
      <div v-if="mostrarModal2" class="overlay" @click.self="cerrarModal2">
        <div class="modal5">
          <div class="cabeceraModal2">
            <div @click="cerrarModal2" class="botonCerrar2"></div>
          </div>
          <h2 class="textoEditar4">{{actividadSeleccionada?.nombre}}</h2>
          <p class="texto10">Personas inscritas:</p>
          <div class="inscripcion">
            <div v-for="hora in horas" :key="hora" class="formulario2">
              <div class="cabeceraHora2">
                <p class="texto9">{{ hora }}h</p> 
                <p class="texto9">({{ personasHora(hora).length }} personas)</p>
              </div>
              <ul class="listaPersonas">
                <li v-for="persona in personasHora(hora)" :key="persona.usuarioEmail" class="texto8">
                  {{ persona.usuarioEmail }}
                  <span v-if="persona.estado === 'cancelado_tarde'" class="texto6">   Canceló tarde</span>
                  <span v-else class="texto6">   Confirmado</span>
                </li>
                <li v-if="personasHora(hora).length === 0" class="texto6">
                  No hay inscritos
                </li>
              </ul>
            </div>
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
  .texto10{
    color: #110501;
    text-align: center;
    margin-top: -2em;
  }
  .texto8{
    color: #110501;
    gap: 4em;
    display: flex;
    flex-direction: row;
  }
  .listaPersonas{
    max-height: 5em;
    overflow: hidden;
    overflow-y: auto;
    gap: 1em;
  }
  .cabeceraHora{
    display: flex;
    flex-direction: row;
    gap:1em;
  }
  .cabeceraHora2{
    display: flex;
    flex-direction: row;
    gap:1em;
    background-color: #110501;
    border-radius: 10em;
    height: 3em;

  }
  input[type="date"]{
    background-color: #ffffff;
    color: #110501;
    width: 33.5em;
    height: 3em;
    padding: 1em;
    padding-left: 1.5em;
    padding-right: 1.5em;
    border-radius: 10em;
    border-width: 0.1em;
  }
  input[type="date"]::-webkit-calendar-picker-indicator{
    filter:invert(1);
    cursor:pointer;
  }
  .campoFecha{
    font-family: Arial, Helvetica, sans-serif;
  }
  .cajaBoton{
    margin-top: 1em;
  }
  .formulario{
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
  }
  .formulario2{
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    align-items: center;
  }
  .inscripcion{
    max-height: 27em;
    overflow: hidden;
    overflow-y: auto;
    margin: 1em;
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
    height: 44em;
    gap:1em;
    display: flex;
    flex-direction: column;
  }
  .modal5{
    background-color: #fcfcfc;
    border-radius: 2em;
    width: 50em;
    height: 44em;
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
  .modal4{
    background-color: #fcfcfc;
    border-radius: 2em;
    width: 40%;
    height: 60%;
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
    margin-top: 1em;
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
    text-align: left;
    font-weight:500;
    font-size: large;
  }
  .texto6{
    color: #110501;
    font-weight: 100;
    width: 19em;
    height: 3em;
    text-align: center;
    font-weight:500;
  }
  .texto9{
    color: #e0dbd4;
    font-weight: 100;
    width: 19em;
    height: 3em;
    text-align: center;
    font-weight:500;
  }
  .texto7{
    color: #110501;
    font-weight: 100;
    width: 19em;
    height: 3em;
    text-align: center;
    font-weight:500;
    margin-top: -2em;
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
    height: 450px;
    overflow-y: auto;
  }
  .editar{
    width: 3em;
    height: 3em;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    gap: 1em;
    margin-right: 2em;
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
    max-height: 14em;
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
    border-width: 0.1em;
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
    background-image: url("../assets/perroFondo.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
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
  #icono5{
    background-image: url("../assets/asistencia.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 1em;
    padding: 1em;
    cursor: pointer;
  }
  #icono5:hover{
    transform: scale(1.1);
  }
  #icono4:hover{
    transform: scale(1.1);
  }
</style>