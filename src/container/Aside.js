import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/weeks/actions';
import * as recipesActions from '../store/recipes/actions';

class Aside extends React.Component {
  render() {
    return (
      <div>
        
        <aside>
          <button onClick={() => this.props.fetchWeeks()}>get weeks</button>
          <button onClick={() => this.props.fetchWeekById(3)}>get week by id</button>
          <button onClick={() => this.props.deleteWeek(7)}>delete week</button>
          <button onClick={() => this.props.createWeek({
            number: 15,
            year: 2018
          })}>create week</button>

          <button onClick={() => this.props.updateWeek({
            id: 6,
            number: 15,
            year: 2018
          })}>update week</button>
        </aside>

        <aside>
          <button onClick={() => this.props.fetchRecipes()}>get Recipes</button>
          <button onClick={() => this.props.fetchRecipeById(3)}>get Recipe by id</button>
          <button onClick={() => this.props.deleteRecipe(7)}>delete Recipe</button>
          <button onClick={() => this.props.createRecipe({
            title: 'Francesinha',
            url: 'www.francesinhavegan.com'
          })}>create Recipe</button>

          <button onClick={() => this.props.updateRecipe({
            id: 11,
            title: 'xóriço assado',
            url: 'www.assado.com'
          })}>update Recipe</button>
        </aside>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = {
  fetchWeeks: actions.fetchWeeks,
  fetchWeekById: actions.fetchWeekById,
  createWeek: actions.createWeek,
  deleteWeek: actions.deleteWeek,
  updateWeek: actions.updateWeek,

  fetchRecipes: recipesActions.fetchRecipes,
  fetchRecipeById: recipesActions.fetchRecipeById,
  createRecipe: recipesActions.createRecipe,
  deleteRecipe: recipesActions.deleteRecipe,
  updateRecipe: recipesActions.updateRecipe
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside);