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
  const [completed, setCompleted] = useState(false)
  const [completedItems, setCompletedItems] = useState(new Array(trailData.length).fill(false));
  const [totalDistance, setTotalDistance] = useState(0);

  const updateFilter = (type) => {
    console.log(bikeFriendly);
    if (type === "Beginner") {
      const isSet = beginner;
      setBeginner(!isSet);
    } else if (type === "Completed") {
      const isSet = completed;
      setCompleted(!isSet);
    } else {
      const isSet = bikeFriendly;
      setBikeFriendly(!isSet);
    }
  };

  const toggleCompleted = (id, distance) => {
    const newCompletedItems = [...completedItems]
    const isCompleted = completedItems[id]
    // If completed before, subtract distance from total aggregated distance.
    if (isCompleted) {
      const newDistance = (totalDistance - distance)
      setTotalDistance(newDistance)
    // If not completed before, add distance
    } else {
      const newDistance = totalDistance + distance
      setTotalDistance(newDistance)
    }
    // Add or remove from completed, based on previous value
    newCompletedItems[id] = !isCompleted
    setCompletedItems(newCompletedItems);
    console.log("Distance" + distance)
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
    console.log(completed);
    const oldData = [...trailData];
    const newList = [];
    oldData.map((item) => {
      // Check for filter and if the completed aggregator has been checked. If it has been checked, see if the item has been added to completed items list. 
      if (matchesFilterType(item) && (!completed || completedItems[item.id])) {
        newList.push(item);
      }
    });
    sortBy(newList);
  }, [beginner, bikeFriendly, completed, sortType, completedItems]);

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
              checked={sortType === "Alphabetical"}
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
              onChange={() => updateFilter("Completed")}
            />
            <label> Completed</label>
            <br></br>
            <h5> Total distance hiked: {totalDistance.toFixed(1)} miles </h5>
          </Col>
          <Col sm={8}>
            <div className="TrailItemsContainer">
              {trailList.map((item) => (
                <div className="TrailItem">
                  <TrailItem
                    item={item}
                    key={item.id}
                    isCompleted={completedItems[item.id]}
                    toggleCompleted={toggleCompleted}
                  />
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
