
const adminForm=document.querySelector('#adminForm');
const registerBtn=document.querySelector('#registerBtn');



/* when form is submiited we are getting the details of admin and 
we are storing it in the local storage and if admin is already stored in local storage
then display the error */

adminForm.addEventListener('submit',function(e){
    e.preventDefault();
    const name=adminForm.elements.name.value;
    const email=adminForm.elements.email.value;
    const password=adminForm.elements.password.value;
    const confirmPassword=adminForm.elements.confirmPassword.value;
    const city=adminForm.elements.city.value;
    const state=adminForm.elements.state.value;

    if(password===confirmPassword){
        let admin={
            name:name,
            email:email,
            password:password,
            city:city,
            state:state
        }
        if(localStorage.getItem('admin')){
            alert("Admin already registered");
        }else{
            let admin_serialized=JSON.stringify(admin);
            localStorage.setItem("admin",admin_serialized);
            registerBtn.style.display="none"
            window.location = "login.html"
        }
        
    }else{
        document.querySelector('#warning').style.display="block";
    }
})