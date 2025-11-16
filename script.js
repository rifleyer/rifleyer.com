document.addEventListener('DOMContentLoaded', function() {
            
    // --- 1. NUEVA LÓGICA DEL MENÚ (SIDEBAR MÓVIL) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('main-nav'); // El <aside> tiene el ID 'main-nav'

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active'); // Muestra/oculta el sidebar
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Cerrar menú al hacer clic en un enlace (en móvil)
    // Buscamos enlaces dentro del .sidebar-nav
    document.querySelectorAll('.sidebar-nav ul li a').forEach(item => {
        item.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- 2. EFECTO DE TIPEO (TYPING) EN EL HERO (Sin cambios) ---
    const typingElement = document.getElementById('typing-effect');
    if (typingElement) {
        const text = typingElement.innerText;
        typingElement.innerText = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        typeWriter();
    }

    // --- 3. ANIMACIÓN AL HACER SCROLL (Sin cambios) ---
    const animatedCards = document.querySelectorAll('.animated-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedCards.forEach(card => {
        observer.observe(card);
    });

    // --- 4. LÓGICA DEL ACORDEÓN DE FAQ (Sin cambios) ---
    const faqPreguntas = document.querySelectorAll('.faq-pregunta');

    faqPreguntas.forEach(pregunta => {
        pregunta.addEventListener('click', () => {
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