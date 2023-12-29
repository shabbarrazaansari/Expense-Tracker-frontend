function onLoad() {
    const parentElem = document.getElementById('details');
    parentElem.innerHTML = '';
    const token = localStorage.getItem('token')
    const decodedToken = parseJwt(token);
    console.log(decodedToken)
    const isAdmin = decodedToken.ispremiumuser;
    if(isAdmin){
            showPremiumUser(isAdmin);
            showLeaderboad();
            download();
            
        }
     axios.get('http://localhost:1000/login/expense',{headers:{'Authorization':token}})
    .then(response=>{
        console.log(response)
        for (let i=0 ;i< response.data.length;i++ ) {
            showData(response.data[i]);
            
        }
    })
    
   
    
}
// function premiumFeatures(){
//     const 
// }
// parsing function
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function showPremiumUser(isAdmin) {
    document.getElementById('rzp-button1').style.visibility = 'hidden';
    document.getElementById('message').innerHTML = 'you are a premium user';
    document.getElementById('incomeDiv').style.display = 'block';
}

function expense(e) {
    e.preventDefault();
    // console.log(e);
   
    const amount = document.getElementById('amount').value;
    const income = document.getElementById('income').value
    const description = document.getElementById('description').value;
    const option = document.getElementById('selection').value;
    const token = localStorage.getItem('token')
    const date = document.getElementById('date').value;
    axios.post("http://localhost:1000/login/expense",{
        amount:amount,
        description:description,
        category:option,
        income:income,
        date:date


    },{headers:{'Authorization':token}})
    .then(response=>{
        if(response.status === 201){
            showData(response.data)
        }
        console.log(response.data)
        
    })
    .catch(err=>{
        console.log(err)
    })    
    
}
function showData(obj) {
    const parentElem = document.getElementById('details')
    const childElem = document.createElement('li')
    childElem.id =`expense${obj.id}`;
    childElem.className = "lists";
    childElem.innerHTML = `${obj.amount} -  ${obj.description} - ${obj.category}  <div> <button 
    onClick ='deleteExpense(event,${obj.id}) '> Delete
     </button></div>`;
    
    
    parentElem.appendChild(childElem);
    
}
function showLeaderboad() {
    const inputElement = document.createElement('input');
    inputElement.type = "button";
    inputElement.value = 'show leaderboard';
    inputElement.onclick = async()=>{
        const token = localStorage.getItem('token');
        const userLeaderboardData = await axios.get('http://localhost:1000/premium/showleaderboard',{headers:{'Authorization':token}});
        console.log(userLeaderboardData);
        var leaderboardElem = document.getElementById('leaderboard');
        userLeaderboardData.data.forEach((element )=> {
            leaderboardElem.innerHTML += `<li>Name - ${element.name} Total expense ${element.totalExpenses}`
        });
    }
    document.getElementById('message').appendChild(inputElement);
    
}
async function deleteExpense(e,expenseId) {

   const token = localStorage.getItem('token')  
   await axios.delete(`http://localhost:1000/login/expense/${expenseId}`,{headers:{'Authorization':token}})
   .then(response=>{
      console.log(response)
      const Elem = document.getElementById(`expense${expenseId}`);
    Elem.remove();
    
   })
   .then(err=>{
    console.log(err)
   })
    
}

window.addEventListener('load',onLoad)

document.getElementById('rzp-button1').onclick = async function(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
   
    const response = await axios.get('http://localhost:1000/login/purchase/premium',{headers:{'Authorization':token}})
    console.log(response);
    var options = {
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler": async function(response) {
          const res =  await axios.post('http://localhost:1000/login/purchase/updateTransaction',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
            },{headers:{'Authorization':token}})
            console.log(res.body)
            alert('you are a premium user now');
            document.getElementById('rzp-button1').style.visibility = 'hidden';
            document.getElementById('message').innerHTML = 'you are a premium user';
            document.getElementById('incomeDiv').style.display = 'block'
            
            localStorage.setItem('token',res.data.token)
            showLeaderboad();
            download();
            onLoad()
        },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    // e.preventDefault();
    rzp1.on('payment.failed',function(response){
        console.log(response)
        alert('something went wrong')
    })
}
function download() {
    const table = document.createElement('input');
    table.type = "button";
    table.value = 'Report';
    table.onclick = ()=>{
     
        window.location.href = "../table/table.html"
    }
    document.getElementById('message').appendChild(table);
}