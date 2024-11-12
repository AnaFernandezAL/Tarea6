/**
* Template Name: EstateAgency - v4.8.0
* Template URL: https://bootstrapmade.com/real-estate-agency-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Toggle .navbar-reduce
   */
  let selectHNavbar = select('.navbar-default')
  if (selectHNavbar) {
    onscroll(document, () => {
      if (window.scrollY > 100) {
        selectHNavbar.classList.add('navbar-reduce')
        selectHNavbar.classList.remove('navbar-trans')
      } else {
        selectHNavbar.classList.remove('navbar-reduce')
        selectHNavbar.classList.add('navbar-trans')
      }
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Search window open/close
   */
  let body = select('body');
  on('click', '.navbar-toggle-box', function(e) {
    e.preventDefault()
    body.classList.add('box-collapse-open')
    body.classList.remove('box-collapse-closed')
  })

  on('click', '.close-box-collapse', function(e) {
    e.preventDefault()
    body.classList.remove('box-collapse-open')
    body.classList.add('box-collapse-closed')
  })

  /**
   * Intro Carousel
   */
  new Swiper('.intro-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property carousel
   */
  new Swiper('#property-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.propery-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * News carousel
   */
  new Swiper('#news-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.news-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Testimonial carousel
   */
  new Swiper('#testimonial-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.testimonial-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property Single carousel
   */
  new Swiper('#property-single-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.property-single-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()

function calcularPagoMensual(){
  let tm = (7.10/12);
  let ms = parseFloat(document.getElementById("montosoli").value);
  let p = (parseInt(document.getElementById("rangoanios").value) - 2024)*12;
  let resultado = null;

  if( parseFloat(document.getElementById("valorvivienda").value) !== 0 && ms <= document.getElementById("valorvivienda").value*(0.8)){
    let pm = (ms*(tm/100)*Math.pow(1+(tm/100),p))/(Math.pow(1+(tm/100), p)-1);
    resultado = pm.toFixed(2);
  }else{
    resultado = "Monto solicitado excede el 80%";
  }

  document.getElementById("pagoMensual").value= resultado;
  document.getElementById("salMin").value = resultado /0.40;

  if(document.getElementById("salario").value >= resultado/0.40){
    document.getElementById("msj").value = "Monto de salario suficiente para el crédito";
  }else{
    document.getElementById("msj").value = "Monto de salario insuficiente";
  }

  let edad = document.getElementById("anios").value - 2024;
  if(edad > 22 && edad < 55){
    document.getElementById("msjEdad").value = "Cliente con edad suficiente para crédito";
  }else{
    document.getElementById("msjEdad").value = "Cliente no califica para crédito por edad";
  }

  let valorVivienda = parseFloat(document.getElementById("valorvivienda").value);
  let montoSolicitado = parseFloat(document.getElementById("montosoli").value);
  const porcentajeFinanciamiento = (montoSolicitado / valorVivienda) * 100;

  GuardarDatos(document.getElementById("correoelec").value, document.getElementById("nombre").value, document.getElementById("anios").value, document.getElementById("salario").value, valorVivienda, montoSolicitado, (parseInt(document.getElementById("rangoanios").value) - 2024), resultado, resultado /0.40, porcentajeFinanciamiento, document.getElementById("msj").value, document.getElementById("msjEdad").value);
}

function GuardarDatos(correo, Nombre, fechaN, salMensual, valVivienda, montoSoli, plazoAnios, cuotaMen, ingRequerido, porcFinanciar, msj, msjEdad){
let datos = {
  Correoelec : correo,
  Nom : Nombre,
  FechaNacimiento : fechaN,
  salarioMen : salMensual,
  valorVivienda : valVivienda,
  montoSolicitado : montoSoli,
  Plazo : plazoAnios,
  Cuota : cuotaMen,
  IngresoReq : ingRequerido,
  Porcentaje : porcFinanciar,
  Mensaje : msj,
  MensajeEdad : msjEdad
};

localStorage.setItem("datosCred", JSON.stringify(datos));
}

function CargarDatos(){
  let datos = JSON.parse(localStorage.getItem("datosCred"));

  if (datos){
    document.getElementById("correoelec").value = datos.Correoelec || "";
    document.getElementById("nombre").value = datos.Nom || "";
    document.getElementById("anios").value = datos.FechaNacimiento || "";
    document.getElementById("salario").value = datos.salarioMen || "";
    document.getElementById("valorvivienda").value = datos.valorVivienda || "";
    document.getElementById("montosoli").value = datos.montoSolicitado || "";
    document.getElementById("rangoanios").value = datos.Plazo || "";
    document.getElementById("pagoMensual").value = datos.Cuota || "";
    document.getElementById("salMin").value = datos.IngresoReq || "";
    document.getElementById("msj").textContent = datos.Mensaje || "";
    document.getElementById("msjEdad").textContent = datos.MensajeEdad || "";
  }
}

function interes(tasaMensual, mes, pagoMensual, montosolicitado){
  var vInteres = 0;
  var amortiza = montosolicitado;

  for(var i = 1; i <= mes; i++){
    vInteres = (amortiza * (tasaMensual / 100));
    amortiza = amortiza - (pagoMensual - vInteres);
  }

  return vInteres;
}

function mostrarProyeccion() {
  const montoSolicitado = parseFloat(document.getElementById("montosoli").value);
  const tasaInteresAnual = parseFloat(document.getElementById("tasaInteres").value);
  const plazoEnAnnos = parseInt(document.getElementById("rangoanios").value) - 2024;
  const plazoEnMeses = plazoEnAnnos * 12;
  const tasaInteresMensual = tasaInteresAnual / 12 / 100;
  const pagoMensual = (montoSolicitado * (tasaInteresMensual) * Math.pow(1 + tasaInteresMensual, plazoEnMeses)) / (Math.pow(1 + tasaInteresMensual, plazoEnMeses) - 1);

  let tablaHTML = `<table class="table table-bordered">
                     <caption>Crédito Happy Earth Proyección de crédito</caption>
                     <thead>
                       <tr>
                         <th>Mes</th>
                         <th>Pago Mensual</th>
                         <th>Interés</th>
                         <th>Amortización</th>
                         <th>Saldo</th>
                       </tr>
                     </thead>
                    <tbody>`;
  let saldo = montoSolicitado;
  for (let mes = 1; mes <= plazoEnMeses; mes++) {
    const interesMensual = interes(tasaInteresMensual, mes, pagoMensual, saldo);
    const amortizacion = pagoMensual - interesMensual;
    saldo -= amortizacion;
    tablaHTML += `<tr>
                    <td>${mes}</td>
                    <td>${pagoMensual.toFixed(2)}</td>
                    <td>${interesMensual.toFixed(2)}</td>
                    <td>${amortizacion.toFixed(2)}</td>
                    <td>${saldo.toFixed(2)}</td>
                  </tr>`;
  }
  tablaHTML += `</tbody></table>`;
  document.getElementById("tabla-proyeccion").innerHTML = tablaHTML;
}


window.onload = CargarDatos();