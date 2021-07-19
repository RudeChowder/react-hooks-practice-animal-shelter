import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  const petsURL = "http://localhost:3001/pets"

  const handleChangeType = (event) => {
    setFilters({ type: event.target.value })
  }

  const handleFindPetsClick = () => {
    const queryURL = `${petsURL}${filters.type !== "all" ? "?type=" + filters.type : ""}`
    console.log(queryURL)
    fetch(queryURL)
      .then(resp => resp.json())
      .then(data => setPets(data))
  }

  const handleAdoptPet = (id) => {
    const updatedPets = pets.map(pet => {
      if (id === pet.id) { return {...pet, isAdopted: true}}
      else { return pet}
    })
    setPets(updatedPets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleChangeType} onFindPetsClick={handleFindPetsClick} type={filters.type}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
