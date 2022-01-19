const socket = io("https://chating-1.herokuapp.com/");

const form = document.querySelector('.form')
const input = document.querySelector('.input')
const massages = document.querySelector('.massages')

const name = prompt('write  your name')

const h5 = document.createElement('strong')
h5.setAttribute('class', 'text')
h5.innerHTML += 'You joined'
massages.appendChild(h5)

form.addEventListener('submit', (evt) => {
   evt.preventDefault()
   const inputValue = input.value.trim()
   console.log(inputValue);
   const p_message = document.createElement('p')
   p_message.setAttribute('class', 'text');
   p_message.innerHTML += `You: ${inputValue}`
   massages.appendChild(p_message)

   socket.emit('new-message', { message: inputValue, name })

   input.value = null
})

socket.emit('new-user', { name })

socket.on('joined-user', data => {
   const newUser = document.createElement('h5')
   newUser.innerHTML += `${data.name} joined`
   massages.appendChild(newUser)
})

socket.on('message', data => {
   const p_message = document.createElement('p')
   p_message.innerHTML += `${data.name}: ${data.message}`
   massages.appendChild(p_message)
})

function key() {

}