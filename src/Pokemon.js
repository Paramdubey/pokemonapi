import React, { useState, useEffect } from "react";
//import MockData from "./Mockdata";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles({
  margin: {
    marginLeft: "500px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  cardContent: {
    textAlign: "center",
  },
});
const Pokemon = (props) => {
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);
  const classes = useStyles();

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

    const toFirstCharUppercase = (name) =>
      name.charAt(0).toUpperCase() + name.slice(1);
    return (
      <div>
        <Typography variant="h1">
          {`${id}.`} {toFirstCharUppercase(name)}
        </Typography>
        <img
          className={classes.margin}
          style={{ width: "300px", height: "300px" }}
          src={fullImageUrl}
        />
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>
          {"Species: "}
          <Link href={species.url}>{species.name} </Link>
        </Typography>
        <Typography>Height: {height} </Typography>
        <Typography>Weight: {weight} </Typography>
        <Typography variant="h6"> Types:</Typography>
      </div>
    );
  };
  return (
    <div>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && (
        <Typography style={{ marginLeft: "500px" }}>
          {" "}
          Pokemon not found
        </Typography>
      )}
      {pokemon !== undefined && (
        <Button
          variant="contained"
          style={{ marginLeft: "500px" }}
          onClick={() => history.push("/")}
        >
          back to pokedex
        </Button>
      )}
    </div>
  );
};

export default Pokemon;
