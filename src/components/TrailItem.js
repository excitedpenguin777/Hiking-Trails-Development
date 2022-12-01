function TrailItem(props) {

    const {image, name, bike_friendly, difficulty, description, distance} = props.item
  
    return (
      <div>
        <img src={image} alt={`${name}`} width={300} height={200} /> 
        <h2> {name} </h2>
        <h4> {bike_friendly ? 'Bike Friendly' : 'Not bike friendly'}  </h4>
        <h4> {difficulty} </h4>
        <h4> {distance} miles </h4>
        <h3> {description} </h3>
        <button onClick={() => props.toggleCompleted(props.item)}> {props.isCompleted ? 'Remove from Completed' : 'Add to Completed'} </button>
      </div>
    );
  }
  
  export default TrailItem;