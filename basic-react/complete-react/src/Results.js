import React from "react";
import pf from "petfinder-client";
import { Consumer } from "./SearchContext";
//import Songs from "./Songs";
import Pet from "./Pet";
import SearchBox from "./SearchBox";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

//Class component
//class App extends React.Component {
//handleTitleClick() {
//  alert("you clicked the title");
//}

//render() {
//return React.createElement("div", {}, [
//  React.createElement("h1", { onClick: this.handleTitleClick }, "Playlist"),
//  React.createElement("hr"),
//  React.createElement(Songs, {
//    name: "Barbazul",
//    album: "Glup",
//    interpreter: "Patricio Rey",
//    genero: "Rock",
//  }),
//  React.createElement(Songs, {
//    name: "Cantatas de Puentes Amarillos",
//    album: "Artaud",
//    interpreter: "Luis Alberto",
//    genero: "Rock",
//  }),
//]);
class Results extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.name);
    this.state = {
      pets: [],
    };
  }

  componentDidMount() {
    this.search();
  }
  search = () => {
    petfinder.pet
      .find({ output: "full", 
        location: this.props.shearchParams.location, 
        animal: this.props.shearchParams.animal,
        breed: this.props.shearchParams.breed })
      .then((data) => {
        let pets;

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({
          pets,
        });
      });
  }

  render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map((pet) => {
          let breed;

          if (Array.isArray(pet.breeds.breed)) {
            breed = [pet.breeds.breed.join(" ,")];
          } else {
            breed = pet.breeds.breed;
          }

          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

/*
 * function component
const App = () => {
    return React.createElement('div', {}, [
        React.createElement('h1', {}, 'Playlist'),
        React.createElement('hr'),
        React.createElement(Songs, {
            name:"Barbazul",
            album:"Glup",
            interpreter:"Patricio Rey",
            genero:"Rock"
        }),
        React.createElement(Songs, {
            name:"Cantatas de Puentes Amarillos",
            album:"Artaud",
            interpreter:"Luis Alberto",
            genero:"Rock"
        })
    ])
}*/

export default function ResultsWithCOntext(props) {
  return (
    <Consumer>
      {context => <Results {...props} shearchParams={context} />}
    </Consumer>
  )
};
