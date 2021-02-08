

const userName=document.querySelector('#userName');
const subUser=JSON.parse(localStorage.getItem('subUser'));

//if the subuser has birthday we have to display "Happy Birthday"
userName.innerText=`Hello, ${subUser.name}`;
let date=new Date();
let userDate=new Date(subUser.birthdate);
if(date.getMonth()===userDate.getMonth() && date.getDate()===userDate.getDate()){
    document.querySelector('h3').style.display='block';
}



//handling when the user got logged out and taking the user session
const logout=document.querySelector("#logout");
logout.addEventListener('click',function(){
    let userSessions=localStorage.getItem('userSessions');
    let subUser=JSON.parse(localStorage.getItem('subUser'));
    if(userSessions===null){
        userSessionsObj=[];
    }else{
        userSessionsObj=JSON.parse(userSessions);
    }

    for(let userSession of userSessionsObj){
        if(userSession.logoutDate===null && userSession.name===subUser.name){
            let date=new Date();
            let months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
            let monthname=months[date.getMonth()];
            let logoutDate=`${date.getDate()}-${monthname}-${date.getFullYear()}  ${formatAMPM(date)}`;
            userSession.logoutDate=logoutDate;

            localStorage.setItem('userSessions',JSON.stringify(userSessionsObj));
        }
    }
    localStorage.removeItem('subUser');
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