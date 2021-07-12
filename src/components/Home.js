import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MediasList from "./MediasList";
import SearchInput from "./SearchInput";
import SeeDetailsModal from "./SeeDetailsModal";
import "../index.css";
import Navbar from "./Navbar";

class Home extends React.Component {
  state = {
    search: "a",
    seriesList: [],
    moviesList: [],
    favorites: [],
    wallofShame: [],
    modalShow: false,
    currentlySelected: {},
    location: "",
  };

  //Provides the first request from the API in the first boot of the app
  componentDidMount = async () => {
    if (this.props.match.params.userId) {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/miewMovies/${this.props.match.params.userId}`
        );
        this.setState({
          favorites: [...response.data.favorites],
          wallofShame: [...response.data.wallofShame],
        });
      } catch (err) {
        console.error(err);
      }
    }
    this.handleSubmit();
  };

  
  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevState.favorites.length !== this.state.favorites.length ||
      prevState.wallofShame.length !== this.state.wallofShame.length
    ) {
      if (this.props.match.params.userId) {
        try {
          await axios.put(
            `https://ironrest.herokuapp.com/miewMovies/${this.props.match.params.userId}`,
            {
              favorites: this.state.favorites,
              wallofShame: this.state.wallofShame,
            }
          );
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  //Triggered by modifications in the search input, this method provides that the attribute search from the state keeps lined up with the value from the search input
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Whenever the user click the submit button, it will send a request to the API containing the title typed in the search input. It will also set the seriesList and moviesList from the state in order to match with the updated response from the API.
  handleSubmit = async () => {
    try {
      if (this.state.search) {
        const seriesResponse = await axios.get(
          `https://api.themoviedb.org/3/search/tv?api_key=fb6085b3d4ad95ab1d3aa53e10f5a5b8&query=${this.state.search}`
        );
        const moviesResponse = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=fb6085b3d4ad95ab1d3aa53e10f5a5b8&query=${this.state.search}`
        );

        this.setState({
          seriesList: [...seriesResponse.data.results],
          moviesList: [...moviesResponse.data.results],
          search: "",
        });
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Whenever a media is clicked this method will be called to show the modal containing the media's info and buttons for media management
  handleShow = (movie, contentLocation) => {
    this.setState({
      modalShow: true,
      currentlySelected: { ...movie },
      location: contentLocation,
    });
  };

  //Close the modal and reset the currently selected item to an empty object
  handleClose = () => {
    this.setState({
      modalShow: false,
      currentlySelected: {},
    });
  };

  // Whenever any of the 5 possibles buttons of the modal is clicked, this method will be called and perform the due action, removing the item from the previous location and sending it to the asked one.
  handleButtonModal = (event) => {
    if (this.state.location !== "searchList") {
      this.handleDelete();
    }
    let includes = false;
    switch (event.target.name) {
      case "toWatch":
        this.state.favorites.forEach((movie) => {
          if (movie.id === this.state.currentlySelected.id) {
            includes = true;
          }
        });
        if (!includes) {
          this.setState({
            favorites: [...this.state.favorites, this.state.currentlySelected],
          });
          includes = false;
        }
        this.handleClose();
        break;

      case "watched":
        this.state.wallofShame.forEach((movie) => {
          if (movie.id === this.state.currentlySelected.id) {
            includes = true;
          }
        });
        if (!includes) {
          this.setState({
            wallofShame: [
              ...this.state.wallofShame,
              this.state.currentlySelected,
            ],
          });
          includes = false;
        }
        this.handleClose();
        break;
      default:
        break;
    }
  };

  // Whenever the button delete is clicked, this method will be called.
  handleDelete = () => {
    // The switch bellow check the location of the media clicked and remove this from the respective list
    switch (this.state.location) {
      case "favorites":
        let newfavorites = this.state.favorites.filter(
          (movie) => movie.id !== this.state.currentlySelected.id
        );
        this.setState({ favorites: newfavorites });
        break;
      case "wallofShame":
        let newwallofShame = this.state.wallofShame.filter(
          (movie) => movie.id !== this.state.currentlySelected.id
        );
        this.setState({ wallofShame: newwallofShame });
        break;

      default:
        break;
    }
    this.handleClose();
  };

  render() {
    return (
      <div>
        <div className="container-fluid" style={{ paddingBottom: "100px" }}>
          <div className="logo">
            <h2 className="title" style={{ backgroundColor: "transparent" }}>Miew Movies</h2>
            {/* Search Input */}
            <SearchInput
              type="text"
              placeHolder="Search a title"
              ariaLabel="Text input search"
              name="search"
              value={this.state.search}
              handleChange={this.handleChange}
              handleClick={this.handleSubmit}
            />
          </div>
          {/* Contains all the lists shown in the home-screen */}
          <div className="container-fluid movie-app">
            {/* Series found List */}
            <MediasList
              location="searchSeries"
              contentList={this.state.seriesList}
              handleShow={this.handleShow}
              listTitle="Series"
            />
            {/* Movies found List */}
            <MediasList
              location="searchMovies"
              contentList={this.state.moviesList}
              handleShow={this.handleShow}
              listTitle="Movies and Documentaries"
            />
            {/* Want to watch List */}
            <MediasList
              location="favorites"
              contentList={this.state.favorites}
              handleShow={this.handleShow}
              listTitle="Favorites"
            />

            {/* Already watched List */}
            <MediasList
              location="wallofShame"
              contentList={this.state.wallofShame}
              handleShow={this.handleShow}
              listTitle="Wall of Shame"
            />
          </div>
          {/* See details Modal */}
          <SeeDetailsModal
            className="swipe"
            preventSwipe={["up", "down"]}
            show={this.state.modalShow}
            onHide={() => this.handleClose()}
            currentlySelected={this.state.currentlySelected}
            location={this.state.location}
            handleButtonModal={this.handleButtonModal}
            userId={this.props.match.params.id}
          />
        </div>
      </div>
    );
  }
}

export default Home;
