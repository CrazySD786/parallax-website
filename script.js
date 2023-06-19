
const parallax_el = document.querySelectorAll('.parallax');

let xValue = 0;
let yValue = 0;
let rotateDegrees = 0;




function update(cursorPos) {
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotation = el.dataset.rotation;
        let zValue = cursorPos - parseFloat(getComputedStyle(el).left);
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

        el.style.transform = `
            translateX(calc(-50% - ${xValue * speedx}px)) 
            translateY(calc(-50% + ${yValue * speedy}px)) 
            perspective(2000px) 
            translateZ(${zValue * isInLeft * speedz}px)
            rotateY(${rotateDegrees * rotation }deg)
        `;
    });
}

update(0);

window.addEventListener('mousemove', (e) => {
    if (timeline.isActive()) return;
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegrees = (xValue /( window.innerWidth / 2)) * 20;

    update(e.clientX)
});

/* GSAP Reveal Animations */

let timeline = gsap.timeline();





timeline.from('.bg-img', {
    top: `${document.querySelector('.bg-img').offsetHeight / 2 + 120}px`,
    duration: 5,
    ease: 'power3.out'
})

Array.from(parallax_el)
.filter( el => !el.classList.contains('bg-img'))
.forEach( el => {
    timeline.from( el , {
        top: `${el.dataset.distance}px`,
        duration: 3,
        ease: 'power3.out'
    }, '<')
})

timeline.from('.light', {
    transform: 'translateY(-300px)',
    opacity: 0,
    duration: 3,
    ease: 'power2.out'
}, '2')

timeline.from('.heavy', {
    transform: 'translateY(+300px)',
    opacity: 0,
    duration: 3,
    ease: 'power2.out'
}, '<')






