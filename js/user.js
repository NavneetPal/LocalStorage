showUsers();

//To display the admin name
const adminName=document.querySelector('#adminName');
const admin_deserialized=JSON.parse(localStorage.getItem('admin'));
adminName.innerText=`Hello, ${admin_deserialized.name}`;

//Eventlistener for adding the user to the localStorage
const userForm=document.querySelector('#userForm');
userForm.addEventListener('submit',function(e){
    e.preventDefault();
    let name=userForm.elements.name.value;
    let email=userForm.elements.email.value;
    let password=userForm.elements.password.value;
    let birthdate=userForm.elements.birthdate.value;
    let age=getAge(birthdate);

    const user={
        name:name,
        email:email,
        password:password,
        birthdate:birthdate,
        age:age
    }

    let users=localStorage.getItem('users');
    if(users==null){
        usersObj=[];
    }else{
        usersObj=JSON.parse(localStorage.getItem('users'));
    }

    usersObj.push(user);
    localStorage.setItem('users',JSON.stringify(usersObj));
    userForm.elements.name.value='';
    userForm.elements.email.value='';
    userForm.elements.password.value='';
    userForm.elements.birthdate.value='';
    showUsers();
})

//function to show all the user from the localStorage
function showUsers(){
    let users=localStorage.getItem('users');
    if(users==null){
        usersObj=[];
    }else{
        usersObj=JSON.parse(localStorage.getItem('users'));
    }

    let html='';
    usersObj.forEach(function(user,index){
        html+=`
        <tr>
        <td>${user.name}</td>
        <td><a href="#">${user.email}</a></td>
        <td>${user.password}</td>
        <td>${user.birthdate}</td>
        <td>${user.age}</td>
        <td><a href="#" id="${index}" onclick="updateUser(this.id)" class="edit">Edit</a>&nbsp;&nbsp;<a href="#" id="${index}" onclick="deleteUser(this.id)" class="delete">Delete</a></td>
        </tr> 
        `
    })

    const tbody=document.querySelector('#tbody');
    if(usersObj.length!=0){
        tbody.innerHTML=html;
    }else{
        tbody.innerHTML=``;
    }
}


//function to delete a User
function deleteUser(index){
    let users=localStorage.getItem('users');
    if(users==null){
        usersObj=[];
    }else{
        usersObj=JSON.parse(users);
    }

    usersObj.splice(index,1);
    localStorage.setItem('users',JSON.stringify(usersObj));
    showUsers();
}

//function to update user
function updateUser(index){
    let users=localStorage.getItem('users');
    if(users==null){
        usersObj=[];
    }else{
        usersObj=JSON.parse(users);
    }
    document.querySelector('#name').value=usersObj[index].name;
    document.querySelector('#email').value=usersObj[index].email;
    document.querySelector('#password').value=usersObj[index].password;
    document.querySelector('#birthdate').value=usersObj[index].birthdate;

        const btn1=document.querySelector('#btn1');
        const btn2=document.querySelector('#btn2');
        btn1.style.display='none';
        btn2.style.display="block"; 
    
    btn2.addEventListener('click',function(){
        usersObj[index].name=document.querySelector('#name').value;
        usersObj[index].email=document.querySelector('#email').value;
        usersObj[index].password=document.querySelector('#password').value;
        usersObj[index].birthdate=document.querySelector('#birthdate').value;
        localStorage.setItem('users',JSON.stringify(usersObj));
        showUsers();
        btn1.style.display='block';
        btn2.style.display="none"; 
        document.querySelector('#name').value='';
        document.querySelector('#email').value='';
        document.querySelector('#password').value='';
        document.querySelector('#birthdate').value='';
    })
}



//function to get the age of user out of dateofbirth
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}










































































































































































/* const userForm=document.querySelector('#userForm');
const user_deserialized=JSON.parse(localStorage.getItem('users'));


const adminName=document.querySelector('#adminName');
const admin_deserialized=JSON.parse(localStorage.getItem('admin'));
adminName.innerText=`Hello, ${admin_deserialized.name}`;


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


const tbody = document.getElementById('tbody');

for (let i = 0; i < user_deserialized.length; i++) {
    if(user_deserialized[i].name===undefined){
        user_deserialized.splice(i,1);
        let users=JSON.stringify(user_deserialized);
        localStorage.setItem('users',users);
    }else{
        let tr="<tr>";
        tr+="<td class='name'>" + user_deserialized[i].name + "</td>"+ "<td><a href='#' class='email'>" + user_deserialized[i].email + "</a></td>"+ "<td class='password'>" + user_deserialized[i].password + "</td>"+ "<td class='birthdate'>" + user_deserialized[i].birthdate + "</td>"+ "<td>" + user_deserialized[i].age + "</td> "+ "<td><a href='#' class='edit'>Edit</a>&nbsp;&nbsp;<a href='#' class='delete'>Delete</a></td>"+"</tr>"; 
        tbody.innerHTML += tr; 
    }
   
}

const edits=document.querySelectorAll('.edit');
const deletedata=document.querySelectorAll('.delete');
for(let edit of edits){
    edit.addEventListener('click',function(){
        const btn1=document.querySelector('#btn1');
        const btn2=document.querySelector('#btn2');
        btn1.style.display='none';
        btn2.style.display="block"; 

        const data=edit.parentElement.parentElement;
        document.querySelector('#name').value=data.querySelector('.name').innerText;
        document.querySelector('#email').value=data.querySelector('.email').innerText;
        document.querySelector('#password').value=data.querySelector('.password').innerText;
        document.querySelector('#birthdate').value=data.querySelector('.birthdate').innerText;

        
        btn2.addEventListener('click',function(e){

            for(let i=0;i<user_deserialized.length;i++){
                if(data.querySelector('.name').innerText===user_deserialized[i].name){
                    user_deserialized[i].name=document.querySelector('.name').value;
                    user_deserialized[i].email=document.querySelector('.email').value;
                    user_deserialized[i].password=document.querySelector('.password').value;
                    user_deserialized[i].birthdate=document.querySelector('.birthdate').value;
                    let users=JSON.stringify(user_deserialized);
                    localStorage.setItem('users',users);
                }
            }
        })
            
        

        /* btn2.addEventListener('click',function(){
            for (let i = 0; i < user_deserialized.length; i++) {
                if(name===user_deserialized[i].name){
                    user_deserialized[i].name=document.querySelector('.name').value;
                    user_deserialized[i].email=document.querySelector('.email').value;
                    user_deserialized[i].password=document.querySelector('.password').value;
                    user_deserialized[i].birthdate=document.querySelector('.birthdate').value;
                    let users=JSON.stringify(user_deserialized);
                    localStorage.setItem('users',users);
                } 
            }
        }) */
/* 
       
    })
}













userForm.addEventListener('submit',function(e){
    e.preventDefault();
    const name=userForm.elements.name.value;
    const email=userForm.elements.email.value;
    const password=userForm.elements.password.value;
    const birthdate=userForm.elements.birthdate.value;
    let dob=new Date(birthdate);
    let month_diff = Date.now() - dob.getTime(); 
    let age_dt = new Date(month_diff); 
    let year = age_dt.getUTCFullYear();
    let age = Math.abs(year - 1970);  

    const user={
        name:name,
        email:email,
        password:password,
        birthdate:birthdate,
        age:age
    };

    const tbody = document.getElementById('tbody');
    let tr="<tr>";
    tr+="<td class='name'>" + name + "</td>"+ "<td><a href='#' class='email'>" + email + "</a></td>"+ "<td class='password'>" + password + "</td>"+ "<td class='birthdate'>" + birthdate + "</td>"+ "<td>" + age + "</td> "+ "<td><a href='#' class='edit'>Edit</a>&nbsp;&nbsp;<a href='#' class='delete'>Delete</a></td>"+"</tr>"; 
    tbody.innerHTML += tr; 

    document.querySelector('#name').value='';
    document.querySelector('#email').value='';
    document.querySelector('#password').value='';
    document.querySelector('#birthdate').value='';


    user_deserialized.push(user);
   localStorage.setItem("users",JSON.stringify(user_deserialized)); 
})






for(let data of deletedata){
    data.addEventListener('click',function(){
        const name=data.parentElement.parentElement.querySelector('.name').innerText;
        for (let i = 0; i < user_deserialized.length; i++) {
            if(name===user_deserialized[i].name){
                user_deserialized.splice(i,1);
                let users=JSON.stringify(user_deserialized);
                localStorage.setItem('users',users);
            } 
        }
    })
}
 */
 