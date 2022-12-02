import { useState, useEffect, useCallback } from "react";
import trailData from "./trail-data.json";
import "./App.css";
import TrailItem from "./components/TrailItem";
import CompletedTrails from "./components/CompletedTrails";
import Filters from "./components/Filters";

function App() {
  //List of items which are filtered and sorted
  const [trailList, setTrailList] = useState(trailData);
  const [sortType, setSortType] = useState("None");
  const [dogFriendly, setDogFriendly] = useState(false);
  const [accessible, setAccessible] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [trailsCompleted, setTrailsCompleted] = useState({});
  const [totalDistance, setTotalDistance] = useState(0);

  const updateFilter = useCallback(
    (type) => {
      if (type === "DogFriendly") {
        const isSet = dogFriendly;
        setDogFriendly(!isSet);
      } else if (type === "Completed") {
        const isSet = completed;
        setCompleted(!isSet);
      } else {
        const isSet = accessible;
        setAccessible(!isSet);
      }
    },
    [dogFriendly, completed, accessible]
  );

  const toggleCompleted = useCallback(
    (item) => {
      const { id, distance } = item;
      const newTrailsCompleted = { ...trailsCompleted };
      // If we are toggling and the trail is already in this object, we want to remove the trail and remove the distance from total distance
      if (id in newTrailsCompleted) {
        delete newTrailsCompleted[id];
        const newDistance = totalDistance - distance;
        setTotalDistance(newDistance);
      // Add the trail and add distance
      } else {
        newTrailsCompleted[id] = item.name;
        const newDistance = totalDistance + distance;
        setTotalDistance(newDistance);
      }
      setTrailsCompleted(newTrailsCompleted);
    },
    [trailsCompleted, totalDistance]
  );

  const matchesFilterType = useCallback(
    (item) => {
      // all items should be shown when no filter is selected
      if (!dogFriendly && !accessible) {
        return true;
      } else if (dogFriendly && accessible) {
        if (item.dog_friendly && item.accessible) {
          return true;
        }
      } else if (dogFriendly) {
        if (item.dog_friendly) {
          return true;
        }
      } else if (item.accessible) {
        return true;
      } else {
        return false;
      }
    },
    [dogFriendly, accessible]
  );

  const sort = useCallback(
    (list) => {
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
    },
    [sortType]
  );

  const updateSort = useCallback((type) => {
    if (type === "None") {
      setSortType("None");
    } else if (type === "Distance") {
      setSortType("Distance");
    } else {
      setSortType("Alphabetical");
    }
  }, []);

  const resetItems = useCallback(() => {
    setDogFriendly(false);
    setAccessible(false);
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
  }, [completed, trailsCompleted, matchesFilterType, sortType, sort]);

  return (
    <div>
      <h1> Rhode Island Trails</h1>
      <br></br>
      <div className="App">
        <div className="LeftContainer">
          <div className="SideBar">
            <Filters
              updateFilter={updateFilter}
              updateSort={updateSort}
              resetItems={resetItems}
              sortType={sortType}
              accessible={accessible}
              dogFriendly={dogFriendly}
              completed={completed}
            />
            <h2> My Completed Trails </h2>
            <CompletedTrails
              trails={trailsCompleted}
              distance={totalDistance}
              reset={clearTrailsCompleted}
            ></CompletedTrails>
          </div>
        </div>
        <div className="RightContainer">
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
        </div>
      </div>
    </div>
  );
}

export default App;
