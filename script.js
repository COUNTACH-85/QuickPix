const form = document.querySelector('.search');
const input = document.querySelector(".keyword");
const images = document.querySelectorAll("img");
images.forEach((img)=> img.style.display = "none");
const apiKey = "IGPVRNQ8CoJjGHSQk4uc91qfEAdDcgxNxFtb9juAIlk";
form.addEventListener("submit", (event)=> {
    event.preventDefault(); 
    images.forEach((img)=> img.style.display = "none");
    let query = input.value.trim();
    if (query === "") {
        alert("Please enter a search term");
        return;
    }    
    images.forEach((img) => img.src = "");
    fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=10&client_id=${apiKey}`)
    .then((r) => r.json())
    .then((data) => {
        if (data.results.length === 0) {
            alert("No images found!!!");
            return;
        }
        const myarr = data.results.map((dataobj) => dataobj.urls.regular);
        images.forEach((img, index) => {
            
              img.src = myarr[index];
              img.style.display = "block";
            
        });
    })
    .catch((error) => alert("Error generating images: ", error));
});
