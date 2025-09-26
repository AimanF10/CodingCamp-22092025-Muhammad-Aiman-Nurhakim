document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('messageForm');
	const result = document.getElementById('messageResult');
	const welcomeText = document.querySelector('h2');

	let savedName = localStorage.getItem('userName');
	if (savedName && welcomeText) {
		welcomeText.textContent = `Hi ${savedName}, Welcome To FLY AND GO`;
	}

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		const name = document.getElementById('name').value.trim();
		const email = document.getElementById('email').value.trim();
		const phone = document.getElementById('phone').value.trim();
		const message = document.getElementById('message').value.trim();
		if (name === '' || email === '' || phone === '' || message === '') {
			alert('Semua field wajib diisi!');
			return;
		}
		if (!email.includes('@') || !email.includes('.')) {
			alert('Email tidak valid!');
			return;
		}
		if (!/^\d{8,15}$/.test(phone.replace(/\D/g, ''))) {
			alert('Nomor telepon harus 8-15 digit angka!');
			return;
		}
		const now = new Date();
		const dateString = now.toLocaleString();
		result.innerHTML = `
			<b>Time:</b> ${dateString}<br>
			<b>Name:</b> ${name}<br>
			<b>Email:</b> ${email}<br>
			<b>Phone:</b> ${phone}<br>
			<b>Message:</b> ${message}
		`;
		if (welcomeText) {
			welcomeText.textContent = `Hi ${name}, Welcome To FLY AND GO`;
		}
		localStorage.setItem('userName', name);
	});
});
