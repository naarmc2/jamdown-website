//SCROLLBAR
  const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Handle scrollbar thumb drag
      scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
    const deltaX = e.clientX - startX;
    const newThumbPosition = thumbPosition + deltaX;
  
    // Ensure the scrollbar thumb stays within bounds
    const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
    const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

    scrollbarThumb.style.left = `${boundedPosition}px`;
    imageList.scrollLeft = scrollPosition;
  }
  
    // Remove event listeners on mouse up
    const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }
  
  // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
  
  // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
    button.addEventListener("click", () => {
    const direction = button.id === "prev-slide" ? -1 : 1;
    const scrollAmount = imageList.clientWidth * direction;
    imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
    });
  
  // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  }
  
  // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
    }
  
  // Call these two functions when image list scrolls
      imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      handleSlideButtons();
  });
  }
  
  window.addEventListener("resize", initSlider);
  window.addEventListener("load", initSlider);


//FOOTER
   const scriptURL = 'https://script.google.com/macros/s/AKfycbz2ENiuI4yWsjCWBQyjKFZSvopw4ar9x012M0XFAsylvL31RwJRCxP8eYJzl3ZRRWlz/exec'
   const form = document.forms['submit-to-google-sheet']
   const msg = document.getElementById("msg")

   form.addEventListener('email', e => {
     e.preventDefault()
     fetch(scriptURL, { method: 'POST', body: new FormData(form)})
       .then(response =>{
          msg.innerHTML = "Thank You For Subscribing"
          setTimeout(function(){
            msg.innerHTML = ""
          }, 8000)
          form.reset()
       })
       .catch(error => console.error('Error!', error.message))
   })



//Symbols Jump Highlighter
const targetDiv = document.getElementById('symbols'); // Replace with your div's ID
const anchorTags = targetDiv.querySelectorAll('a');

for (const anchor of anchorTags) {
  anchor.addEventListener('click', function(event) {
    const href = anchor.href;

    if (href.indexOf('#') !== -1) { // Check if href contains a # symbol
      const targetElementId = href.split('#')[1]; // Extract the ID after the #
      const targetElement = document.getElementById(targetElementId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        targetElement.classList.toggle('highlight-active');
      }
    }
  });
}



