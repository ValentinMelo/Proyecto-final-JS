const boton = document.getElementById('boton')
const capital = document.getElementById('monto')
const numeroCuotas = document.getElementById('cuotas')
const ingresos = document.getElementById('ingresos')
const nombre = document.getElementById('nombre')
const tituloCalculadora = document.getElementById('tituloCalculadora')
const apellido = document.getElementById('apellido')
const maximoCapital = 5000
const maximoCuotas = 12
const parrafoRequisitos = document.getElementById('parrafoRequisitos')
const boxCalculadora = document.getElementById('calculadora')


setTimeout(() => {Swal.fire({
    confirmButtonColor: 'dodgerblue',
    text: 'Bienvenido a la mejor financiera de Uruguay',
    confirmButtonText: 'Ir a la página web!'})}, 500);

function crearSaludo (user){
    const saludarTitulo = document.createElement('h2')
    saludarTitulo.className = 'tituloSaludo'
    saludarTitulo.innerText = `Hola ${user.nombre} ${user.apellido}, te otorgaremos un préstamo con las siguientes características:`;
    boxCalculadora.append(saludarTitulo)
}

function montoCuota(prestamo){
    let interes = 0
    const datos1 = {
        cuotasElegidas: numeroCuotas.value
    }
    
    //Operador ternario
    datos1.cuotasElegidas<=6 ? interes = 2 : interes = 5

    let valorCuota = (prestamo/datos1.cuotasElegidas)*(1+(interes/100))
    return valorCuota
}




function calculadora(){
    const datos = {
        capitalDatos: capital.value,
        numeroCuotasDatos: numeroCuotas.value,
        ingresosDatos: ingresos.value
    }

    //desestructuracion
    const {capitalDatos, numeroCuotasDatos, ingresosDatos} = datos
    
    
    if (capitalDatos<=maximoCapital && numeroCuotasDatos<=6 && (ingresosDatos>capitalDatos || montoCuota(capitalDatos)<ingresosDatos)){
        const prestamoParrafo = document.createElement('p')
        prestamoParrafo.className = 'parrafoResumen'
        prestamoParrafo.innerText = `Capital: ${capitalDatos} Cuota mensual:${montoCuota(capitalDatos)}`
        boxCalculadora.append(prestamoParrafo)
    } else if(capitalDatos<=maximoCapital && numeroCuotasDatos>6 && numeroCuotasDatos<=maximoCuotas && (ingresosDatos>capitalDatos || montoCuota(capitalDatos)<ingresosDatos)) {
        const prestamoParrafo = document.createElement('p')
        prestamoParrafo.className = 'parrafoResumen'
        prestamoParrafo.innerText = `Capital: ${capitalDatos} Cuota mensual:${montoCuota(capitalDatos)}`
        boxCalculadora.append(prestamoParrafo)
    } else if(capitalDatos<=maximoCapital && numeroCuotasDatos<=12 && montoCuota(capitalDatos)>ingresosDatos){
        const prestamoParrafo = document.createElement('p')
        prestamoParrafo.className = 'parrafoResumen'
        prestamoParrafo.innerText = `No cumple con los requisitos crediticios para cumplir con la cuota mensual`
        boxCalculadora.append(prestamoParrafo)
    } else {
        const prestamoParrafo = document.createElement('p')
        prestamoParrafo.innerText = `Requisitos: máximo de capital 5.000 USD y máximo de cuotas 12`
        boxCalculadora.append(prestamoParrafo)
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'No cumple con los requisitos y condiciones del préstamo',
            confirmButtonColor: 'dodgerblue',
          })
    }
}



boton.onclick = (e) => {
    e.preventDefault()
    
    // saludo a usuario
    const usuario = {
        nombre: nombre.value,
        apellido: apellido.value,
    }
    localStorage.setItem('usuarioStorage', JSON.stringify(usuario))
    crearSaludo(usuario)
    calculadora()

    // eliminar form
    boton.style.display = "none";
    capital.style.display = "none";
    numeroCuotas.style.display = "none";
    ingresos.style.display = "none";
    nombre.style.display = "none";
    apellido.style.display = "none";
    tituloCalculadora.style.display = "none";



}


fetch('/data.json')
    .then( (res) => res.json())
    .then(  (data) => {

        data.forEach((recordatorio) => {
            const li = document.createElement('li')
            li.className= 'listaRequisitos';
            li.innerHTML = `
            <h4>${recordatorio.cuotas}</h4>
            <p>${recordatorio.cantidad}</p>
            <hr/>
            `

            parrafoRequisitos.append(li)
        })
    })



const slidesContenedor = document.getElementById("slides-contenedor");
const slide = document.querySelector(".slide");
const prevBoton = document.getElementById("slide-flecha-prev");
const sigBoton = document.getElementById("slide-flecha-sig");

sigBoton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContenedor.scrollLeft += slideWidth;
});

prevBoton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContenedor.scrollLeft -= slideWidth;
});