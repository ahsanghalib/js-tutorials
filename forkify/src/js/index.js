import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/**
 * GLOBAL STATE
 * - Seach object
 * - Current recipe object
 * - Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();

    if (query) {
        // new search object and add to state
        state.search = new Search(query);

        // prepare ui for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);

        // search for recipes
        await state.search.getResults();

        // render results on ui
        clearLoader();
        searchView.renderResults(state.search.result);
    }
};

elements.searchBtn.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    // get id from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // prepare ui for chanages

        // create new recipe object
        state.recipe = new Recipe(id);
        try {
            // get recipe data
            await state.recipe.getRecipe();

            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render recipe
            console.log(state.recipe);
        } catch(err) {
            alert('Error processing');
        }
    }
};

//  window.addEventListener('hashchange', controlRecipe);
//  window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));