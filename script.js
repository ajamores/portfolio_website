const experienceButtons = document.querySelectorAll('.experience-button')
const experienceItems = document.querySelectorAll('.experience-item')
const educationItems = document.querySelectorAll('.education-item')

experienceButtons.forEach((button, index) => {
    button.addEventListener('click', ()=> {
        
        //make each button not active
        experienceButtons.forEach(button=>{
            button.classList.remove('active');
            button.style.backgroundColor = 'white';
            button.style.color = 'black';
        });

        
        //except for the one pressed, cause remember we add event listener to each button 
        button.classList.add('active');


        const category = button.innerHTML
        console.log(category)

        if(category === 'Experience'){
            console.log("changing to experience")
            
            experienceItems.forEach(item=>{
                item.style.display = 'flex';
            });
            
            educationItems.forEach(item=>{
                item.style.display = 'none';
            })

        } else if(category ==='Education'){
            
            experienceItems.forEach(item=>{
                item.style.display = 'none';
            });

            educationItems.forEach(item=>{
                item.style.display='flex';
            });

        }

            button.style.backgroundColor = 'black';
            button.style.color = 'white';


    })
});


// ================== PROJECT CAROUSEL ==================
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const projectInfo = document.querySelectorAll('.project-info');
const indicators = document.querySelectorAll('.indicator');
let index = 0;

// Function to update active project and indicator
function updateActiveProject(newIndex) {
    // Update index
    index = newIndex;
    
    // Ensure index stays within bounds
    if (index < 0) index = projectInfo.length - 1;
    if (index >= projectInfo.length) index = 0;
    
    console.log("Index: " + index);
    
    // Remove active class from all projects
    projectInfo.forEach(project => {
        project.classList.remove('active');
    });
    
    // Add active class to current project
    projectInfo[index].classList.add('active');
    
    // Update indicators
    if (indicators.length > 0) {
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        indicators[index].classList.add('active');
    }
}

// Left button click
leftBtn.addEventListener('click', () => {
    console.log('left button pressed');
    updateActiveProject(index - 1);
});

// Right button click
rightBtn.addEventListener('click', () => {
    console.log('right button pressed');
    updateActiveProject(index + 1);
});

// Indicator clicks
if (indicators.length > 0) {
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            console.log(`indicator ${i} clicked`);
            updateActiveProject(i);
        });
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        leftBtn.click();
    } else if (e.key === 'ArrowRight') {
        rightBtn.click();
    }
});

// Touch/swipe for mobile
let touchStartX = 0;
let touchEndX = 0;
const carousel = document.querySelector('.proj-carosal');

if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next
            rightBtn.click();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous
            leftBtn.click();
        }
    }
}




// ================== MOBILE MENU ==================
const navLinks = document.querySelector('.nav-links');
const menuIcon = document.querySelector('#menu-icon');

if (menuIcon && navLinks) {
    menuIcon.onclick = () => {
        navLinks.classList.toggle('active');
    }
    
    // Close menu when clicking on a link (optional)
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}