document.getElementById('getTable').addEventListener("click", getTable);
 async function getTable() {
    const token = localStorage.getItem('token')

     document.getElementById('getTable').style.visibility = 'hidden';
     document.getElementById('download').style.display = 'block';
   const response =  await axios.get('http://localhost:1000/login/expense',{headers:{'Authorization':token}});
   
    
      for (let i=0 ;i< response.data.length;i++ ) {
            showTable(response.data[i],i);
            // console.log(response)
            
        }
    
    
  }
  function showTable(response,i) {
    const table = document.getElementById('tableid');
    console.log(response);

    // Create a new table row
    const newRow = table.insertRow();

    // Add table cells (td) for each property in the response
    const dateCell = newRow.insertCell(0);
    const descriptionCell = newRow.insertCell(1);
    const categoryCell = newRow.insertCell(2);
    const incomeCell = newRow.insertCell(3);
    const expenseCell = newRow.insertCell(4);

    // Set the innerHTML of each cell with corresponding data from the response
    dateCell.innerHTML = response.date;
    descriptionCell.innerHTML = response.description;
    categoryCell.innerHTML = response.category;
    if (response.incomes && response.incomes.length > 0) {
        // Access the amount property from the first income
        incomeCell.innerHTML = response.incomes[0].amount;
    } else {
        incomeCell.innerHTML = ''; // Set to empty if no incomes
    }

    expenseCell.innerHTML = response.amount;

}
    document.getElementById('download').addEventListener('click', function () {
        // Get the HTML content of the entire page
        document.getElementById('download').style.display = 'none';
        // const pageContent = document.documentElement.outerHTML;
        const pageContent = 'Hello, this is the content to download.';

        // Create a Blob with the page content
        const blob = new Blob([pageContent], { type: 'text/html' });

        // Create a download link
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'downloaded_page.html';

        // Append the link to the body
        document.body.appendChild(a);

        // Programmatically click the link to trigger the download
        a.click();

        // Remove the link from the body
        document.body.removeChild(a);
    });


