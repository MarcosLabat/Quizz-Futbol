const preguntas = document.querySelector('#pregunta')
const contImagen = document.querySelector('#imagen')
const respuesta1 = document.querySelector('#rta-1')
const respuesta2 = document.querySelector('#rta-2')
const respuesta3 = document.querySelector('#rta-3')
const respuesta4 = document.querySelector('#rta-4')
const contenedor = document.querySelector('.contenido')
const contenedorPreg = document.querySelector('#contenedor-preg')
let cantPreg = [0,1,2,3,4,5,6,7,8,9]
let respuestasDesor = [];
const botones = [respuesta1, respuesta2, respuesta3, respuesta4]
let contador = 0;



const obtenerPreguntas = async () => {
    try {
        const data = await fetch('../preguntas.json')
        const dataJson = await data.json()
        const dataFinal = await dataJson
        elegirPregunta(dataFinal)
    } catch (error) {
        console.log(error)
    }
}


const elegirPregunta = data => {
    if(document.querySelector('.pregunta__txt'))
    limpiarHtml()
    if(cantPreg.length == 0){
        mensajeFinal()
        return
    }
    //Metodo para poder ir eligiendo de manera aleatoria las preguntas y a la vez ir sacando esa pregunta del array evitando la repeticion de las preguntas
    const numero = Math.floor(Math.random() * (( cantPreg.length - 1 ) - 0) + 0)//generamos un numero aleatorio entre la longitud del array y 0 para poder elegir una posicion valida
    const numeroRandom = cantPreg[numero]//Guardamos el numero del array para poder pasarlo y elegir la pregunta
    cantPreg.splice(numero, 1)//quitamos ese numero del array
    cantPreg = [...cantPreg]//hacemos nueva copia del array sin el numero que pasamos

    crearDatos(data, numeroRandom)
    
}
const crearDatos = (datos, num) => {
    const preg = datos[num]
    const {pregunta, imagen, respuesta, error, error2, error3} = preg
    respuestasDesor = [respuesta, error, error2, error3];
    respuestasDesor.sort(() =>  0.5 - Math.random() )//Numero random para el indice de los botones con las posibles respuestas

        const pPregunta = document.createElement('P');
        pPregunta.classList.add('pregunta__txt')
        pPregunta.textContent = pregunta

        const iImagen = document.createElement('IMG');
        iImagen.classList.add('img')
        iImagen.src = imagen

        const cont = document.createElement('P');
        cont.textContent = `Respuestas correctas = ${contador}`;
        cont.classList.add('contador')

        respuesta1.textContent = respuestasDesor[0]

        respuesta2.textContent = respuestasDesor[1]

        respuesta3.textContent = respuestasDesor[2]

        respuesta4.textContent = respuestasDesor[3]

        preguntas.appendChild(pPregunta)
        contImagen.appendChild(iImagen)
        contenedor.insertAdjacentElement("afterbegin", cont)
        
        respuesta1.onclick = () => {botonClick(respuesta,0)}

        respuesta2.onclick = () => {botonClick(respuesta,1)}

        respuesta3.onclick = () => {botonClick(respuesta,2)}

        respuesta4.onclick = () => {botonClick(respuesta,3)}
}

const botonClick = (rtaCorrecta,indice) => {
    if(rtaCorrecta == respuestasDesor[indice]){
        botones[indice].classList.add('correcto')
        contador += 1
        setTimeout(() => {
            obtenerPreguntas()
            console.log(cantPreg)
            botones[indice].classList.remove('correcto')
            return
        }, 2000);
    }
    else{
        botones[indice].classList.add('error')
        setTimeout(() => {
            mensajeFinal()
        }, 1500);
    }
    
}

const mensajeFinal = () => {
    contenedorPreg.remove()
    respuesta1.remove()
    respuesta2.remove()
    respuesta3.remove()
    respuesta4.remove()
    const contenedorMensaje = document.createElement('DIV');
    contenedorMensaje.classList.add('contenedor');

    const mensaje = document.createElement('P');
    mensaje.textContent = `Tus respuestas correctas fueron: ${contador}`;
    mensaje.classList.add('mensaje')

    contenedorMensaje.appendChild(mensaje)

    if(contador < 10){
        const botonReiniciar = document.createElement('BUTTON');
        botonReiniciar.classList.add('reiniciar__btn')
        botonReiniciar.textContent = 'Reiniciar cuestionario'
        botonReiniciar.addEventListener('click', () => {
            setTimeout(() => {
                location.reload()
            }, 1500);
        });
        contenedorMensaje.appendChild(botonReiniciar)
    }

    contenedor.appendChild(contenedorMensaje)

}

const limpiarHtml = () => {
    while(preguntas.firstChild){
        preguntas.removeChild(preguntas.firstChild)
        contImagen.removeChild(contImagen.firstChild)
        contenedor.removeChild(contenedor.firstChild)
    }
}

document.addEventListener('DOMContentLoaded', () => obtenerPreguntas());