import React from 'react';
import { connect } from 'react-redux';
import { fetchRecipes, fetchRecipeById, createRecipe } from '../store/recipes/actions';

class Aside extends React.Component {
  render() {
    return (
      <aside>
        <button onClick={() => this.props.fetchRecipeById(2)}>get recipe</button>
        <button onClick={() => this.props.fetchRecipes()}>get recipes</button>
        <button onClick={() => this.props.createRecipe({
          url: 'www.google.com/yeag',
          title: 'new brand recipe',
          description: 'new brand recipe bla bla',
        })}>get recipes</button>
      </aside>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = {
  fetchRecipes: fetchRecipes,
  fetchRecipeById: fetchRecipeById,
  createRecipe: createRecipe,
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside);