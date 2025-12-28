const experienceButtons = document.querySelectorAll('.experience-button')
const experienceItems = document.querySelectorAll('.experience-item')
const educationItems = document.querySelectorAll('.education-item')

experienceButtons.forEach((button, index) => {
    button.addEventListener('click', ()=> {
        
        //make each button not active
        experienceButtons.forEach(button=>{button.classList.remove('active')});
        
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
    })
});



