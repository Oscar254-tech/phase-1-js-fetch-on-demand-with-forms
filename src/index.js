

const init = () => {
 
  const inputForm = document.querySelector("form");

  inputForm.addEventListener("submit", (event) => {
    
    event.preventDefault();

    const input = document.querySelector("input#searchByID");

    const movieId = input.value;

    fetch(`http://localhost:3000/movies/${movieId}`)
      .then((response) => {
       
        if (!response.ok) {
       
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
      })
      .then((data) => {
        

        const titleElement = document.querySelector("section#movieDetails h4");
        const summaryElement = document.querySelector("section#movieDetails p");

        
        if (data && data.title && data.summary) { 
          titleElement.innerText = data.title;
          summaryElement.innerText = data.summary;
        } else {
        
          titleElement.innerText = "Movie Not Found 🤷";
          summaryElement.innerText = "Please enter a valid ID.";
          console.error("Movie not found for ID:", movieId, data);
        }
      })
      .catch((error) => {
     
        console.error("Fetch error:", error);
        const titleElement = document.querySelector("section#movieDetails h4");
        const summaryElement = document.querySelector("section#movieDetails p");
        titleElement.innerText = "Error Fetching Movie ❗";
        summaryElement.innerText = "Could not retrieve movie details. Check console for more info.";
      });

 
    input.value = '';
  });
};

document.addEventListener("DOMContentLoaded", init);

