// import icons from '../img/icons.svg'; // Parcel 1
// import icons from 'url:../img/icons.svg'; // Parcel 2. Eliminate because the refactring for MVC
// Icons point to the Parcel file icons in dist folder
// console.log(icons);
// Polyfilling everything else
import 'core-js/stable';
// Polyfilling async
import 'regenerator-runtime/runtime';
// Refactoring for MVC
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// if (module.hot) {
//     module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log(
    '------------------------- Loading a Recipe from API -------------------------'
);

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;
        recipeView.renderSpinner();
        // 0) Update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());
        // 1) Updating bookmarks view
        bookmarksView.update(model.state.bookmarks);
        // 2) Loading recipe
        await model.loadRecipe(id);
        // 3) Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
        console.error(err);
    }
};

console.log(
    '------------------------- Implementing Search results - Part 1 -------------------------'
);
const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();

        // 1) Get search query
        const query = searchView.getQuery();
        if (!query) return;

        // 2) Load search results
        await model.loadSearchResults(query);

        // 3) Render results
        resultsView.render(model.getSearchResultsPage());

        // 4) Render initial pagination buttons
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
};

console.log(
    '------------------------- Implementing pagination - Part 2 -------------------------'
);

const controlPagination = function (gotoPage) {
    // 1. Render NEW results
    resultsView.render(model.getSearchResultsPage(gotoPage));
    // Render new pagination buttons
    paginationView.render(model.state.search);
};

console.log(
    '------------------------- Updating recipe serving -------------------------'
);

const controlServings = function (newServings) {
    // Update the recipe servings(in state)
    model.updateServings(newServings);
    // Update the recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
};

console.log(
    '------------------------- Implementing Bookmarks -------------------------'
);
const controlAddBookmark = function () {
    // 1. Add or remove a bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);
    // 2. Update recipeview
    recipeView.update(model.state.recipe);
    // Render the bookmarks
    bookmarksView.render(model.state.bookmarks);
};

console.log(
    '------------------------- Storing bookmarks with localstorage -------------------------'
);
const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};

console.log(
    '------------------------- Uploading a new recipe -------------------------'
);

const controlAddRecipe = async function (newRecipe) {
    try {
        // RenderSpinner
        addRecipeView.renderSpinner();
        // Upload the new recipe data
        await model.uploadRecipe(newRecipe);
        // Render recipe
        recipeView.render(model.state.recipe);
        // Success message
        addRecipeView.renderMessage();
        // Render bookmark view
        bookmarksView.render(model.state.bookmarks);
        // Change ID in URL ==> hash
        window.history.pushState(null, '', `#${model.state.recipe.id}`);
        // window.history.back() // Back to the last page. Not in this situation
        // Close form window
        setTimeout(function () {
            addRecipeView.toggleWindow();
        }, MODAL_CLOSE_SEC * 1000);
    } catch (error) {
        console.error(error);
        addRecipeView.renderError(error.message);
    }
};

console.log(
    '------------------------- New feature branch -------------------------'
);

const newFeature = function () {
    console.log('Wellcome to the application!');
};

console.log(
    '------------------------- Event Handlers in MVC: Publisher-Suscriber pattern -------------------------'
);
const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
    newFeature();
};
init();

/*
Display number of total pages between the pagination buttons
Ability to sort search results by duration or number of ingredients
Perform ingredient validation in view, before submitting the form
Improve recipe ingredient input: separate in multiple fields and allow more than 6 ingredients
Shopping list feature: button on recipe to add ingredients to a list
Weekly meal planning feature: assign recipes to the next 7 days and show on a weekly calendar
Get nutrition data on each ingredient from spoonacular API (https:// spoonacular.com/food-api) and calculate total calories of recipe.
*/
