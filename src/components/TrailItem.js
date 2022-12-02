function TrailItem(props) {
  const {
    image,
    name,
    accessible,
    dog_friendly,
    description,
    distance,
  } = props.item;

  return (
    <div>
      <img
        src={process.env.PUBLIC_URL + `/assets/${image}`}
        alt={`${name}`}
        width={300}
        height={200}
      />
      <h3> {name} </h3>
      <h4> {distance} miles </h4>
      <h4>
        {accessible ? "Accessible" : ""} {dog_friendly ? "Dog Friendly" : ""}{" "}
      </h4>
      <p> {description} </p>
      <button onClick={() => props.toggleCompleted(props.item)}>
        {props.isCompleted ? "Remove from Completed" : "Add to Completed"}
      </button>
    </div>
  );
}

export default TrailItem;
