import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';

/**
 * GLOBAL STATE
 * - Seach object
 * - Current recipe object
 * - Liked recipes
 */
const state = {};
window.state = state;
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
        recipeView.clearResult();
        renderLoader(elements.recipe);

        // highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // create new recipe object
        state.recipe = new Recipe(id);
        try {
            // get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            alert('Error processing');
            console.log(err);
        }
    }
};

//  window.addEventListener('hashchange', controlRecipe);
//  window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));

/**
 * LIST CONTROLLER
 */

 const controlList = () => {
     // create a new list if there is none yet
     if(!state.list) {
         state.list = new List();
     }

     // add each ingredient to list
     state.recipe.ingredients.forEach(el => {
         const item = state.list.addItem(el.count, el.unit, el.ingredient);
         listView.renderItem(item);
     });
 };

//handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle delete event
    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete from state
        state.list.deleteItem(id);
        // delete from ui
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        // handle the count update
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
});


// handling recipe serving button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingIngredients(state.recipe);
    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    }

});