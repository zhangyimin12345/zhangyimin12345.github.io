document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const img = entry.target;

            if (entry.isIntersecting) {
                if (img.complete && img.naturalWidth > 0) {
                    img.classList.add('loaded');
                } else {
                    img.addEventListener('load', () => img.classList.add('loaded'));
                }
                observer.unobserve(img);
            }
        });
    }, observerOptions);

    const images = document.querySelectorAll('.post-content img, .container img');
    images.forEach((img) => {
        observer.observe(img);
    });
});