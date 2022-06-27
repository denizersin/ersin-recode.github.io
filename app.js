


const menuFrame = document.getElementById('menu-frame');
menuFrame.addEventListener(`mouseleave`, e => {
    if (e.target == menuFrame) {
        onMouseEnter(currentFrame)
    }
})



const menuEls = { list: Array.from(document.querySelectorAll('#menu-frame a.link')) };
const menuWrapper = document.getElementById('menu-wrapper')

menuEls.list.forEach(el => {
    menuEls[el.id] = el;
    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('touchstart', e => {

    })
});

function onMouseEnter(e) {
    let element = e instanceof Event ? e.currentTarget : e;
    console.log(element);
    console.log('*****sdfsdfsdf********');
    menuWrapper.style.width = `${element.offsetWidth}px`
    menuWrapper.style.left = `${element.getBoundingClientRect().x}px`
    menuWrapper.style.top = `${element.getBoundingClientRect().y}px`
}


let lasMup = 0, lasTup = 0;
menuFrame.addEventListener('mousedown', e => {
    scrollContainer.y = e.clientY;
    menuFrame.addEventListener('mousemove', onMouseMove);
})

document.documentElement.addEventListener('mouseup', e => {
    menuFrame.removeEventListener('mousemove', onMouseMove);
    lasMup = clientY - scrollContainer.y;
});

const scrollContainer = document.querySelector('#menu-frame .menu-container');
let clientY = 0;
function onMouseMove(e) {
    if (window.innerWidth >= 1000) {
        menuFrame.removeEventListener('mousemove', onMouseMove);
        return;
    }
    clientY = e instanceof TouchEvent ? e.touches[0].clientY + lasTup : e.clientY + lasMup;
    let Y = clientY - scrollContainer.y;
    Y = Y <= -120 ? -120 : Y;
    Y = Y >= 20 ? 20 : Y;
    scrollContainer.style.transform = `translateY(${Y}px)`

}

menuFrame.addEventListener('touchstart', e => {
    scrollContainer.y = e.touches[0].clientY
    menuFrame.addEventListener(`touchmove`, onMouseMove);
    document.body.style.overflow = 'hidden';

})
menuFrame.addEventListener(`touchend`, e => {
    menuFrame.removeEventListener(`touchmove`, onMouseMove);
    document.body.style.overflow = 'visible';

    lasTup = clientY - scrollContainer.y;
})



//search icon click
const search = document.querySelector('.search-icon-container');
search.addEventListener('click', e => {
    document.querySelector('#search>.inputc').classList.toggle('show')
    search.firstElementChild.classList.toggle('fa-xmark');
})









let currentFrame = menuEls.discover;
currentFrame.classList.add('current-menu');

setTimeout(() => { onMouseEnter(currentFrame) }, 400);


function touchMove(e) {
    e.preventDefault();
}

document.documentElement.addEventListener(`touchmove`, touchMove);
