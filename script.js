document.addEventListener('DOMContentLoaded', function() {
            
    // --- 1. CÓDIGO DEL MENÚ MÓVIL (Tu código original) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    document.querySelectorAll('#main-nav ul li a').forEach(item => {
        item.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- 2. NUEVO: EFECTO DE TIPEO (TYPING) EN EL HERO ---
    const typingElement = document.getElementById('typing-effect');
    if (typingElement) {
        const text = typingElement.innerText;
        typingElement.innerText = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80); // Velocidad de tipeo
            }
        }
        typeWriter();
    }

    // --- 3. NUEVO: ANIMACIÓN AL HACER SCROLL (INTERSECTION OBSERVER) ---
    const animatedCards = document.querySelectorAll('.animated-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Dejar de observar una vez que se animó
            }
        });
    }, {
        threshold: 0.1 // Qué porcentaje del elemento debe estar visible (10%)
    });

    animatedCards.forEach(card => {
        observer.observe(card);
    });

    // --- 4. NUEVO: LÓGICA DEL ACORDEÓN DE FAQ ---
    const faqPreguntas = document.querySelectorAll('.faq-pregunta');

    faqPreguntas.forEach(pregunta => {
        pregunta.addEventListener('click', () => { // Corregí un 'F' suelto que había aquí
            const item = pregunta.closest('.faq-item');
            const respuesta = item.querySelector('.faq-respuesta');
            const icono = pregunta.querySelector('i');

            // Cerrar otras respuestas abiertas
            document.querySelectorAll('.faq-item').forEach(otroItem => {
                if (otroItem !== item && otroItem.classList.contains('active')) {
                    otroItem.classList.remove('active');
                    otroItem.querySelector('.faq-respuesta').style.maxHeight = null;
                    otroItem.querySelector('.faq-pregunta i').classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            });

            // Abrir/Cerrar la respuesta actual
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                respuesta.style.maxHeight = respuesta.scrollHeight + "px";
                icono.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                respuesta.style.maxHeight = null;
                icono.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
    });

});