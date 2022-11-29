import { Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import trailData from "./assets/trail-data.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TrailItem from "./components/TrailItem";

function App() {
  //List of items which are filtered and sorted
  const [trailList, setTrailList] = useState(trailData);
  const [sortType, setSortType] = useState("Alphabetical");
  const [beginner, setBeginner] = useState(false);
  const [bikeFriendly, setBikeFriendly] = useState(false);
  const [cart, setCart] = useState([]);

  const updateFilter = (type) => {
    console.log(bikeFriendly);
    if (type === "Beginner") {
      const isSet = beginner;
      setBeginner(!isSet);
    } else {
      const isSet = bikeFriendly;
      setBikeFriendly(!isSet);
    }
  };

  const matchesFilterType = (item) => {
    // all items should be shown when no filter is selected
    if (!beginner && !bikeFriendly) {
      return true;
    } else if (beginner && bikeFriendly) {
      if (item.difficulty === "Beginner" && item.bike_friendly) {
        return true;
      }
    } else if (beginner) {
      if (item.difficulty === "Beginner") {
        return true;
      }
    } else if (item.bike_friendly) {
      return true;
    } else {
      return false;
    }
  };

  const sortBy = (list) => {
    const newList = [...list];
    if (sortType === "Alphabetical") {
      newList.sort((a, b) => a.name.localeCompare(b.name));
      // sorting by distance
    } else {
      newList.sort((a, b) => a.distance - b.distance);
    }
    setTrailList(newList);
  };

  useEffect(() => {
    const oldData = [...trailData];
    const newList = [];
    oldData.map((item, index) => {
      if (matchesFilterType(item)) {
        newList.push(item);
        console.log("Matches");
      }
    });
    sortBy(newList);
  }, [beginner, bikeFriendly, sortType]);

  return (
    <div>
      <h1> Hiking Trails</h1>
      <br></br>
      <Container>
        <Row>
          <Col sm={4}>
            <h3> Sort By</h3>
            <input
              type="radio"
              name="sort"
              id="Alphabetical"
              onChange={() => setSortType("Alphabetical")}
              checked = {sortType === "Alphabetical"}
            />
            <label> Alphabetical Order</label>
            <br></br>
            <input
              type="radio"
              name="sort"
              id="Beginner"
              onChange={() => setSortType("Distance")}
            />
            <label> Distance</label>
            <br></br>
            <h3> Filters</h3>
            <input
              type="checkbox"
              name="beginnerFilter"
              id="Beginner"
              onChange={() => updateFilter("Beginner")}
            />
            <label> Beginner</label>
            <br></br>
            <input
              type="checkbox"
              name="bikeFilter"
              id="Bike-friendly"
              onChange={() => updateFilter("BikeFriendly")}
            />
            <label> Bike-friendly</label>
            <br></br>
            <h3> Other</h3>
            <input
              type="checkbox"
              name="completedFilter"
              id="Completed"
              onChange={() => console.log("Hello! Completed")}
            />
            <label> Completed</label>
          </Col>
          <Col sm={8}>
            <div className="TrailItemsContainer">
              {trailList.map((item, index) => (
                <div className="TrailItem">
                  <TrailItem item={item} index={index} key={index} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
