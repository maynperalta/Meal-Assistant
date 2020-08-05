const MealCatalog = document.getElementById("MealCatalog");
const MealSearchresults = document.getElementById("MealSearchresults");
const MealDetails = document.getElementById("MealDetails");
const ReturnMealCatalog = document.getElementById("ReturnMealCatalog");

// Generates all meal categories
function GenerateMealCatagories() {
    const APIurl = "https://www.themealdb.com/api/json/v1/1/categories.php";

    $.ajax({
        url: APIurl,
        method: 'GET'
    }).then(function(response) {
        $(".MealCategories").append($("<h1>").text("Category List:"));
        for (i = 0; i < response.categories.length; i++) {
            var catagory = $("<div>");
            catagory.val(response.categories[i].strCategory)
            catagory.attr("class", "MealCategory")
            var title = $("<h2>").text(response.categories[i].strCategory);
            catagory.append(title);
            var description = $("<p>").text(response.categories[i].strCategoryDescription);
            catagory.append(description);
            var img = $("<img>").attr("src", response.categories[i].strCategoryThumb)
            catagory.append(img);
            $(".MealCategories").append(catagory);
        }

    });
}

// Generates all meal categories
function GenerateMealAreas() {
    var APIurl = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

    $.ajax({
        url: APIurl,
        method: 'GET'
    }).then(function(response) {
        $(".MealAreas").append($("<h1>").text('Areas List:'));
        for (i = 0; i < response.meals.length; i++) {
            var area = $("<div>");
            area.attr("class", "MealArea");
            area.val(response.meals[i].strArea);
            var title = $("<h2>").text(response.meals[i].strArea);
            area.append(title);
            $(".MealAreas").append(area);
        }
    });
}

// Generates list of all meal ingredeints
function GenerateMealIngredients() {
    var APIurl = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

    $.ajax({
        url: APIurl,
        method: 'GET'
    }).then(function(response) {
        $(".MealIngredientList").append($("<h1>").text("Ingredients List:"));
        for (i = 0; i < response.meals.length; i++) {
            var ul = $("<ul>")
            var ingredient = $("<li>").text(response.meals[i].strIngredient);
            ul.append(ingredient);
            $(".MealIngredientList").append(ul);
        }

    });
}

// Waits for HTML document to be ready before loading defaults
$(document).ready(function(){
    GenerateMealCatagories();
    GenerateMealAreas();
    GenerateMealIngredients();
});

// Meal category div click event listener
$(document).on('click','.MealCategory',function(){
    MealCatalog.classList.add("hidden");
    ReturnMealCatalog.classList.remove("hidden");
    MealSearchresults.classList.remove("hidden");
    var category = $(this).val();
    var APIurl = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category
    GenerateSearchResults(APIurl)
});

// Meal area div click event listener
$(document).on('click','.MealArea',function(){
    MealCatalog.classList.add("hidden");
    ReturnMealCatalog.classList.remove("hidden");
    MealSearchresults.classList.remove("hidden");
    var area = $(this).val();
    var APIurl = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area;
    GenerateSearchResults(APIurl);
});

// Random meal button click event listener
$(document).on('click','#MealRandomGenerator',function(){
    MealCatalog.classList.add("hidden");
    ReturnMealCatalog.classList.remove("hidden");
    MealSearchresults.classList.remove("hidden");
    var APIurl = "https://www.themealdb.com/api/json/v1/1/random.php";
    GenerateSearchResults(APIurl);
});

// Returns to meal area/category/random results listener
$(document).on('click','.ReturnMealResults',function(){
    MealDetails.classList.add("hidden");
    ReturnMealCatalog.classList.remove("hidden");
    MealSearchresults.classList.remove("hidden");
    $("#MealSource").html("");
    $("#MealVideo").html("");
    $("#MealIMG").attr("src", "");
    $("#IngredientList").html("");
});

// Meal Search Results click Event
$(document).on('click','.MealSearchResult',function(){
    var id = $(this).attr('id');
    var APIurl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
    ReturnMealCatalog.classList.add("hidden");
    MealSearchresults.classList.add("hidden");
    GenerateMealDetails(APIurl);
    MealDetails.classList.remove("hidden");
});

// Returns to meal catalog
$(document).on('click','#ReturnMealCatalog',function(){
    MealDetails.classList.add("hidden");
    MealSearchresults.classList.add("hidden");
    ReturnMealCatalog.classList.add("hidden");
    MealCatalog.classList.remove("hidden");
});