showUserSessions();

const adminName=document.querySelector('#adminName');
const admin_deserialized=JSON.parse(localStorage.getItem('admin'));

adminName.innerText=`Hello, ${admin_deserialized.name}`





function showUserSessions(){
    let userSessions=localStorage.getItem('userSessions');
    if(userSessions===null){
        userSessionsObj=[];
    }else{
        userSessionsObj=JSON.parse(userSessions);
    }

    let html='';
    userSessionsObj.forEach(function(userSession,index){
        html+=`
            <tr>
            <td>${userSession.name}</td>
            <td>${userSession.loginDate}</td>
            <td>${userSession.logoutDate}</td>
            </tr>
        `
    })

    const tbody=document.querySelector('#tbody');
    if(userSessionsObj.length!=0){
        tbody.innerHTML=html;
    }else{
        tbody.innerHTML=``;
    }
}