function Filters(props) {

    const {updateSort, updateFilter, resetItems, sortType, beginner, bikeFriendly, completed} = props
  
    return (
      <div>
        <h3> Sort By</h3>
            <input
              type="radio"
              name="sort"
              id="None"
              onChange={() => updateSort("None")}
              checked={sortType === "None"}
            />
            <label> None </label>
            <br></br>
            <input
              type="radio"
              name="sort"
              id="Alphabetical"
              onChange={() => updateSort("Alphabetical")}
            />
            <label> Alphabetical Order</label>
            <br></br>
            <input
              type="radio"
              name="sort"
              id="Beginner"
              onChange={() => updateSort("Distance")}
            />
            <label> Distance</label>
            <br></br>
            <h3> Filter By</h3>
            <input
              type="checkbox"
              name="beginnerFilter"
              id="Beginner"
              onChange={() => updateFilter("Beginner")}
              checked={beginner === true}
            />
            <label> Beginner</label>
            <br></br>
            <input
              type="checkbox"
              name="bikeFilter"
              id="Bike-friendly"
              onChange={() => updateFilter("BikeFriendly")}
              checked={bikeFriendly === true}
            />
            <label> Bike-friendly</label>
            <br></br>
            <input
              type="checkbox"
              name="completedFilter"
              id="Completed"
              onChange={() => updateFilter("Completed")}
              checked={completed === true}
            />
            <label> Completed</label>
            <br></br>
            <button onClick={resetItems}> Reset Items </button>
            <br></br>
      </div>
    );
  }
  
  export default Filters;