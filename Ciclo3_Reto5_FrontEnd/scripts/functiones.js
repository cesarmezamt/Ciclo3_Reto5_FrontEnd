//********************URL**********************/
// Maquina virtual
//var dirurl = "http://129.151.123.222:8080/api/"
// Maquina local
var dirurl ="http://localhost:8080/api/"
//*********************************************/
var estado =""

// funciones de Categoría*****************************************************************************

// trae las categorias creadas para todas las hojas 

function variableCategoria(respuesta){
    $("#relacion-categoria").empty();
    let $varCat = $("#relacion-categoria");
        $.each(respuesta, function (id,catnom) {
        $varCat.append('<option value='+catnom.id+'>'+catnom.name+'</option>');
            console.log("var1 "+catnom.id);
            console.log("var2 "+catnom.name);
            });
    
}

// trae todas las variables de la categoria 

function traerInformacionCategoria(){
    console.log("Funcionando");
    $.ajax({
        //url: "http://129.151.123.222:8080/api/Category/all",
        url: dirurl +"Category/all",
        headers: {'Access-Control-Allow-Origin': '*'},        
        type: "GET",
        datatype: "JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultado1").empty();
            variableCategoria(respuesta)
            mostrarRespuestaCategoria(respuesta);
        }
    });
}

// muestra todas las variables en una tabla  
function mostrarRespuestaCategoria(respuesta){

    //let tabla = "<table class=table-bordered> <thead class=table-info>";
    let tabla = "<table class='table table-striped'> <thead>" ;
    tabla += "<tr>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Nº Categoría"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Nombre"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Descripción"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Borrar"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Modificar"+"</p>"+"</th>";      
    tabla += "</tr></thead>";


    for(i=0; i<respuesta.length; i++) {
        
        tabla += "<tbody><tr>";
            tabla += "<td>"+respuesta[i].id+"</td>";
            tabla += "<td>"+respuesta[i].name+"</td>";
            tabla += "<td>"+respuesta[i].description+"</td>";
            tabla += "<td> <button onclick='borrarElementoCategoria("+respuesta[i].id+")'> <img src='images/cuadrimoto.ico' width='20' height='20'> </button></td>";
    tabla += "<td border-radius: 10px> <button onclick='modificarElementoCategoria("+respuesta[i].id+","+'"'+respuesta[i].name+'"'+","+'"'+respuesta[i].description+'"'+")'><img src='images/cuadrimoto.ico' width='20' height='20'></boton</td>"
        tabla += "</tr></tbody>";
        
    }
    tabla += "</table> ";
    $("#resultado1").append(tabla);

}

// Guarda todas las variables de Categoria

function guardarInformacionCategoria(){
    let datos={
        name:$("#nombreCate").val(),
        description:$("#descripcion").val(),
    };   
        
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(datos),
        //url:"http://129.151.123.222:8080/api/Category/save",
        url:dirurl +"Category/save",
            
        success:function(respuesta) {
            $("#resultado1").empty();
            $("#idCategoria").val("");
            $("#nombreCate").val("");
            $("#descripcion").val("");
            traerInformacionCategoria();
            alert("Se ha guardado correctamente.")        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}
// edita todas las variables de Categoria
function editarInformacionCategoria(){
    let datos={
        id:$("#idCategoria").val(),
        name:$("#nombreCate").val(),
        description:$("#descripcion").val(),
    };   

    $.ajax({
        type:"PUT",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(datos),
        //url:"http://129.151.123.222:8080/api/Category/update",
        url:dirurl +"Category/update",
        success:function(respuesta) {
            $("#resultado1").empty();
            $("#idCategoria").val("");
            $("#nombreCate").val("");
            $("#descripcion").val("");
            traerInformacionCategoria();
            alert("Se ha actualizado.")        
        }
    });
}
// borra todas las variables de Categoria
function borrarElementoCategoria(idElemento){

    $.ajax({
        type:"DELETE",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        //url:"http://129.151.123.222:8080/api/Category/"+ idElemento,
        url:dirurl +"Category/"+ idElemento,
        success:function(respuesta) {
            $("#resultado1").empty();
            $("#idCategoria").val("");
            traerInformacionCategoria();
            alert("Se ha eliminado.")        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se borró correctamente" + " "+ $("#idCategoria").val());
        }

    });
}

// trae todas las variables en contenedor de edicion para modificar
function modificarElementoCategoria(idg,nom,des){
    alert("Se modificará el registro")
    $("#idCategoria").val(idg);
    $("#nombreCate").val(nom);
    $("#descripcion").val(des);

}
// limpia todas las variables en contenedor de edicion
function limpiarElementoCategoria() {
    $("#idCategoria").val("");
    $("#nombreCate").val("");
    $("#descripcion").val("");
}

// funciones de clientes *****************************************************************************

function variableCliente(respuesta){
    $("#relacion-cliente").empty();
    let $varCli = $("#relacion-cliente");
        $.each(respuesta, function (id,cliente) {
        $varCli.append('<option value='+cliente.idClient+'>'+cliente.name+'</option>');
            console.log("clienteId "+cliente.idClient);
            console.log("clienteNom "+cliente.name);
            });
    
}

function traerInformacionCliente(){
    console.log("Funcionando");
    $.ajax({
        //url: "http://129.151.123.222:8080/api/Client/all",
        url: dirurl +"Client/all",
        headers: {'Access-Control-Allow-Origin': '*'},        
        type: "GET",
        datatype: "JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultado3").empty();
            variableCliente(respuesta);
            mostrarRespuestaCliente(respuesta);
        }
    });
}

function mostrarRespuestaCliente(respuesta){

    //let tabla = "<table class=table-bordered > <thead class=table-info>";
    let tabla = "<table class='table table-striped'> <thead>";

    tabla += "<tr>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"IdCliente"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Nombre"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Correo"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Clave"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Edad"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Reservacion"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Cuadrimoto"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Mensaje"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Borrar"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Modificar"+"</p>"+"</th>";
            
    tabla += "</tr></thead>";

    for(i=0; i<respuesta.length; i++) {
        tabla += "<tbody><tr>";
            tabla += "<td>" +respuesta[i].idClient+ "</td>";
            tabla += "<td>" +respuesta[i].name+ "</td>";
            tabla += "<td>" +respuesta[i].email+ "</td>";
            tabla += "<td>" +respuesta[i].password+ "</td>";
            tabla += "<td>" +respuesta[i].age+ "</td>";
            tabla += "<td>" + verificarEstado(respuesta[i].reservations) + "</td>"; //reservacion
            tabla += "<td>" + verificarReCudri(respuesta[i].reservations[i]) + "</td>";//cuadrimoto
            tabla += "<td>" + verificarMensaje(respuesta[i].reservations[i]) + "</td>";//mensaje
            tabla += "<td> <button onclick='borrarElementoCliente("+respuesta[i].idClient+")'> <img src='images/cuadrimoto.ico' width='20' height='20'> </button></td>";
            tabla += "<td> <button onclick='modificarElementoCliente("+respuesta[i].idClient+","+'"'+respuesta[i].name+'"'+","+'"'+respuesta[i].email+'"'+","+'"'+respuesta[i].password+'"'+","+'"'+respuesta[i].age+'"'+")'> <img src='images/cuadrimoto.ico' width='20' height='20'></button></td>"
        tabla += "</tr></tbody>";
    }

    //tabla += "</thead> </table> ";
    tabla += "</table> ";
    $("#resultado3").append(tabla);
}
function verificarReCudri(respuesta){
    console.log("cuadrimoto "+ respuesta);
    if (!respuesta){
        estado="--"
    }
    else estado=respuesta.quadbike.name
    return estado;

}
function verificarMensaje(respuesta){

    if (!respuesta){
        estado="--"
    }
    else estado=respuesta.messageText
    return estado;

}

function guardarInformacionCliente(){
    let datos={
        name:$("#nombre").val(),
        email:$("#correo").val(),
        password:$("#clave").val(),
        age:$("#edad").val()
    };   
        
    $.ajax({
        type:"POST",
        contentType: "application/JSON; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(datos),
        //url:"http://129.151.123.222:8080/api/Client/save",
        url:dirurl +"Client/save",
        success:function(respuesta) {
            $("#nombre").val("");
            $("#correo").val("");
            $("#clave").val("");
            $("#edad").val("");
            traerInformacionCliente();
            alert("Se ha guardado.")        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}

function editarInformacionCliente(){
    let datos={
        idClient:$("#idCliente").val(),
        name:$("#nombre").val(),
        email:$("#correo").val(),
        password:$("#clave").val(),
        age:$("#edad").val(),
        };   
    $.ajax({
        type:"PUT",
        contentType: "application/JSON; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(datos),
        //url:"http://129.151.123.222:8080/api/Client/update",
        url:dirurl +"Client/update",
        success:function(respuesta) {
            $("#idCliente").val("");
            $("#nombre").val("");
            $("#correo").val("");
            $("#clave").val("");
            $("#edad").val("");
            traerInformacionCliente();
            alert("Se ha actualizado.")        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}

function borrarElementoCliente(idElemento){
    
    $.ajax({
        type:"DELETE",
        contentType: "application/JSON; charset=utf-8",
        datatype:"JSON",
        //url:"http://129.151.123.222:8080/api/Client/"+ idElemento,
        url:dirurl +"Client/"+ idElemento,

        success:function(respuesta) {
            $("#resultado3").empty();
            traerInformacionCliente();
            alert("Se ha eliminado.")        
        }
    });
}

function modificarElementoCliente(idt,not,cor,cla,eda){
    alert("Se modificará el registro")
    $("#idCliente").val(idt);
    $("#nombre").val(not);
    $("#correo").val(cor);
    $("#clave").val(cla);
    $("#edad").val(eda);
}

function limpiarElementoCliente() {
    $("#idCliente").val("");
    $("#nombre").val("");
    $("#correo").val("");
    $("#clave").val("");
    $("#edad").val("");
    $("#resultado3").empty(); 
}

// funciones de cuatrimotos***************************************************************************

function variableCuadri(respuesta){
    $("#relacion-cuadrimoto").empty();
    let $varCua = $("#relacion-cuadrimoto");
        $.each(respuesta, function (id,cuadri) {
        $varCua.append('<option value='+cuadri.id+'>'+cuadri.name+'</option>');
            console.log("var1 "+cuadri.id);
            console.log("var2 "+cuadri.name);
            });
    
}

function traerInformacionCuadri(){
    console.log("Funcionando");
    $.ajax({
        //url: "http://129.151.123.222:8080/api/Quadbike/all",
        url: dirurl +"Quadbike/all",
        headers: {'Access-Control-Allow-Origin': '*'},        
        type: "GET",
        datatype: "JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultado2").empty();
            mostrarRespuestaCuadri(respuesta);
            traerInformacionCategoria();
            variableCuadri(respuesta);
            limpiarElementoCuadri();
        }
    });
}

function mostrarRespuestaCuadri(respuesta){
    //let tabla = "<table style='width:10%' class='z-depth-1'>";
    let tabla = "<table class='table table-striped'> <thead>";
    tabla += "<tr>";
            tabla += "<th>"+"IdCuadri"+"</th>";
            tabla += "<th>"+"Nombre"+"</th>";
            tabla += "<th>"+"Marca"+"</th>";
            tabla += "<th>"+"Año"+"</th>";
            tabla += "<th>"+"Descripción"+"</th>";
            tabla += "<th>"+"Categoría"+"</th>";
            tabla += "<th>"+"Reservada"+"</th>";
            tabla += "<th>"+"Borrar"+"</th>";
            tabla += "<th>"+"Modificar"+"</th>";
    tabla += "</tr></thead>";
    
    for(i=0; i<respuesta.length; i++) {
        
        tabla += "<tbody><tr>";
            tabla += "<td>" + respuesta[i].id + "</td>";
            tabla += "<td>" + respuesta[i].name + "</td>";
            tabla += "<td>" + respuesta[i].brand + "</td>";
            tabla += "<td>" + respuesta[i].year + "</td>";
            tabla += "<td>" + respuesta[i].description + "</td>";
            tabla += "<td>" + respuesta[i].category.name + "</td>";
            tabla += "<td>" + verificarEstado(respuesta[i].reservations) + "</td>";
            tabla += "<td> <button onclick='borrarElementoCuadri("+respuesta[i].id+")'> <img src='images/cuadrimoto.ico' width='20' height='20'> </button></td>";
            tabla += "<td> <button onclick='modificarElementoCuadri("+respuesta[i].id+","+'"'+respuesta[i].name+'"'+","+'"'+respuesta[i].brand+'"'+","+'"'+respuesta[i].year+'"'+","+'"'+respuesta[i].description+'"'+","+'"'+respuesta[i].category.id+'"'+")'> <img src='images/cuadrimoto.ico' width='20' height='20'></button></td>"
        tabla += "</tr></tbody>";
    }
    tabla += "</table>";
    $("#resultado2").append(tabla);
}

function guardarInformacionCuadri(){
    let datos={
        id:$("#idCuadri").val(),
        name:$("#nombre").val(),
        brand:$("#marca").val(),
        year:$("#año").val(),
        description:$("#descripcion").val(),
        category: {id:+$("#relacion-categoria").val()},
    };   
    console.log(datos);   
    $.ajax({
        type:"POST",
        contentType: "application/JSON; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(datos),
        //url:"http://129.151.123.222:8080/api/Quadbike/save",
        url:dirurl +"Quadbike/save",

        success:function(respuesta) {
            $("#idCuadri").val("");
            $("#nombre").val("");
            $("#marca").val("");
            $("#año").val("");
            $("#descripcion").val("");
            traerInformacionCuadri();
            alert("Se ha guardado.")        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}

function editarInformacionCuadri(){
    
    let datos={
        id:$("#idCuadri").val(),
        name:$("#nombre").val(),
        brand:$("#marca").val(),
        year:$("#año").val(),
        description:$("#descripcion").val(),
        category: {id:+$("#relacion-categoria").val()},
    };   

    $.ajax({
        type:"PUT",
        contentType: "application/JSON; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(datos),
        //url:"http://129.151.123.222:8080/api/Quadbike/update",
        url:dirurl + "Quadbike/update",
        success:function(respuesta) {
            $("#idCuadri").val("");
            $("#nombre").val("");
            $("#marca").val("");
            $("#año").val("");
            $("#descripcion").val("");
            $("#relacion-categoria").val("");
            alert("Se ha actualizado.");
            traerInformacionCuadri();        
        }
    });
}

function borrarElementoCuadri(idElemento){
    $.ajax({
        type:"DELETE",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        //url:"http://129.151.123.222:8080/api/Quadbike/"+ idElemento,
        url:dirurl + "Quadbike/"+ idElemento,
        success:function(respuesta) {
            $("#resultado2").empty();
            traerInformacionCuadri();
            alert("Se ha eliminado.")        
        }
    });
}

function modificarElementoCuadri(idc, nom, mar, ano, dec, catid){
    alert("Se modificará el registro")
    $("#idCuadri").val(idc);
    $("#nombre").val(nom);
    $("#marca").val(mar);
    $("#año").val(ano);
    $("#descripcion").val(dec);
    $("#relacion-categoria").val(catid);

}
function limpiarElementoCuadri() {
    $("#idCuadri").val("");
    $("#nombre").val("");
    $("#marca").val("");
    $("#año").val("");
    $("#descripcion").val("");
    $("#relacion-categoria").val("");     
}

// funciones de Mensajes*********************************************************************************

function traerInformacionMensaje(){
    console.log("Funcionando");
    $.ajax({
        //url: "http://129.151.123.222:8080/api/Message/all",
        url: dirurl +"Message/all",
        headers: {'Access-Control-Allow-Origin': '*'},        
        type: "GET",
        datatype: "JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultado4").empty();
            traerInformacionCliente();
            traerInformacionCuadri();
            mostrarRespuestaMensaje(respuesta);
            limpiarElementoMensaje();
        }
    });
}

function mostrarRespuestaMensaje(respuesta){

    //let tabla = "<table class='table table-striped'> <thead>";
    let tabla = "<table> <thead>";
    tabla += "<tr>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"idMensajes"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Mensajes"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Cliente"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Cuadrimoto"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Borrar"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Modificar"+"</p>"+"</th>";
    tabla += "</tr></thead>";
    
    for(i=0; i<respuesta.length; i++) {

        tabla += "<tbody><tr>";
            tabla += "<td>" + respuesta[i].idMessage + "</td>";
            tabla += "<td>" + respuesta[i].messageText + "</td>";
            tabla += "<td>" + verificarMenClie(respuesta[i].client) + "</td>";
            tabla += "<td>" + verificarMenCudri(respuesta[i].quadbike) + "</td>";
            tabla += "<td> <button onclick='borrarElementoMensaje("+respuesta[i].idMessage+")'> <img src='images/cuadrimoto.ico' width='20' height='20'> </button></td>";
            tabla += "<td> <button onclick='modificarElementoMensaje("+respuesta[i].idMessage+","+'"'+respuesta[i].messageText+'"'+","+'"'+respuesta[i].client.idClient+'"'+","+'"'+respuesta[i].quadbike.id+'"'+")'> <img src='images/cuadrimoto.ico' width='20' height='20'></button></td>"
        tabla += "</tr></tbody>";
    }
    tabla += "</table> ";
    $("#resultado4").append(tabla);
    alert(tabla);
}

function verificarMenClie(respuesta){
    if (!respuesta){
        estado="--"
    }
    else estado=respuesta.name
    return estado;
}

function verificarMenCudri(respuesta){
    if (!respuesta){
        estado="--"
        console.log("aqui" + respuesta);
    }
    else estado=respuesta.name
    return estado;
}

function guardarInformacionMensaje(){
    let datos={
        idMessage:$("#idMensajes").val(),
        messageText:$("#texMensaje").val(),
        client: {idClient:+$("#relacion-cliente").val()},
        quadbike: {id:+$("#relacion-cuadrimoto").val()},
    };   
        
    $.ajax({
        type:"POST",
        contentType: "application/JSON; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(datos),
        //url:"http://129.151.123.222:8080/api/Message/save",
        url:dirurl + "Message/save",

        success:function(respuesta) {
            $("#idMensajes").val("");
            $("#texMensaje").val("");
            traerInformacionMensaje();
            alert("Se ha guardado.");       
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}

function editarInformacionMensaje(){
    let datos={
        idMessage:$("#idMensajes").val(),
        messageText:$("#texMensaje").val(),
        client: {idClient:+$("#relacion-cliente").val()},
        quadbike: {id:+$("#relacion-cuadrimoto").val()},
    };   
        
    $.ajax({
        type:"PUT",
        contentType: "application/JSON; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(datos),
        //url:"http://129.151.123.222:8080/api/Message/update",
        url:dirurl + "Message/update",
        success:function(respuesta) {
            $("#idMensajes").val("");
            $("#texMensaje").val("");
            alert("Se ha actualizado.");
            traerInformacionMensaje();        
        }
    });
}

function borrarElementoMensaje(idElemento){
    $.ajax({
        type:"DELETE",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        //url:"http://129.151.123.222:8080/api/Quadbike/"+ idElemento,
        url:dirurl + "Message/"+ idElemento,
        success:function(respuesta) {
            $("#resultado4").empty();
            traerInformacionMensaje();
            alert("Se ha eliminado.");     
        }
    });
}

function modificarElementoMensaje(idMen, men,idCli,idCua){
    alert("Se modificará el registro")
    $("#idMensajes").val(idMen);
    $("#texMensaje").val(men);
    $("#relacion-cliente").val(idCli);
    $("#relacion-cuadrimoto").val(idCua)


}
function limpiarElementoMensaje() {
    $("#idMensajes").val("");
    $("#texMensaje").val("");
    $("#nomCliente").val("");
    $("#nomCuadrimoto").val("");
    $("#idCliente").val("");
    $("#idCuadrimoto").val("");
    $("#relacion-cliente").val("");
    $("#relacion-cuadrimoto").val("");
    $("#resultado4").empty();
    
}

// funciones de Reservas*********************************************************************************

function traerInformacionReserva(){
    $.ajax({
        //url: "http://129.151.123.222:8080/api/Reservation/all",
        url: dirurl + "Reservation/all",
        headers: {'Access-Control-Allow-Origin': '*'},        
        type: "GET",
        datatype: "JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultado5").empty();
            traerInformacionCliente();
            traerInformacionCuadri();
            mostrarRespuestaReserva(respuesta);
        }
    });
    limpiarElementoReserva();
}

function mostrarRespuestaReserva(respuesta){

    let tabla = "<table class='table table-striped'> <thead>";
    tabla += "<tr>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Nº Reservación"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Fecha Entrega"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Fecha Devolución"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Estado"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Cliente"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Cuadrimoto"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Categoría"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Borrar"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Modificar"+"</p>"+"</th>";
    tabla += "</tr></thead>";

    
    for(i=0; i<respuesta.length; i++) {

        tabla += "<tbody><tr>";
            tabla += "<td>" + respuesta[i].idReservation + "</td>";
            tabla += "<td>" + cnvFecha(respuesta[i].startDate) + "</td>";
            tabla += "<td>" + cnvFecha(respuesta[i].devolutionDate) + "</td>";
            tabla += "<td>" + respuesta[i].status + "</td>";
            tabla += "<td>" + verificarResClie(respuesta[i].client) + "</td>";
            tabla += "<td>" + verificarResCudri(respuesta[i].quadbike) + "</td>";
            tabla += "<td>" + verificarResCudCat(respuesta[i].quadbike) + "</td>";
            tabla += "<td> <button onclick='borrarElementoReserva("+respuesta[i].idReservation+")'> <img src='images/cuadrimoto.ico' width='20' height='20'> </button></td>";
            tabla += "<td> <button onclick='modificarElementoReserva("+respuesta[i].idReservation+","+'"'+cnvFecha(respuesta[i].startDate)+'"'+","+'"'+cnvFecha(respuesta[i].devolutionDate)+'"'+","+'"'+respuesta[i].client.idClient+'"'+","+'"'+respuesta[i].quadbike.id+'"'+")'> <img src='images/cuadrimoto.ico' width='20' height='20'></button></td>"
        tabla += "</tr></tbody>";
    }
    tabla += "</table> ";
    $("#resultado5").append(tabla);
    
}

function cnvFecha(fecha){
    return fecha.substring(0,10);
}

function verificarResClie(respuesta){
    if (!respuesta){
        estado="--"
    }
    else estado=respuesta.name
    return estado;
}

function verificarResCudri(respuesta){
    if (!respuesta){
        estado="--"
    }
    else estado=respuesta.name
    return estado;
}

function verificarResCudCat(respuesta){
    if (!respuesta){
        estado="--"
    }
    else estado=respuesta.category.name
    return estado;
}

function guardarInformacionReserva(){
    let datos={
        idReservation:$("#idReservacion").val(),
        startDate:$("#fechaInicio").val(),
        devolutionDate:$("#fechaDevo").val(),
        status:"created",
        client: {idClient:+$("#relacion-cliente").val()},
        quadbike: {id:+$("#relacion-cuadrimoto").val()},

    };   
    console.log(datos);
    $.ajax({
        type:"POST",
        contentType: "application/JSON; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(datos),
        //url:"http://129.151.123.222:8080/api/Reservation/save",
        url:dirurl + "Reservation/save",
        success:function(respuesta) {
            $("#fechaInicio").val("");
            $("#fechaDevo").val("");
            alert("Se ha guardado.");
            traerInformacionReserva();
            limpiarElementoReserva();     
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}

function editarInformacionReserva(){

    let datos={
        idReservation:$("#idReservacion").val(),
        startDate:$("#fechaInicio").val(),
        devolutionDate:$("#fechaDevo").val(),
        status:"created",
        client: {idClient:+$("#relacion-cliente").val()},
        quadbike: {id:+$("#relacion-cuadrimoto").val()},
    };   
    
    console.log(datos);
    
    $.ajax({
        type:"PUT",
        contentType: "application/JSON; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(datos),
        //url:"http://129.151.123.222:8080/api/Reservation/update",
        url:dirurl + "Reservation/update",
        success:function(respuesta) {
            traerInformacionReserva();
            alert("Se ha actualizado.");
            limpiarElementoReserva();
        },
    });
}

function borrarElementoReserva(idElemento){
    $.ajax({
        type:"DELETE",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        //url:"http://129.151.123.222:8080/api/Reservation/"+ idElemento,
        url:dirurl + "Reservation/"+ idElemento,
        success:function(respuesta) {
            $("#resultado5").empty();
            traerInformacionCuadri();
            traerInformacionReserva();
            alert("Se ha eliminado.");     
        }
    });
    limpiarElementoReserva()
}

function modificarElementoReserva(idRes,fIni,fEnt,reCli,reCua){
    alert("Se modificará el registro");
    $("#idReservacion").val(idRes);
    $("#fechaInicio").val(fIni);
    $("#fechaDevo").val(fEnt);
    $("#relacion-cliente").val(reCli);
    $("#relacion-cuadrimoto").val(reCua);
}

function limpiarElementoReserva() {
    $("#idReservacion").val("");
    $('input[type=date]').val("");
    $("#relacion-cliente").val("");
    $("#relacion-cuadrimoto").val("");
}

function verificarEstado(respuesta){
    if (!respuesta){
        estado="No"
    }
    else estado="Si"
    return estado;

}

// funciones de Reportes estado************

function traerReporteEstado(){

        $.ajax({
            //url: "http://129.151.123.222:8080/api/Reservation/all",
            url: dirurl + "Reservation/report-status",
            headers: {'Access-Control-Allow-Origin': '*'},        
            type: "GET",
            datatype: "JSON",
            success: function(respuesta){
                $("#resultado6").empty();
                console.log(respuesta);
                mostrarReporteEstado(respuesta);
            }
        });

}
function mostrarReporteEstado(respuesta){

    let tabla = "<table class='table table-striped'> <thead>";
    tabla += "<tr>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Reservación Completas"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Reservación Canceladas"+"</p>"+"</th>";
            tabla += "</tr></thead>";
            tabla += "<tbody><tr>";
            tabla += "<td>" + respuesta.completed + "</td>";
            tabla += "<td>" + respuesta.cancelled + "</td>";
            tabla += "</tr></tbody>";
    tabla += "</table> ";
    $("#resultado6").append(tabla);
    
}
// funciones de Reportes clientes************

function traerReporteClientes(){

    $.ajax({
        url: dirurl + "Reservation/report-clients",
        headers: {'Access-Control-Allow-Origin': '*'},        
        type: "GET",
        datatype: "JSON",
        success: function(respuesta){
            $("#resultado7").empty();
            console.log(respuesta);
            mostrarReporteCliente(respuesta);
        }
    });

}
function mostrarReporteCliente(respuesta){
    let tabla = "<table class='table table-striped'> <thead>";
    tabla += "<tr>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Total"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Nombre"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Correo"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Edad"+"</p>"+"</th>";
            for(i=0; i<respuesta.length; i++) {
            tabla += "<tbody><tr>";
                    tabla += "<td>"+respuesta[i].total+"</td>";
                    tabla += "<td>"+respuesta[i].client.name+"</td>";
                    tabla += "<td>"+respuesta[i].client.email+"</td>";
                    tabla += "<td>"+respuesta[i].client.age+"</td>";
                    tabla += "</tr></tbody>";
            }
    tabla += "</table> ";
    $("#resultado7").append(tabla);
}

// funciones de Reportes por fecha************
function traerReporteFecha(){

    let fechaIni=cnvFecha($("#fecInicial").val());
    let fechaFin=cnvFecha($("#fecFinal").val());

    if(!fechaIni){
        alert("Campo de fecha Inicio Vacio");
    }
        else{
            
            if(!fechaFin){
                alert("Campo de fecha final Vacio");
            }
            else{
                
                $.ajax({
                    //url:"http://localhost:8080/api/Reservation/report-dates/2020-12-01/2020-12-31",
                    url:dirurl+"Reservation/report-dates/"+fechaIni+"/"+fechaFin,
                    headers: {'Access-Control-Allow-Origin': '*'},        
                    type: "GET",
                    datatype: "JSON",
                    success: function(respuesta){
                        $("#resultado8").empty();
                        mostrarReporteFecha(respuesta);
                        },
                });
            }
        }
}

function mostrarReporteFecha(respuesta){

    let tabla = "<table class='table table-striped'> <thead>";
    tabla += "<tr>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Fecha Inicial"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Fecha Final"+"</p>"+"</th>";
            tabla += "<th>"+"<p class=bg-info text-white>"+"Estado"+"</p>"+"</th>";
            for(i=0; i<respuesta.length; i++) {
            tabla += "<tbody><tr>";
                    tabla += "<td>"+cnvFecha(respuesta[i].startDate)+"</td>";
                    tabla += "<td>"+cnvFecha(respuesta[i].devolutionDate)+"</td>";
                    tabla += "<td>"+respuesta[i].status+"</td>";
                    tabla += "</tr></tbody>";
            }
            tabla += "</table> ";
    $("#resultado8").append(tabla);      
}

function limpiarReportes(){
    $("#resultado6").empty();
    $("#resultado7").empty();
    $("#resultado8").empty();
    $('input[type=date]').val("");
    location.reload();
}