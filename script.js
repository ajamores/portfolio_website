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


const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const projectInfo = document.querySelectorAll('.project-info');
let index = 0;

leftBtn.addEventListener('click' , () =>{
    console.log('left button pressed');
    index--;

    if(index < 0){
        index = projectInfo.length - 1
    }

    console.log("Index: " + index);

    projectInfo.forEach(project =>{
        project.classList.remove('active')
    })

    projectInfo[index].classList.add('active');

});

rightBtn.addEventListener('click' , () =>{
    console.log('right button pressed');
    index++;

    if(index >= projectInfo.length){
        index = 0;
    }

    console.log("Index: " + index);

    projectInfo.forEach(project =>{
        project.classList.remove('active')
    })

    projectInfo[index].classList.add('active');

});


const navLinks = document.querySelector('.nav-links');
const menuIcon = document.querySelector('#menu-icon');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}







