function main() {
  const baseUrl = "https://newsapi.org/v2/";
  let baseUrlCategory = `${baseUrl}top-headlines?country=us&category=`;
  let baseUrlSearch = `${baseUrl}everything?q=`;

  const getNews = (url) => {
    // terdapat nilai null dari API
    fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": "a401d3edd5e6462db1c119c1301a27af",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        // Menghilangkan object yang jika terdapat nilai null
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          const notNull = responseJson.articles.filter((article) => {
            for (let key in article) {
              if (key !== "source" && article[key] === null) {
                return false;
              }
            }
            return true;
          });

          renderAllNews(notNull);
        }
      })
      .catch((error) => {
        showError(error);
      });
  };

  const getCategory = (category) => {
    baseUrlCategory = baseUrlCategory.replace(/category=[^&]*/, `category=${category}`);
    getNews(baseUrlCategory);
  };

  const getSearchNews = (keyword) => {
    baseUrlSearch = `${baseUrlSearch}${keyword}`;
    getNews(baseUrlSearch);
    baseUrlSearch = `${baseUrl}everything?q=`;
  };

  const renderAllNews = (News) => {
    const listNewsElement = document.getElementById("listNews");
    listNewsElement.innerHTML = "";

    News.forEach((news) => {
      listNewsElement.innerHTML += `<div class="col">
        <div class="card">
          <img src="${news.urlToImage}" class="card-img-top" alt="image" />
          <div class="card-body">
            <a href="${news.url}"><h5 class="card-title">${news.title}</h5></a>
            <h6 class="card-title">${news.author}</h6>
            <p class="card-text">${news.description}</p>
          </div>
        </div>
      </div>`;
    });
  };

  const showError = () => {
    document.body.innerHTML += `<div class="m-auto position-absolute top-50 start-50 translate-middle">
    <h1 class="text-center">Not Found</h1>
    <h1 class="text-center">Check your internet connection</h1>
  </div>`;
  };

  document.addEventListener("DOMContentLoaded", () => {
    const catGeneral = document.getElementById("categoryGeneral");
    const catBusiness = document.getElementById("categoryBusiness");
    const catEntertainment = document.getElementById("categoryEntertainment");
    const catHealth = document.getElementById("categoryHealth");
    const catScience = document.getElementById("categoryScience");
    const catSports = document.getElementById("categorySports");
    const catTechnology = document.getElementById("categoryTechnology");
    const inputSearch = document.getElementById("searchInput");
    const formSearch = document.getElementById("formSearch");

    catGeneral.addEventListener("click", (event) => {
      event.preventDefault();
      const category = "general";
      getCategory(category);
    });
    catBusiness.addEventListener("click", (event) => {
      event.preventDefault();
      const category = "business";
      getCategory(category);
    });
    catEntertainment.addEventListener("click", (event) => {
      event.preventDefault();
      const category = "entertainment";
      getCategory(category);
    });
    catHealth.addEventListener("click", (event) => {
      event.preventDefault();
      const category = "health";
      getCategory(category);
    });
    catScience.addEventListener("click", (event) => {
      event.preventDefault();
      const category = "science";
      getCategory(category);
    });
    catSports.addEventListener("click", (event) => {
      event.preventDefault();
      const category = "sports";
      getCategory(category);
    });
    catTechnology.addEventListener("click", (event) => {
      event.preventDefault();
      const category = "technology";
      getCategory(category);
    });

    formSearch.addEventListener("submit", (event) => {
      event.preventDefault();
      const search = inputSearch.value;
      getSearchNews(search);
    });

    getNews(baseUrlCategory);
  });
}

export default main;
