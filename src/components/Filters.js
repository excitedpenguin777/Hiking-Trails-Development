function Filters(props) {
  const {
    updateSort,
    updateFilter,
    resetItems,
    sortType,
    dogFriendly,
    accessible,
    completed,
  } = props;

  return (
    <div>
      <div className="sort">
        <h2> Sort By</h2>
        <input
          type="radio"
          name="sort"
          id="None"
          onChange={() => updateSort("None")}
          checked={sortType === "None"}
        />
        <label> None </label>
        <br></br>
        <br></br>
        <input
          type="radio"
          name="sort"
          id="Alphabetical"
          onChange={() => updateSort("Alphabetical")}
        />
        <label> Alphabetical Order</label>
        <br></br>
        <br></br>
        <input
          type="radio"
          name="sort"
          id="Beginner"
          onChange={() => updateSort("Distance")}
        />
        <label> Distance</label>
        <br></br>
      </div>
      <h2> Filter By</h2>
      <input
        type="checkbox"
        name="dogFriendlyFilter"
        id="DogFriendly"
        onChange={() => updateFilter("DogFriendly")}
        checked={dogFriendly === true}
      />
      <label> Dog Friendly</label>
      <br></br>
      <br></br>
      <input
        type="checkbox"
        name="accessibleFilter"
        id="accessible"
        onChange={() => updateFilter("Accessible")}
        checked={accessible === true}
      />
      <label> Accessible</label>
      <br></br>
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
      <br></br>
      <button className={"button"} onClick={resetItems}>
        Reset Items
      </button>
      <br></br>
    </div>
  );
}

export default Filters;
