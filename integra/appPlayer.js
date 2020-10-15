
  //console.log("app.js OK !!!")

// Your web app's Firebase configuration
  
firebase.initializeApp({
  apiKey: "AIzaSyAbYty3CiZT8PO1x6v2KKozICBx8nyGAUw",
  authDomain: "amigosdelpadel-com-ar.firebaseapp.com",
  databaseURL: "https://amigosdelpadel-com-ar.firebaseio.com",
  projectId: "amigosdelpadel-com-ar",
  storageBucket: "amigosdelpadel-com-ar.appspot.com",
  messagingSenderId: "455570005506",
  appId: "1:455570005506:web:8d153f5413eb7bd9d1511b",
  measurementId: "G-EWDN05NYWY"
  });

  // Initialize Firebase
  var db = firebase.firestore();

  //Agrega un elemento a la collection User
  function guardar(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var lado = document.getElementById('lado').value;
    var fecha = document.getElementById('fecha').value;

    db.collection("users").add({
        first: nombre,
        last: apellido,
        side: lado,
        born: fecha
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('lado').value = '';
        document.getElementById('fecha').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
 
  // Leer Registros
  var tabla = document.getElementById('tabla');
  //Con GET cuando agrego un user NO actualiza en tiempo real.
    //db.collection("users").get().then((querySnapshot) => {
  // Para que actualice en tiempo real se debe reemplazar el GET por Snap
  // ...tambien se debe eliminar el then, para evitar error en interprete
  var f = new Date();
  //document.write(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
  
    db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML='';
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        console.log(`${doc.id} => ${doc.data().first}`);

        tabla.innerHTML += `
          <tr>
            <th scope="row">${doc.id}</th> 
            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().side}</td>
            <td>${doc.data().born}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().side}','${doc.data().born}')">Editar</button></td>
          </tr>
        `
    });
  });

  // ELiminar registros
  //<td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
  function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
      //console.log("id a eliminar: " + id);
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }
  
  //Actualizar registro
  function editar(id, nombre, apellido, lado, fecha){
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('lado').value = lado;
    document.getElementById('fecha').value = fecha;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';
    boton.onclick = function(){
      var washingtonRef = db.collection("users").doc(id);
      // Set the "capital" field of the city 'DC'
      var nombre = document.getElementById('nombre').value
      var apellido = document.getElementById('apellido').value
      var lado = document.getElementById('lado').value
      var fecha = document.getElementById('fecha').value
      return washingtonRef.update({
          //capital: true
          first: nombre,
          last: apellido,
          side: lado,
          born: fecha
      })
      .then(function() {
          console.log("Document successfully updated!");
          document.getElementById('nombre').value = '';
          document.getElementById('apellido').value = '';
          document.getElementById('lado').value = 'Drive';
          document.getElementById('fecha').value = '';
          boton.innerHTML = 'Guardar';
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

    }

  
  }