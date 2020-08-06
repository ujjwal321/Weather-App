//client side JS
console.log('client side JS');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = search.value;
	msg1.innerText = '';
	msg2.innerText = '';
	fetch('http://localhost:3000/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				msg1.innerText = data.error;
			} else {
				msg1.innerText = data.location;
				msg2.innerText = 'temperature: ' + data.temperature;
			}
		});
	});
});
