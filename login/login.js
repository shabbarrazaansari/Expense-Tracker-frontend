function login(event) {
    event.preventDefault()
    const loginDetails = {
        email:event.target.email.value,
        password:event.target.password.value
    }
    console.log(loginDetails);
    axios.post('http://localhost:1000/user/login',loginDetails)
    .then(response=>{
        if(response.status===200){
            alert(response.data.message)
            localStorage.setItem('token',response.data.token)
            // const premium = parseJwt(response.data.token);
            // if(premium.ispremiumuser){
            //     window.location.href = "../premiumUi/premium.html"
            // }
            // else{
            //     window.location.href = "../expense/expense.html";
            // }
            window.location.href = "../expense/expense.html";
        }
    })
    .catch((err)=>{
        console.log(err)
        document.body.innerHTML += `<div style ="color:red">${err.response.data.message}</div> `
    })
}
// function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }