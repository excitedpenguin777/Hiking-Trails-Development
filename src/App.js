import {Button, Container, Row, Col} from 'react-bootstrap';
import {useState, useEffect} from "react";
import trailData from "./assets/trail-data.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import TrailItem from './components/TrailItem'

function App() {

  const [cart, setCart] = useState([]);
  const [beginner, setBeginner] = useState(false);
  const [bikeFriendly, setBikeFriendly] = useState(false);
  const [trailList, setTrailList] = useState(trailData)

  const updateFilter = (type) => {
    console.log(bikeFriendly);
    if (type === "Beginner") {
      const isSet = beginner
      setBeginner(!isSet)
    } else {
      const isSet = bikeFriendly
      setBikeFriendly(!isSet)
    }
  }

  const matchesFilterType = item => {
    // all items should be shown when no filter is selected
    if(!beginner && !bikeFriendly) { 
      return true
    } else if (beginner && bikeFriendly) {
      if (item.difficulty === "Beginner" && item.bike_friendly) {
        return true
      }
    } else if (beginner) {
      if (item.difficulty === "Beginner") {
        return true
      }
    } else if (item.bike_friendly){
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    const newList = []
    trailData.map((item, index) => {
      if(matchesFilterType(item)) {
        newList.push(item)
        console.log("Matches");
      }
    })
    setTrailList(newList);
    }, [beginner, bikeFriendly]);

  return (
    <div>
      <h1> Hiking Trails</h1>
     <Container>
       <Row>
         <Col sm={4}> 
         <input type='checkbox' name='filter1' id='Beginner' value='Beginner' onChange={() => updateFilter("Beginner")}/>
         <label for="Hello"> Beginner</label>
         <br></br>
         <input type='checkbox' name='filter1' id='Bike-friendly' value='Bike-friendly' onChange={() => updateFilter("BikeFriendly")}/>
         <label for="World"> Bike-friendly</label>
         </Col>
         <Col sm={8}>
           <div className='TrailItemsContainer'>
         {trailList.map((item, index) => (
        <div className="TrailItem">
        <TrailItem item={item} index={index} key={index}/>
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
