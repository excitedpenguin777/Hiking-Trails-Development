function CompletedTrails(props) {
  const { distance, trails, reset } = props;

  return (
    <div>
      <h3>Total Distance Hiked: {Math.abs(distance).toFixed(1)} mi</h3>
      <h3> Trails Completed: </h3>
      {Object.values(trails).map((trail) => (
        <h4> {trail} </h4>
      ))}
      <button onClick={reset}> Reset Completed </button>
    </div>
  );
}

export default CompletedTrails;
