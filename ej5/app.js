
  //console.log("app.js OK !!!")

// Your web app's Firebase configuration
  firebase.initializeApp({
    apiKey: "AIzaSyBF58qHN4rN3OYJFT9jxiYZoZsfhh0PcH4",
    authDomain: "reserva-sala-virtual-fceqyn.firebaseapp.com",
    databaseURL: "https://reserva-sala-virtual-fceqyn.firebaseio.com",
    projectId: "reserva-sala-virtual-fceqyn",
    storageBucket: "reserva-sala-virtual-fceqyn.appspot.com",
    messagingSenderId: "836414346193",
    appId: "1:836414346193:web:3473f169d7fce8cb88c6f0",
    measurementId: "G-213YLBB1LC"
  });

  // Initialize Firebase
  var db = firebase.firestore();

  //Agrega un elemento a la collection User
  function guardar(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;

    db.collection("users").add({
        first: nombre,
        last: apellido,
        born: fecha
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
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
            <td>${doc.data().born}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
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
  function editar(id, nombre, apellido, fecha){
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';
    boton.onclick = function(){
      var washingtonRef = db.collection("users").doc(id);
      // Set the "capital" field of the city 'DC'
      var nombre = document.getElementById('nombre').value
      var apellido = document.getElementById('apellido').value
      var fecha = document.getElementById('fecha').value
      return washingtonRef.update({
          //capital: true
          first: nombre,
          last: apellido,
          born: fecha
      })
      .then(function() {
          console.log("Document successfully updated!");
          document.getElementById('nombre').value = '';
          document.getElementById('apellido').value = '';
          document.getElementById('fecha').value = '';
          boton.innerHTML = 'Guardar';
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

    }

  
  }
  






