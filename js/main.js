//Sidebar

$(".menu-btn").click(function () {
  let width;

  width = $(".sidebarbody").css("width");

  if (width == "298px") {
    $(".sidebarbody").css("width", "0px");
  } else {
    $(".sidebarbody").css("width", "298px");
  }
});

//MainPart
class Main {
  constructor() {
    this.getMealByName("");
    this.showSearchInput();

    $(".Categories").click(() => {
      this.getCategories();
    });
    $(".Area").on("click", () => {
      this.getArea();
    });

    $(".Ingredients").click(() => {
      this.getIngredients();
    });
    $(".Contact").click(() => {
      this.showContacts();
    });
    //mainEvents
    $(".searchByNameInput").on("keyup", (e) => {
      this.getMealByName(e.target.value);
    });

    $(".searchByLetterInput").on("keyup", (e) => {
      this.getMealByFLetter(e.target.value);
    });

    $("body").on("click", ".card", (e) => {
      this.getMealById(e.currentTarget.dataset.id);
    });
  }

  showContacts() {
    let content = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
    $(".main").html(content);

    submitBtn = document.getElementById("submitBtn");

    document.getElementById("nameInput").addEventListener("focus", () => {
      nameInputTouched = true;
    });

    document.getElementById("emailInput").addEventListener("focus", () => {
      emailInputTouched = true;
    });

    document.getElementById("phoneInput").addEventListener("focus", () => {
      phoneInputTouched = true;
    });

    document.getElementById("ageInput").addEventListener("focus", () => {
      ageInputTouched = true;
    });

    document.getElementById("passwordInput").addEventListener("focus", () => {
      passwordInputTouched = true;
    });

    document.getElementById("repasswordInput").addEventListener("focus", () => {
      repasswordInputTouched = true;
    });
  }

  showSearchInput() {
    let content = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input class="searchByNameInput form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input maxlength="1" class="searchByLetterInput form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;
    $("#searchContainer").html(content);
    $(".main").html("");
  }

  displayMealDetails(meal) {
    //strIngredient key handeling
    let ingredinets = "";

    for (let i = 0; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredinets += `<li class="p-1 mx-2 alert alert-primary fs-6"> ${
          meal[`strMeasure${i}`]
        } ${meal[`strIngredient${i}`]} </li> `;
      }
    }

    //strTags key handeling
    let tags;
    if (meal.strTags) {
      tags = meal.strTags.split(",");
    } else {
      tags = [];
    }
    let strtags = ``;
    for (let i = 0; i < tags.length; i++) {
      strtags += `<li class="alert alert-danger mt-2 mx-2 p-1 fs-5 ">${tags[i]}</li>`;
    }

    //main content
    let content = `
      <div class="row text-white pt-5">
        <div class="col-md-4 ">
          <img class="w-100" src="${meal.strMealThumb}" alt="" />
          <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-7">
          <h2>Instructions</h2>
          <p>
            ${meal.strInstructions}
          </p>
          <h3>Area : <span class="small">${meal.strArea}</span></h3>
          <h3>Category : <span class="small">${meal.strCategory}</span></h3>
          <h3>
            Recipes :
            <ul class="d-flex list-unstyled flex-wrap mt-3 ">${ingredinets}</ul>
          </h3>
          <h3 class="mb-4">Tags: </h3>
          <ul class="d-flex list-unstyled flex-wrap mt-3 "> ${strtags}</ul>
          <div class="">
            <a class="btn btn-success" href="${meal.strSource}" target="_blank">Source</a>
            <a class="btn btn-danger" href="${meal.strYoutube}" target="_blank">YouTube</a>
          </div>
        </div>
      </div>
    `;
    $(".main").html(content);
  }

  displayMeals(data) {
    let databox = ``;
    for (let i = 0; i < data.length; i++) {
      databox += `
         <div class="col pb-3">
                     <div class="card" data-id=${data[i].idMeal}>
                        <img class="w-100" src="${data[i].strMealThumb}" alt="meal image">
                        <div class="card-content d-flex flex-column justify-content-center">
                           <h3>${data[i].strMeal}</h3>
                        </div>
                     </div>
        </div>
      `;
    }

    $(".main").html(
      `<div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 pt-5"> ${databox} </div>`
    );
  }

  displayCategories(Categories) {
    let content = ``;
    for (let i = 0; i < Categories.length; i++) {
      content += `
        <div class="col pb-3" onclick="start.getMealByCategorey('${
          Categories[i].strCategory
        }')">
          <div class="card bg-transparent border border-0">
            <img class="w-100" src="${
              Categories[i].strCategoryThumb
            }" alt="meal image" />
            <div
              class="card-content d-flex flex-column justify-content-center text-center"
            >
              <h3>${Categories[i].strCategory}</h3>
              <p>
              ${Categories[i].strCategoryDescription.slice(0, 150)}
              </p>
            </div>
          </div>
        </div>
      `;
      $(".main").html(
        `<div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2  pt-5"> ${content} </div>`
      );
    }
  }

  displayArea(areaArr) {
    let content = ``;
    for (let i = 0; i < areaArr.length; i++) {
      content += `  
        <div class="col pb-3" onclick="start.getMealByArea('${areaArr[i].strArea}')">
          <div class=" text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${areaArr[i].strArea}</h3>
          </div>
        </div>
      `;
      $(".main").html(
        `<div class="row row-cols-4 pt-5 text-white"> ${content} </div>`
      );
    }
  }

  displayIngredients(areaArr) {
    let content = ``;
    for (let i = 0; i < 25; i++) {
      content += `
        <div onclick="start.getMealByIngredient('${
          areaArr[i].strIngredient
        }')" class="col pb-3 ">
          <div class=" text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${areaArr[i].strIngredient}</h3>
            <p>${areaArr[i].strDescription.slice(0, 150)}</p>
          </div>
        </div>
      `;
      $(".main").html(
        `<div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 pt-5 text-white"> ${content} </div>`
      );
    }
  }

  async getCategories() {
    let x = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let data = await x.json();
    this.displayCategories(data.categories);
  }

  async getArea() {
    let x = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=Area`
    );
    let data = await x.json();
    this.displayArea(data.meals);
  }

  async getIngredients() {
    let x = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=Ingredients`
    );
    let data = await x.json();
    this.displayIngredients(data.meals);
  }

  async getMealByName(Name) {
    let x = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`
    );
    let data = await x.json();
    this.displayMeals(data.meals); //call
  }

  async getMealByFLetter(FLetter) {
    let x = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${FLetter}`
    );
    let data = await x.json();
    this.displayMeals(data.meals); //call
  }

  async getMealById(id) {
    let x = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    let data = await x.json();
    this.displayMealDetails(data.meals[0]);
  }

  async getMealByCategorey(CategoreyName) {
    let x = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${CategoreyName}`
    );
    let data = await x.json();
    console.log(data.meals);
    this.displayMeals(data.meals);
  }

  async getMealByArea(AreaName) {
    let x = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreaName}`
    );
    let data = await x.json();
    this.displayMeals(data.meals);
  }

  async getMealByIngredient(IngredientName) {
    let x = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngredientName}`
    );
    let data = await x.json();
    this.displayMeals(data.meals);
  }
}

//Start
let start = new Main();
