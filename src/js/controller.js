import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

const controlRecipes = async function () {
  try {
    //load window Search data based on id
    const id = window.location.hash.slice(1);
    //console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    //0. update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //1. update the bookmarkView
    bookmarkView.update(model.state.bookmarks);

    //2. load the recipe
    await model.loadRecipe(id);

    //3. rendering te recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResult = async function () {
  try {
    // 1. get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2. load search result
    await model.loadSearchResults(query);

    // 3. render results
    // console.log(model.state.search.results);
    // console.log(model.getSearchResultsPage(1));
    resultsView.render(model.getSearchResultsPage());

    // render the initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  //render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings
  model.updateServings(newServings);

  //render the recipe
  //recipeView.render(model.state.recipe);

  //update recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);

  // update the recipe view
  recipeView.update(model.state.recipe);

  //render the bookmark view
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    //upload new recipe data
    await model.uploadRecipe(newRecipe);
    //console.log(model.state.recipe);

    //render the recipe
    recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderMessage();

    //render the bookmark view
    bookmarkView.render(model.state.bookmarks);

    //change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(`💥 ${err}`);
    addRecipeView.renderError(err.message);
  }
};
const newFeature = function () {
  console.log('Welcome to the application');
};
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
};
init();
