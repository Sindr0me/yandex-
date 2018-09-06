'use strict';

let screenW = window.screen.availWidth;
let carts = document.querySelectorAll('[data-item="popup"]');
let body = document.querySelector('body');
let popupbefore = document.querySelector('#hideall');
let scenarioSmall = document.querySelectorAll('.scenario-small');
let arrowRight = document.querySelector('#ledtbl-arrow-right');

checkHeight();

function checkHeight() {
    if (screenW > 800) {

    scenarioSmall.forEach((item, num) => {
        item.classList.remove('scenario-small--hidden');
        arrowRight.style.opacity = '0.3';
        if(item.getBoundingClientRect().top > 470) {
            item.classList.add('scenario-small--hidden');
            arrowRight.style.opacity = '1';

        }
    });
    }
    if (screenW <= 800) {
        scenarioSmall.forEach((scenario, num) => {
            scenario.classList.remove('scenario-small--hidden');
        });
    }

}

document.addEventListener("DOMContentLoaded", function(event) {
    leftblock();
    rightblock();
    footerBlock();
});

function removePopup (cart, wrapper) {
    cart.classList.remove('popup');
    cart.classList.remove('popup-active');
    popupbefore.classList.remove('popupbefore');
    wrapper.insertBefore(cart, wrapper.firstChild);
    return false;
}

for (let cart of carts) {
    cart.addEventListener('click',function (e){
        if (cart.classList.contains('popup-active')) return false;
        let fragment = document.createDocumentFragment(),
            top = cart.getBoundingClientRect().top +'px',
            left = cart.getBoundingClientRect().left-10 +'px',
            wrapper = cart.closest('.scenaries');

        fragment.appendChild(cart);
        body.appendChild(fragment);
        cart.classList.toggle('popup');
        cart.style.top = top;
        cart.style.left = left;

        setTimeout(()=>{
            popupbefore.classList.toggle('popupbefore');
            cart.classList.add('popup-active');
            let apply = cart.querySelector('.scenario-buttons__apply'),
                cancel = cart.querySelector('.scenario-buttons__cancel');

            apply.addEventListener('click', function (e){
                e.stopPropagation();
                removePopup (cart, wrapper);
                });

            cancel.addEventListener('click', function (e){
                e.stopPropagation();
                removePopup (cart, wrapper);
            });

        }, 1)
    })
}


var resize = function(e){
    screenW = window.screen.availWidth;
    checkHeight();
    leftblock();
    rightblock();
    footerBlock();
};
(function(){
    var time;
    window.onresize = function(e){
        if (time)
        clearTimeout(time);
        time = setTimeout(function(){
            resize(e);
        },100);

    }
})();

function rightblock () {
    if (screenW <= 800) {
        let slider = document.querySelector(".main__rightblock__scenaries"),
            wrapper = document.querySelector(".main__rightblock__wrap-container"),
            count = 0,
            xcoord = 0,
            touchstart = 0,
            touchend = 0,
            xCoordOfLastSlide = 0,
            wrapperWidth = wrapper.getBoundingClientRect().right,
            sliderWidth = slider.getBoundingClientRect().width;
        slider.style.transform = `translate3d( 0px, 0px, 0px)`;

        let endTransformWidth = (sliderWidth - wrapperWidth) + 30;

        wrapper.addEventListener("touchstart", e => {
            touchstart = e.targetTouches[0].screenX;

            wrapper.addEventListener("touchmove", e => {
                if (count < -10) count = -10;
                xCoordOfLastSlide = slider.lastElementChild.getBoundingClientRect().right;

                if (e.targetTouches[0].screenX > xcoord) {
                    xcoord = e.targetTouches[0].screenX;
                    slider.style.transform = `translate3d( -${(count -= 3)}px, 0px, 0px)`;
                }

                if (e.targetTouches[0].screenX < xcoord) {
                    if (xCoordOfLastSlide <= wrapperWidth) return false;
                    xcoord = e.targetTouches[0].screenX;
                    slider.style.transform = `translate3d( -${(count += 3)}px, 0px, 0px)`;
                }
            });
        });

        wrapper.addEventListener("touchend", e => {
            touchend = e.changedTouches[0].screenX;
            let num = 0;
            if (touchend !== 0) {
                function afterSlick() {
                    let difference = (touchstart - touchend) / 15;
                    num = difference / 2;
                    if (difference > 0) {
                        if (xCoordOfLastSlide <= wrapperWidth) return false;
                        if ((count + num) > endTransformWidth +30) return false;
                        slider.style.transform = `translate3d( -${(count = (xCoordOfLastSlide <= wrapperWidth) ? count : count + num)}px, 0px, 0px)`;
                    }
                    if (difference < 0) {
                        slider.style.transform = `translate3d( -${(count = count + num)}px, 0px, 0px)`;
                    }

                }

                let timerId = setInterval(afterSlick, 10);
                setTimeout(function () {
                    clearInterval(timerId);
                }, 400);
            }
        });
    }
}

function leftblock () {
    if (screenW > 800) {
        let slider = document.querySelector(".main__leftblock__content__scenaries"),
            wrapper = document.querySelector(".main__leftblock__wrap-container"),
            count = 0,
            ycoord = 0,
            touchstart = 0,
            touchend = 0,
            yCoordOfLastSlide = 0,
            wrapperTop = wrapper.getBoundingClientRect().bottom,
            sliderHeight = slider.getBoundingClientRect().height;
        slider.style.transform = `translateY( 0px, 0px, 0px)`;

        let endTransformWidth = (wrapperTop - sliderHeight ) + 100;

        wrapper.addEventListener("touchstart", e => {
            touchstart = e.targetTouches[0].screenY;

            wrapper.addEventListener("touchmove", e => {
                if (count < -10) count = -10;
                yCoordOfLastSlide = slider.lastElementChild.getBoundingClientRect().bottom;
                if (e.targetTouches[0].screenY > ycoord) {
                    ycoord = e.targetTouches[0].screenY;
                    slider.style.transform = `translateY( -${(count -= 3)}px)`;
                }

                if (e.targetTouches[0].screenY < ycoord) {
                    if (yCoordOfLastSlide <= wrapperTop) return false;
                    ycoord = e.targetTouches[0].screenY;
                    slider.style.transform = `translateY( -${(count += 3)}px)`;
                }
            });
        });

        wrapper.addEventListener("touchend", e => {
            touchend = e.changedTouches[0].screenY;
            let num = 0;
            if (touchend !== 0) {

                function afterSlick() {
                    let difference = (touchstart - touchend) / 15;
                    num = difference / 2;
                    if (difference > 0) {
                        if (yCoordOfLastSlide <= wrapperTop) return false;
                        if ((count + num) > endTransformWidth +30) return false;
                        slider.style.transform = `translateY( -${(count = (yCoordOfLastSlide <= wrapperTop) ? count : count + num)}px)`;
                    }
                    if (difference < 0) {
                        slider.style.transform = `translateY( -${(count = count + num)}px)`;
                    }

                }

                let timerId = setInterval(afterSlick, 10);
                setTimeout(function () {
                    clearInterval(timerId);
                }, 400);
            }
        });
    }
    if (screenW <= 800) {
        let slider = document.querySelector(".main__leftblock__content__scenaries"),
            wrapper = document.querySelector(".main__leftblock__wrap-container"),
            count = 0,
            xcoord = 0,
            touchstart = 0,
            touchend = 0,
            xCoordOfLastSlide = 0,
            wrapperWidth = wrapper.getBoundingClientRect().right,
            sliderWidth = slider.getBoundingClientRect().width;
        slider.style.transform = `translate3d( 0px, 0px, 0px)`;

        let endTransformWidth = (sliderWidth - wrapperWidth) + 51;

        wrapper.addEventListener("touchstart", e => {
            touchstart = e.targetTouches[0].screenX;

            wrapper.addEventListener("touchmove", e => {
                if (count < -10) count = -10;
                xCoordOfLastSlide = slider.lastElementChild.getBoundingClientRect().right;

                if (e.targetTouches[0].screenX > xcoord) {
                    xcoord = e.targetTouches[0].screenX;
                    slider.style.transform = `translate3d( -${(count -= 3)}px, 0px, 0px)`;
                }

                if (e.targetTouches[0].screenX < xcoord) {
                    if (xCoordOfLastSlide <= wrapperWidth) return false;
                    xcoord = e.targetTouches[0].screenX;
                    slider.style.transform = `translate3d( -${(count += 3)}px, 0px, 0px)`;
                }
            });
        });

        wrapper.addEventListener("touchend", e => {
            touchend = e.changedTouches[0].screenX;
            let num = 0;
            if (touchend !== 0) {
                function afterSlick() {
                    let difference = (touchstart - touchend) / 15;
                    num = difference / 2;
                    if (difference > 0) {
                        if (xCoordOfLastSlide <= wrapperWidth) return false;
                        if ((count + num) > endTransformWidth) return false;
                        slider.style.transform = `translate3d( -${(count = (xCoordOfLastSlide <= wrapperWidth) ? count : count + num)}px, 0px, 0px)`;
                    }
                    if (difference < 0) {
                        slider.style.transform = `translate3d( -${(count = count + num)}px, 0px, 0px)`;
                    }

                }

                let timerId = setInterval(afterSlick, 10);
                setTimeout(function () {
                    clearInterval(timerId);
                }, 400);
            }
        });
    } else return false;
}

function footerBlock () {
        let slider = document.querySelector(".footer__scenaries"),
            wrapper = document.querySelector(".footer__wrap-container"),
            count = 0,
            xcoord = 0,
            touchstart = 0,
            touchend = 0,
            xCoordOfLastSlide = 0,
            wrapperWidth = wrapper.getBoundingClientRect().right,
            sliderWidth = slider.getBoundingClientRect().width;

        let endTransformWidth = (sliderWidth - wrapperWidth) + 220;
    slider.style.transform = `translate3d( 0px, 0px, 0px)`;
        wrapper.addEventListener("touchstart", e => {
            touchstart = e.targetTouches[0].screenX;

            wrapper.addEventListener("touchmove", e => {
                if (count < -5) count = 0;
                xCoordOfLastSlide = slider.lastElementChild.getBoundingClientRect().right;

                if (e.targetTouches[0].screenX > xcoord) {
                    xcoord = e.targetTouches[0].screenX;
                    slider.style.transform = `translate3d( -${(count -= 3)}px, 0px, 0px)`;
                }

                if (e.targetTouches[0].screenX < xcoord) {
                    if (xCoordOfLastSlide <= wrapperWidth) return false;
                    xcoord = e.targetTouches[0].screenX;
                    slider.style.transform = `translate3d( -${(count += 3)}px, 0px, 0px)`;
                }
            });
        });

        wrapper.addEventListener("touchend", e => {
            touchend = e.changedTouches[0].screenX;
            let num = 0;
            if (touchend !== 0) {
                function afterSlick() {
                    let difference = (touchstart - touchend) / 15;
                    num = difference / 2;
                    if (difference > 0) {
                        if (xCoordOfLastSlide <= wrapperWidth) return false;
                        if ((count + num) > endTransformWidth + 220) return false;
                        slider.style.transform = `translate3d( -${(count = (xCoordOfLastSlide <= wrapperWidth) ? count : count + num)}px, 0px, 0px)`;
                    }
                    if (difference < 0) {
                        slider.style.transform = `translate3d( -${(count = count + num)}px, 0px, 0px)`;
                    }

                }

                let timerId = setInterval(afterSlick, 10);
                setTimeout(function () {
                    clearInterval(timerId);
                }, 400);
            }
        });
}

