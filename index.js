function handleFormSubmit(event)
{
    event.preventDefault();
    const TableDetails = {
      price: event.target.price.value,
      dish: event.target.dish.value,
      table: event.target.table.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/962ae7dbb8304f338218e083000426a2/appointmentData",
        TableDetails
      )
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  
  } 
  window.addEventListener('DOMContentLoaded',()=>{
    axios.get("https://crudcrud.com/api/962ae7dbb8304f338218e083000426a2/appointmentData")
    .then((response) =>{
        for(let i=0; i<response.data.length; i++)
        {
            displayUserOnScreen(response.data[i])
        }
    } )
      .catch((error) => console.log(error));
  })
  function displayUserOnScreen(TableDetails) {
    // Clearing the input fields
    document.getElementById("price").value = "";
    document.getElementById("dish").value = "";
    document.getElementById("table").value = "";
    
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${TableDetails.price} - ${TableDetails.dish} - ${TableDetails.table}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector(`#${TableDetails.table}`);
    userList.appendChild(userItem);
  
    deleteBtn.addEventListener("click", function (event) {
        axios.delete(`https://crudcrud.com/api/962ae7dbb8304f338218e083000426a2/appointmentData/${TableDetails._id}`)
        .then((response) => console.log(response.data))
         .catch((error) => console.log(error));
         userList.removeChild(event.target.parentElement);
    });
  
    editBtn.addEventListener("click", function (event) {
      userList.removeChild(event.target.parentElement);
      document.getElementById("price").value = TableDetails.price;
      document.getElementById("dish").value = TableDetails.dish;
      document.getElementById("table").value = TableDetails.table;
      axios.delete(`https://crudcrud.com/api/962ae7dbb8304f338218e083000426a2/appointmentData/${TableDetails._id}`)
        .then((response) => console.log(response.data))
         .catch((error) => console.log(error));
    });
  }

