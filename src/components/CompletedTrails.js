function CompletedTrails(props) {
  const { distance, trails, reset } = props;

  return (
    <div>
      <h4>Total Distance Hiked: {Math.abs(distance).toFixed(1)}</h4>
      <h4> Trails Completed: </h4>
      {Object.values(trails).map((trail) => (
        <h3> {trail} </h3>
      ))}
      <button onClick={reset}> Reset Completed </button>
    </div>
  );
}

export default CompletedTrails;
