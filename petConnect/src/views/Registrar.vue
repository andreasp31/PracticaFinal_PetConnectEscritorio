<script setup>
    import { ref } from 'vue'
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    const nombre = ref('');
    const apellidos = ref('');
    const email = ref('');
    const clave = ref('');
    const clave2 = ref('');
    const errorMensaje = ref('');
    const router = useRouter();
    const registrar = async()=>{
      errorMensaje.value='';
      try{
        const respuesta = await axios.post("http://localhost:3000/api/registro",{
          nombre: nombre.value,
          apellidos: apellidos.value,
          email: email.value,
          clave: clave.value,
          clave2: clave2.value
        });
        router.push('/login');

      }
      catch (error) {
        let mensajeFinal = "Error al registrar";

        if (error.response && error.response.data) {
            const data = error.response.data;

            // 1. Si usamos el nuevo formato .format() del backend:
            if (data.detalles) {
                // Buscamos el primer error que aparezca en el objeto formateado
                // Zod .format() devuelve algo como { nombre: { _errors: [] } }
                const primerCampoConError = Object.keys(data.detalles).find(key => key !== '_errors');
                if (primerCampoConError) {
                    mensajeFinal = data.detalles[primerCampoConError]._errors[0];
                }
            } 
            // 2. Por si acaso sigue viniendo como mensaje directo
            else if (data.message) {
                mensajeFinal = data.message;
            }
        }

        errorMensaje.value = mensajeFinal;
          }
    }
</script>

<template>
  <div class="contenedor">
    <div class="bloqueIzquierdo">
      <img src="../assets/logoPet.png" class="logo">
      <div class="huecos">
        <h2 class="texto">Registrarse</h2>
        <div class="nombreCompleto">
          <input class="correo" type="text" placeholder="Nombre" v-model="nombre">
          <input class="correo" type="text" placeholder="Apellidos" v-model="apellidos">
        </div>
        <input class="correo" type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Crea una contraseña" class="correo" v-model="clave">
        <input type="password" placeholder="Repite la contraseña" class="correo" v-model="clave2">
      </div>
      <div class="botones">
        <p v-if="errorMensaje" class="mensajError">{{ errorMensaje }}</p>
        <button class="botonPrimario" @click="registrar">Registrarse</button>
        <h3 class="botonSecundario" @click="$router.push('/')">Volver</h3>

      </div>
    </div>
    <div class="bloqueDerecho">
      <img src="../assets/fondoPolaroid.png" class="foto">
    </div>
  </div>
</template>


/*Para que los estilos solo afecten a esta vista */
<style scoped>
  .contenedor{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .huecos{
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    align-items:center;
    width: 60%;
  }
  .mensajError{
    color: #d32f2f;
    font-size: 0.9em;
    text-align: center;
    min-height: 1.2em;
  }
  .botones{
    display: flex;
    flex-direction: column;
    width: 60%;
    align-items: center;
    justify-content: center;
    gap:0.5em;
  }
  .nombreCompleto{
    display: flex;
    flex-direction: row;
    width: 30em;
    gap: 1em;
  }
  .botonPrimario{
    height: 3em;
    background-color: #eec699;
    color: #110501;
    border-radius: 15em;
    width: 13em;
  }
  .botonSecundario{
    background-color: none;
    color: #110501;
    cursor: pointer;
    padding: 1em;
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
    margin-top: -1.5em;
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
  .bloqueIzquierdo{
    display: flex;
    flex-direction: column;
    gap:1.5em;
    align-items: center;
    width: 60%;
    margin-top: 5em;
  }
  .bloqueDerecho{
    margin-top: -54em;
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