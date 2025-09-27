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

	const carousel = document.querySelector('.hero-carousel');
	const slides = carousel ? carousel.querySelectorAll('.carousel-slide') : [];
	const dots = carousel ? carousel.querySelectorAll('.carousel-dot') : [];
	const dynamicName = document.getElementById('dynamicName');

	let currentSlide = 0;
	let carouselInterval = null;

	function showSlide(idx) {
		if (!slides.length) return;

		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === idx);
		});
		dots.forEach((dot, i) => {
			dot.classList.toggle('active', i === idx);
		});
		currentSlide = idx;
	}

	function nextSlide() {
		let next = (currentSlide + 1) % slides.length;
		showSlide(next);
	}

	function prevSlide() {
		let prev = (currentSlide - 1 + slides.length) % slides.length;
		showSlide(prev);
	}

	function startCarousel() {
		carouselInterval = setInterval(nextSlide, 6500);
	}

	function stopCarousel() {
		clearInterval(carouselInterval);
	}

	if (carousel && slides.length && dots.length) {
		dots.forEach((dot, i) => {
			dot.addEventListener('click', () => {
				showSlide(i);
				stopCarousel();
				startCarousel();
			});
		});
		showSlide(0);
		startCarousel();
		carousel.addEventListener('mouseenter', stopCarousel);
		carousel.addEventListener('mouseleave', startCarousel);
	}

	if (dynamicName) {
		if (savedName) {
			dynamicName.textContent = savedName;
		}
		form.addEventListener('submit', function() {
			const name = document.getElementById('name').value.trim();
			if (name) dynamicName.textContent = name;
		});
	}

	const homeSection = document.querySelector('.home-section');
	if (homeSection) {
		let gradAngle = 90;
		setInterval(() => {
			gradAngle = (gradAngle + 1) % 360;
			homeSection.style.background = `linear-gradient(${gradAngle}deg, #4F8EF7 0%, #a7d5d6 100%)`;
		}, 60);
	}
});
