/**
 * Alec Lubin Portfolio v5 — Minimal JS (copy of v2)
 */

document.addEventListener('DOMContentLoaded', () => {
	// Mobile nav toggle
	const navToggle = document.querySelector('.nav-toggle');
	const navLinks = document.querySelector('.nav-links');

	const navBackdrop = document.querySelector('.nav-backdrop');

	function closeNav() {
		if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
		if (navLinks) navLinks.classList.remove('is-open');
		document.body.classList.remove('nav-open');
		document.body.style.overflow = '';
	}

	if (navToggle && navLinks) {
		navToggle.addEventListener('click', () => {
			const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', !isOpen);
			navLinks.classList.toggle('is-open');
			document.body.classList.toggle('nav-open', !isOpen);
			document.body.style.overflow = isOpen ? '' : 'hidden';
		});

		navLinks.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', closeNav);
		});
	}

	if (navBackdrop) {
		navBackdrop.addEventListener('click', closeNav);
	}
});
