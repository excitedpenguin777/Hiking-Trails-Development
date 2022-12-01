import {Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, useCallback} from "react";
import trailData from "./assets/trail-data.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TrailItem from "./components/TrailItem";
import CompletedTrails from "./components/CompletedTrails";
import Filters from "./components/Filters";

function App() {
  //List of items which are filtered and sorted
  const [trailList, setTrailList] = useState(trailData);
  const [sortType, setSortType] = useState("None");
  const [beginner, setBeginner] = useState(false);
  const [bikeFriendly, setBikeFriendly] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [trailsCompleted, setTrailsCompleted] = useState({});
  const [totalDistance, setTotalDistance] = useState(0);

  const updateFilter = useCallback((type) => {
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
  }, [beginner, completed, bikeFriendly]);

  const toggleCompleted = useCallback((item) => {
    const { id, distance } = item;
    const newTrailsCompleted = { ...trailsCompleted };

    if (id in newTrailsCompleted) {
      delete newTrailsCompleted[id];
      const newDistance = totalDistance - distance;
      setTotalDistance(newDistance);
    } else {
      newTrailsCompleted[id] = item.name;
      const newDistance = totalDistance + distance;
      setTotalDistance(newDistance);
    }
    setTrailsCompleted(newTrailsCompleted);
  }, [trailsCompleted, totalDistance]);

  const matchesFilterType = useCallback((item) => {
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
  }, [beginner, bikeFriendly]);

  const sort = useCallback((list) => {
    const newList = [...list];
    if (sortType === "Alphabetical") {
      newList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "Distance") {
      newList.sort((a, b) => a.distance - b.distance);
      // No sort (original state, sorts by ID)
    } else {
      newList.sort((a, b) => a.id - b.id);
    }
    setTrailList(newList);
  }, [sortType]);

  const updateSort = useCallback((type) => {
    if (type === "None") {
      setSortType("None")
    } 
    else if (type === "Distance"){
      setSortType("Distance")
    }
    else {
      setSortType("Alphabetical")
    }
  }, []);

  const resetItems = useCallback(() => {
    setBeginner(false);
    setBikeFriendly(false);
    setCompleted(false);
    setSortType("None");
  }, []);

  const clearTrailsCompleted = useCallback(() => {
    setTotalDistance(0);
    setTrailsCompleted({});
  }, []);

  useEffect(() => {
    const oldData = [...trailData];
    const newList = [];
    oldData.forEach((item) => {
      // Check for filter and if the completed aggregator has been checked. If it has been checked, see if the item has been added to completed items list.
      if (matchesFilterType(item) && (!completed || trailsCompleted[item.id])) {
        newList.push(item);
      }
    });
    sort(newList);
  }, [beginner, bikeFriendly, completed, sortType, trailsCompleted, matchesFilterType, sort]);

  return (
    <div>
      <h1> Hiking Trails</h1>
      <br></br>
      <Container>
        <Row>
          <Col sm={4}>
            <Filters
              updateFilter={updateFilter}
              updateSort={updateSort}
              resetItems={resetItems}
              sortType={sortType}
              bikeFriendly={bikeFriendly}
              beginner={beginner}
              completed={completed}
            />
            <h3> My Trails </h3>
            <CompletedTrails
              trails={trailsCompleted}
              distance={totalDistance}
              reset={clearTrailsCompleted}
            ></CompletedTrails>
          </Col>
          <Col sm={8}>
            <div className="TrailItemsContainer">
              {trailList.map((item) => (
                <div className="TrailItem">
                  <TrailItem
                    item={item}
                    key={item.id}
                    isCompleted={trailsCompleted[item.id]}
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
