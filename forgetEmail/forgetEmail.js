function forgotpassword(event) {
    event.preventDefault();
            const email = document.getElementById('email').value;
            console.log(email);

    const userDetails = {
        email: email

    }
    // console.log(userDetails)
    axios.post('http://localhost:1000/forgotpassword',userDetails).then(response => {
        if(response.status === 200){
            document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
        } else {
            throw new Error('Something went wrong!!!')
        }
    }).catch(err => {
        console.log(err)
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}