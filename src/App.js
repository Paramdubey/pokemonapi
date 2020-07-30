import React from "react";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import { Route, Switch } from "react-router-dom";

import StickyFooter from "./StickyFooter";
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Pokedex} />
        <Route
          exact
          path="/:pokemonId"
          render={(props) => <Pokemon {...props} />}
        />
      </Switch>
      <StickyFooter />
    </div>
  );
}

export default App;
