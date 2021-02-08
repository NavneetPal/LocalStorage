const loginForm=document.querySelector('#loginForm');

const users=JSON.parse(localStorage.getItem('users'));

/* When login form is submitted we have to check whether the user is admin or subUser
who is login the redirecting to that particular page */

loginForm.addEventListener('submit',function(e){
    e.preventDefault();
    const email=loginForm.elements.email.value;
    const password=loginForm.elements.password.value;

    let admin=JSON.parse(localStorage.getItem('admin'));
    if(email===admin.email && password==admin.password){
        window.location = "dashboard.html"
    }

    for(let i=0;i<users.length;i++){
        if(users[i].email===email && users[i].password===password){
            let subUser=users[i];
            let subUser_serialized=JSON.stringify(subUser);
            localStorage.setItem('subUser',subUser_serialized);


            let userSessions=localStorage.getItem('userSessions');
            if(userSessions===null){
                userSessionsObj=[];
            }else{
                userSessionsObj=JSON.parse(userSessions);
            }
            let date=new Date();
            let months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
            let monthname=months[date.getMonth()];
            let loginDate=`${date.getDate()}-${monthname}-${date.getFullYear()}  ${formatAMPM(date)}`;
            let logoutDate=null;

            const usersession={
                name:subUser.name,
                loginDate:loginDate,
                logoutDate:logoutDate
            }

            userSessionsObj.push(usersession);
            localStorage.setItem('userSessions',JSON.stringify(userSessionsObj));

            window.location="sub-user.html";
        }
    }

})

//To get the time in AM or PM 
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }