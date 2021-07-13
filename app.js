//Event Listener for Button on UI
document.querySelector('.get-jokes').addEventListener('click', getJokes)

function getJokes(e) {
  //get the number entered in the input field
  //There is only one input field with type as number hence we grab it and also make sure that we receive a valid number as input
  const number = document.querySelector('input[type="number"]').value
  //create the XMLHTTP object for using API
  const xhr = new XMLHttpRequest()
  //Open the API URL in GET mode to get the jokes. Here number of jokes is specified by the user
  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true)

  //format the response from the API URL and display it on the UI
  xhr.onload = function() {
    //api output will be stored here. Later this value will be appended to the html ul
    let output = ''
    //make sure the response status is 200 Ok
    if(this.status === 200) {
      //the response is received as JSON strings, we parse it as a Javascript Object
      const response = JSON.parse(this.responseText)
      //check if the response received is a success
      if(response.type === 'success') {
        //the jokes are stored in the values array that is within response
        //we access them by using forEach loop and add it to output
        response.value.forEach((Jokes) => {
          output += `<li>${Jokes.joke}</li>`
        })
      } else {
        //response.type is not success
        output = `<li>Something went Wrong!</li>`
      }
    } 
    //append the output to the html to show if the DOM
    document.querySelector('.jokes').innerHTML = output
  }

  //send the output to DOM
  xhr.send()
  e.preventDefault()
}