(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
$(document).ready(function(){
  const menuBtn = document.querySelector('.ico-btn');
  let isMenuOpen = false;
  
  menuBtn.addEventListener('click', ()=>{
    isMenuOpen = !isMenuOpen;
    menuBtn.classList.toggle('is-active');
    $('header .holder nav').toggleClass('active');
  })



  var rellax = new Rellax('.img1');
  var rellax1 = new Rellax('.img2');
  var rellax2 = new Rellax('.img3');
  var rellax3 = new Rellax('.img4');
  var rellax4 = new Rellax('.img5');
  var rellax5 = new Rellax('.img6');
  var rellax6 = new Rellax('.img7');
  var rellax7 = new Rellax('.img8');
  var rellax8 = new Rellax('.img9');
  var rellax9 = new Rellax('.img10');

 setTimeout(() => {
   $('body').addClass('loaded');
 }, 300);
  $('.link').on('click', function(event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
		$('html, body').animate({scrollTop: top}, 800);
		setTimeout(function() {
			window.location = id;
		}, 700);
  });

  $('[data-modal-opener]').on('click', function() {
    $('.modal-form').addClass('active');
  });
  $('.modal-bg').on('click', function() {
    $('.modal-form').removeClass('active');
  });


    $('.mainbanner_slider').slick({
        infinite: true,
        arrows: false,
        dots:false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 4000
      });

      var swiper = new Swiper('.swiper-container', {
        // effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 3,
        initialSlide: 1,
        // coverflowEffect: {
        //   rotate: 5,
        //   stretch: 50,
        //   depth: 200,
        //   modifier: 1,
        //   slideShadows: false,
        // },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          319: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }
      });

});



// https://github.com/CompactJS/remap
const remap = (value, min, max, targetMin, targetMax) => {
    return targetMin + ((value - min) / (max - min)) * (targetMax - targetMin);
  };
  // https://github.com/CompactJS/random
  const random = (min, max) => {
    if (min === undefined) return Math.random();
    if (max === undefined) return Math.random() * min;
    if (min > max) return Math.random() * (min - max) + max;
    return Math.random() * (max - min) + min;
  };
  
  const Star = (context) => {
    let sx, sy, size;
    return {
      x: 0,
      y: 0,
      z: 0,
      color: "",
      speed: 2,
      updateOnScreen({ width, height }) {
        const relativeWidth = width + width / 2;
        const relativeHeight = height + height / 2;
        sx = remap(this.x / this.z, 0, 1, width / 2, relativeWidth);
        sy = remap(this.y / this.z, 0, 1, height / 2, relativeHeight);
        size = remap(this.z, -relativeWidth / 2, relativeWidth, 5, 0);
        this.z -= this.speed;
        if (this.z < 1) {
          this.z = random(relativeWidth);
        }
      },
      draw() {
        context.fillStyle = this.color;
        context.fillRect(sx, sy, size, size);
      },
      init({ x, y, z, color = "rgba(255,255,255,0.5)" }) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
      },
      outOfWindow({ width, height }) {
        return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
      }
    };
  };
  
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;
  
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  canvas.width = windowWidth;
  canvas.height = windowHeight;
  
  const stars = [];
  const starCount = (windowHeight * windowWidth) / 200;
  
  for (let i = 0; i < starCount; i++) {
    stars.push(Star(context));
  }
  
  stars.forEach((s) =>
    s.init({
      x: random(-centerX, centerX * 2),
      y: random(-centerY, centerY * 2),
      z: random(-centerX, centerX * 2)
    })
  );
  
  const draw = () => {
    context.fillStyle = "rgba(0,0,0,0.5)";
    context.fillRect(0, 0, windowWidth, windowHeight);
    stars.forEach((s) => {
      s.updateOnScreen({ width: windowWidth, height: windowHeight });
  
      s.draw();
    });
    requestAnimationFrame(draw);
  };
  
  window.addEventListener("resize", () => {
    canvas.width = windowWidth = window.innerWidth;
    canvas.height = windowHeight = window.innerHeight;
    centerX = windowWidth / 2;
    centerY = windowHeight / 2;
  });
  
  draw();
  
},{}]},{},[1]);
