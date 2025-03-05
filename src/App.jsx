import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const originalPokemons = [
    "bulbasaur", "ivysaur", "charmander", "charmeleon", "squirtle", "wartortle", "caterpie", 
    "metapod", "weedle", "kakuna", "pidgey", "pidgeotto", "rattata", "raticate", "pikachu", "raichu", 
    "sandshrew", "sandslash", "nidoran-m", "nidorino", "nidoran-f", "nidorina", "zubat", 
    "golbat", "oddish", "gloom", "venonat", "venomoth", "diglett", "dugtrio", "meowth", 
    "persian", "psyduck", "golduck", "mankey", "primeape", "machop", "machoke", "geodude"
  ];
  const [pokemonImgs, setPokemonImgs] = useState({}); 
  const [shuffledPokemons, setShuffledPokemons] = useState([]);
  const [current, setCurrent] = useState(0);
  const [max, setMax] = useState(0);
  const [clickedPokemon,setClickedPokemon] = useState([]); 


  function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0,12);
  }

  useEffect(()=>{
    async function getAllPokemons(){
      const images = {};

      for (let pokemon of originalPokemons){
        try{
          let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(response=>response.json())
          images[pokemon]=(data.sprites.other["official-artwork"]["front_default"]);
        } catch {
          console.error("Error fetching Pokémon:", error);
        }
      }
      setPokemonImgs(images);
      setShuffledPokemons(shuffleArray(originalPokemons));
    }

    getAllPokemons();
  },[current]);

  useEffect(()=>{
    setMax(current)
  },[(current>max)]);

  const scoreCounter = (e)=>{
    let click= e.currentTarget.getAttribute("name");
    if (clickedPokemon.includes(click)){
      setCurrent(0);
      setClickedPokemon([]);
    } else {
      setClickedPokemon([...clickedPokemon, click])
      setCurrent(current+1);
    }
  }

  return(
    <>
      <div>
        <h1 style={{color: "white"}}>Memory Game</h1>
        <div style={{display:"flex", flexDirection:"column"}}>
          <p style={{color:"white"}}>current score: {current}</p>
          <p style={{color:"white"}}>max score: {max}</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent:"space-evenly" }}>
                {shuffledPokemons.map((pokemon) => (
                    pokemonImgs[pokemon] ? (
                      <div name={pokemon} key={pokemon} onClick={scoreCounter} style={{cursor:"pointer", display:"flex", flexDirection:"column", backgroundColor:"gray",  border: "1px offset red"}}>
                        <img src={pokemonImgs[pokemon]} alt={pokemon} style={{ width: "250px"}} />
                        <h2 >{pokemon}</h2>
                      </div>
                    ) : (
                      <p key={pokemon}>Loading {pokemon}...</p>
                    )
                ))}
      </div>

    </>
  )
 
};

export default App
