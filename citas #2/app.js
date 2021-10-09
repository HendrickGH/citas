'use strict'
const clientes = document.querySelector('.aside--clientes-container')
const search = document.querySelector('.search')
const generate = document.querySelector('.generate')

const citasHotel = JSON.parse(localStorage.getItem('citas')) || [
  [
    'Yohu',
    '2021-11-10',
    '12-11-21',
    'Premium',
    Math.trunc(Math.random() * 9300)
  ],
  [
    'Hendrick',
    '2021-11-21',
    '12-11-21',
    'Premium',
    Math.trunc(Math.random() * 10000)
  ],
  [
    'Pesesito',
    '2021-10-10',
    '12-11-21',
    'Premium',
    Math.trunc(Math.random() * 9300)
  ],
  [
    'Maytecita',
    '2021-11-21',
    '12-11-21',
    'Premium',
    Math.trunc(Math.random() * 10000)
  ],
  [
    'Te extrañaba mucho:(',
    '2021-11-10',
    '12-11-21',
    'Premium',
    Math.trunc(Math.random() * 9300)
  ],
  [
    'Hendrick',
    '2021-11-10',
    '2021-11-10',
    'Premium',
    Math.trunc(Math.random() * 10000)
  ],
  ['♥', '2021-11-10', '12-11-21', 'Premium', Math.trunc(Math.random() * 9300)],
  [
    'Armand',
    '2020-11-21',
    '12-11-21',
    'Premium',
    Math.trunc(Math.random() * 10000)
  ],
  [
    'Arnold',
    '2021-1-10',
    '12-11-21',
    'Premium',
    Math.trunc(Math.random() * 9300)
  ],
  [
    'Risas',
    '2021-11-11',
    '12-11-21',
    'Premium',
    Math.trunc(Math.random() * 10000)
  ],
  [
    'Gatitos',
    '2021-10-01',
    '12-11-21',
    'Premium',
    Math.trunc(Math.random() * 9300)
  ],
  [
    'Yo',
    '2021-11-17',
    '12-11-21',
    'Premium',
    Math.trunc(Math.random() * 10000)
  ]
]
const saveCitas = e => {
  e.preventDefault()
  const name = document.querySelector('.nombre')
  const reserv = document.querySelector('.reservada')
  const salida = document.querySelector('.salida')
  const typeHab = document.querySelector('.type-hab')
  if (name.value && reserv.value && salida.value) {
    citasHotel.push([
      name.value,
      reserv.value,
      salida.value,
      typeHab.value,
      Math.trunc(Math.random() * 10000)
    ])
    localStorage.setItem('citas', JSON.stringify(citasHotel))
  } else {
    generate.value = 'Completa los datos.'
    generate.classList.add('invalid')
    setTimeout(() => {
      generate.classList.remove('invalid')
      generate.value = 'Generar cita'
    }, 3000)
  }
}
const searchCitas = e => {
  e.preventDefault()
  const date = `${document.querySelector('.form-date').value}`
  if (!date) {
    search.value = 'Elije una fecha.'
    search.classList.add('invalid')
    setTimeout(() => {
      search.classList.remove('invalid')
      search.value = 'Generar cita'
    }, 3000)
    return
  }

  citasHotel
    .filter(e => e[1] === date)
    .map(([nombre, reservada, salida, type, precio]) => {
      while (clientes.firstChild) {
        clientes.removeChild(clientes.firstChild)
      }
      return [
				`<article class='aside--clientes-container__article'>
                        <h4>${nombre}</h4>
                        <p class='aside--clientes-container__article--title'>Fecha reservada:</p>
                        <p>${reservada}</p>
                        <p class='aside--clientes-container__article--title'>Fecha de salida:</p>
                        <p>${salida}</p>
                        <p class='aside--clientes-container__article--title'>
                            Tipo de habitación:
                        </p>
                        <p>${type}</p>
                        <p class='aside--clientes-container__article--title '>
                            Costo pagando en sucursal
                        </p>
                        <p class="nope">$${precio}.00</p>
                        <p class='aside--clientes-container__article--title'>
                            Costo pagando en línea
                        </p>
                        <p class="yep">$${(precio -= precio * 0.15)}</p>
		            </article>`
      ]
    })
    .map(e => {
      clientes.insertAdjacentHTML('afterbegin', e)
    })
}

search.addEventListener('click', searchCitas)
generate.addEventListener('click', saveCitas)
