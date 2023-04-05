function main() {
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
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          renderAllNews(responseJson.articles);
        }
      })
      .catch((error) => {
        showError(error);
      });
  };

  // const onSearchClicked = async () => {
  //   try {
  //     const result = await DataSource.searchClub(inputSearch.value);
  //     renderResult(result);
  //   } catch (message) {
  //     fallbackResult(message);
  //   }
  // };

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
    let baseUrlCategory = "https://newsapi.org/v2/top-headlines?country=us&category=";

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
      baseUrlCategory = baseUrlCategory.replace(/category=[^&]*/, `category=${category}`);
      getNews(baseUrlCategory);
    });
    catBusiness.addEventListener("click", (event) => {
      event.preventDefault();
      const category = "business";
      baseUrlCategory = baseUrlCategory.replace(/category=[^&]*/, `category=${category}`);
      getNews(baseUrlCategory);
    });
    catEntertainment.addEventListener("click", (event) => {
      event.preventDefault();
      const category = "entertainment";
      baseUrlCategory = baseUrlCategory.replace(/category=[^&]*/, `category=${category}`);
      getNews(baseUrlCategory);
    });
    catHealth.addEventListener("click", (event) => {
      event.preventDefault();
      const category = "health";
      baseUrlCategory = baseUrlCategory.replace(/category=[^&]*/, `category=${category}`);
      getNews(baseUrlCategory);
    });
    catScience.addEventListener("click", (event) => {
      event.preventDefault();
      const category = "science";
      baseUrlCategory = baseUrlCategory.replace(/category=[^&]*/, `category=${category}`);
      getNews(baseUrlCategory);
    });
    catSports.addEventListener("click", (event) => {
      event.preventDefault();
      const category = "sports";
      baseUrlCategory = baseUrlCategory.replace(/category=[^&]*/, `category=${category}`);
      getNews(baseUrlCategory);
    });
    catTechnology.addEventListener("click", (event) => {
      event.preventDefault();
      const category = "technology";
      baseUrlCategory = baseUrlCategory.replace(/category=[^&]*/, `category=${category}`);
      getNews(baseUrlCategory);
    });

    formSearch.addEventListener("submit", (event) => {
      event.preventDefault();
      let news = "";
      news = inputSearch.value;
      baseUrlCategory = baseUrlCategory.replace("top-headlines?country=us&category=", `everything?q=${news}`);
      getNews(baseUrlCategory);
      console.log(baseUrlCategory);
    });

    getNews(baseUrlCategory);
  });
}

export default main;
