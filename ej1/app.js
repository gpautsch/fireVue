function registrar (){
    //console.log('Diste un clic')
    var email = document.getElementById('email').value;
    var clave = document.getElementById('clave').value;
    console.log(email);
    console.log(clave);
    firebase.auth().createUserWithEmailAndPassword(email, clave)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
        
        // ...
      });email-clave.html
}

function ingresar (){

  var email = document.getElementById('email2').value;
  var clave = document.getElementById('clave2').value;
  firebase.auth().signInWithEmailAndPassword(email, clave)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ...
  });email-clave.html
  
  
}

function observador (){


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('Existe usuario activo');
      aparece();
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      console.log('ERROR en Login');
      // ...
    }
  });email-clave.html
  
}

function aparece(){
  var contenido = document.getElementById('contenido');
  contenido.innerHTML = `<p>Bienvenido!</p>
  <p>"Contenido SOLO para usuarios ACTIVOS"</p>
  <button onclick="cerrar()">Cerrar Sesión</button>
  
  `
}

function cerrar(){
  firebase.auth().signOut()
  .then(function(){
    console.log("Saliendo....")
  })
  .catch(function(error){
    console.log(error)
  })
}

observador();
