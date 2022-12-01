function CompletedTrails(props) {

    const {distance, trails} = props
  
    return (
      <div>
        <h4>Total Distance Hiked: {Math.abs(distance).toFixed(1)}</h4>
        <h4> Trails Completed: </h4>
        {Object.values(trails).map((trail) => (
            <h3> {trail} </h3>
        ))}
      </div>
    );
  }
  
  export default CompletedTrails;