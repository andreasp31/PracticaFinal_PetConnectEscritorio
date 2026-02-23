<script setup>
    import { ref } from 'vue'
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    const email = ref('');
    const clave = ref('');
    const errorMensaje = ref('')
    const router = useRouter();
    //función de login
    const login = async()=>{
      errorMensaje.value = ''
      try{
        const respuesta = await axios.post("http://localhost:3000/api/login",{
          email: email.value,
          clave: clave.value
        });
        //se guarda el nombre en el local y se coge el nombre de la base de datos
        const { token, usuario } = respuesta.data;
        localStorage.setItem("nombreUsuario",respuesta.data.usuario.nombre);
        localStorage.setItem("token",respuesta.data.token);
        localStorage.setItem("roleUsuario", usuario.role);
        localStorage.setItem("emailUsuario", respuesta.data.usuario.email);
        if(usuario.role === "admin"){
          router.push('/paginaAdministrador');
        }
        else{
          router.push('/paginaUsuario');
        }
      }
      catch(error){
        let mensajeFinal = "Error al iniciar sesión";
        if (error.response && error.response.data) {
          const data = error.response.data

          // detectar que el email es incorrecto
          if (data.detalles) {
            const primerCampoConError = Object.keys(data.detalles).find(key => key !== '_errors')
            if (primerCampoConError) {
              mensajeFinal = data.detalles[primerCampoConError]._errors[0]
            }
          } 
          // Si el error viene por credenciales incorrectas  
          else if (data.message) {
            mensajeFinal = data.message
          }
        }
        errorMensaje.value = mensajeFinal
      }
    }
</script>
/*Vista */
<template>
  <div class="contenedor">
    <div class="bloqueIzquierdo">
      <img src="../assets/logoPet.png" class="logo">
      <div class="huecos">
        <h2 class="texto">Iniciar Sesión</h2>
        <input class="correo" type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Introduce tu contraseña" class="correo" v-model="clave" >
      </div>
      <div class="botones">
        <button class="botonPrimario" @click="login">Entrar</button>
        <h3 class="botonSecundario" @click="$router.push('/')">Volver</h3>
      </div>
      <div>
        <h3 class="textoEnlace">Te has olvidado de la contraseña?</h3>
        <h3 class="mensajError">{{ errorMensaje }}</h3>
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
   .mensajError{
    color: #d32f2f;
    font-size: 0.9em;
    text-align: center;
    min-height: 1.2em;
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
    font-size: large;
  }
  button:hover {
    background-color: #110501;
    color: #e0dbd4;
  }
   button:focus,
   button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
        font-size: large;
   }
  .texto{
    color: #110501;
    font-weight: 100;
    width: 28em;
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
    margin-top: -53em;
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