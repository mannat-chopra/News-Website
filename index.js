const apiKey = '5ee6be48e3694ddab288623cbc71f7f6';

const blogContainer = document.querySelector(".mainContainer");
const searchfeild = document.querySelector("#SearchInput");
const searchBtn = document.querySelector("#searchButton");

async function fetchRamdomNews(){
    try {
        const apiURL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=9&apiKey=${apiKey}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error Fetching Random News", error);
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("newsCard");

        const img = document.createElement('img');
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement('h2');
        const trimmedTitle = article.title.length > 40 ? article.title.slice(0, 40) + "..." : article.title;
        title.textContent = trimmedTitle;

        const description = document.createElement('p');
        const trimmedDes = article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description;
        description.textContent = trimmedDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', function(){
            window.open(article.url, "_blank");
        });

        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRamdomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error Fetching Random News", error);
    }
})();

searchBtn.addEventListener('click', async function(){
    const query = searchfeild.value.trim();
    if (query != "") {
        try {
            const articles = await fetchNewsQuery(query); // Corrected to call the function
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

async function fetchNewsQuery(query) { // Corrected to accept query parameter
    try {
        const apiURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=9&apiKey=${apiKey}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error Fetching News by Query", error);
        return [];
    }
}
