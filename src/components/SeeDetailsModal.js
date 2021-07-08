import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import history from "../history";
import { Swipeable, direction } from 'react-deck-swiper';
import "./modal.css"

const style = {
  backgroundColor: "#141414",
  color: "white",
};


  

// MODAL COMPONENT //
// The heart of the application. Contains all the necessary buttons to provide the media management. As a  functional component it peforms all the asked actions by lifting the state up
function SeeDetailsModal(props) {
  const handleOnSwipe = (swipeDirection) => {
    if (swipeDirection === direction.RIGHT) {
      // handle right swipe
      return;
    }

    if (swipeDirection === direction.LEFT) {
      // handle left swipe
      return;
    }
  }
 
  return (
    <Swipeable onSwipe={handleOnSwipe}>
    <Modal
      // onTouchMove={props.handleButtonModal}
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{
          padding: "0",
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          {props.currentlySelected.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${props.currentlySelected.backdrop_path}`}
              size="md"
              alt="Media poster"
            />
          ) : null}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={style}>
        <h3>
          {props.currentlySelected.name
            ? props.currentlySelected.name
            : props.currentlySelected.title}
        </h3>
        <p>{props.currentlySelected.overview}</p>
      </Modal.Body>
      {/* The modal footer holds all the buttons and check the status in which whichone of them should be shown*/}
      <Modal.Footer style={style}>
        {props.location !== "favorites" ? (
          <button
            type="button"
            name="toWatch"
            className="btn btn-success"
            style={{ fontSize: "12px" }}
            onClick={props.handleButtonModal}
          >
            Favorites
          </button>
        ) : null}

        {props.location !== "wallofShame" ? (
          <button
            type="button"
            name="watched"
            className="btn btn-primary"
            style={{ fontSize: "12px" }}
            onClick={props.handleButtonModal}
          >
            Wall of Shame
          </button>
        ) : null}
        {props.location !== "searchSeries" &&
        props.location !== "searchMovies" ? (
          <button
            type="button"
            name="delete"
            className="btn btn-danger"
            style={{ fontSize: "12px" }}
            onClick={props.handleButtonModal}
          >
            Delete
          </button>
        ) : null}
        {/* As a Link, the more info button changes the URL, redirecting the user to see the component seeMoreInfoDetails */}
        {props.location === "searchMovies" ||
        props.location === "searchSeries" ? (
          <Link
            to={
              history.location.pathname !== "/"
                ? `${history.location.pathname}details/${props.location}/${props.currentlySelected.id}`
                : `/details/${props.location}/${props.currentlySelected.id}`
            }
          ></Link>
        ) : null}
        {/* As a Link, the more info button changes the URL, redirecting the user to see the component seeMoreInfoDetails */}
        {props.location === "searchMovies" ||
        props.location === "searchSeries" ? (
          <Link
            to={
              history.location.pathname !== "/"
                ? `/details/${props.location}/${props.currentlySelected.id}`
                : `/details/${props.location}/${props.currentlySelected.id}`
            }
          >
            <button
              type="button"
              className="btn btn-light"
              style={{ fontSize: "12px" }}
              onClick={props.onHide}
            >
              More Info
            </button>
          </Link>
        ) : null}
      </Modal.Footer>
    </Modal>
    </Swipeable>
  );
}

export default SeeDetailsModal;
