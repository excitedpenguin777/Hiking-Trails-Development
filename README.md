# Development

### Link to Deployed Website

https://excitedpenguin777.github.io/Hiking-Trails-Development

### Goal and Value of the Application

The goal of this application is to allow users to discover hiking trails in Rhode Island. Users can filter based on whether trails are ADA accessible, dog friendly, and/or completed, and sort trails by alphabetical order or distance. Users can also add trails that they have completed by clicking the "Add to Completed" button on a trail item card, which will update their total distance hiked. In order to remove trails from their list of completed trails, users can either click the "Reset Completed" button to remove all trails or click the "Remove from Completed" button on a trail item card. 

### Usability Principles Considered

Since filtering and sorting are they key actions of this app, I placed the sidebar containing these functions on the left of the webpage in order to establish this as a top-level component in the page hierarchy. I added the 'Reset Trails' button to give users an easier way to reset the sorts and filters they have selected; rather than unselecting each checkbox, a user can click this button. I also added a 'Reset Completed' button to allow users to clear their aggregated values with the click of a button, instead of going to each item card and clicking "Remove from Completed" button. In terms of layout, I used a flex display for the trail cards so that the webpage would be responsive to layouts of different dimensions. 

### Organization of Components

The `App.js` component is the top-level component that contains the other components on the webpage and the state variables for sorting, filtering, and aggregating trails. The `Filters.js` component contains the inputs and logic for filtering and sorting trails. The `CompletedTrails.js` component is the aggregator component that displays the aggregated value (total distance hiked) and the names of the trails that have been added to the completed trails list. Finally, `TrailItem.js` displays the trail item data and includes the button for adding or removing each trail to the aggregator. `App.js` instantiates and renders each individual `TrailItem.js` component based on the current filters and sort. 

### How Data is Passed Down Through Components

`App.js` passes down filtering and sorting functions and state variables determining which filter or sort is active as props to `Filters.js`. `App.js` passes down the list of aggregated hiking trails and the distance state variable to `CompletedTrails.js`. `App.js` passes down a function for adding/removing trail items to the aggregator and item data to `TrailItem.js`. 

### How the User Triggers State Changes

When a user clicks on a filter or sort, state variables in `App.js` are updated to represent the active filter or sort. For example, if a user checks the "Accessible" filter, the `accessible` state variable will be set to true to indicate that this filter is active. When a new filter or sort is selected, `useEffect` will update the `trailList` state variable, which represents the current visible trails, to include only the relevant trails. Clicking 'Reset Trails' will set all the filter variables to false and set the sort state variable to 'None'. A user can also trigger state changes by clicking the "Add/Remove to Completed" button. This will update the `trailsCompleted` state variable, which represents the current aggregated trail items, and the `totalDistance` state variable, which represents the aggregated value of the total distance of completed trails. Clicking the 'Reset Completed' button will reset these two state variables. 

### Sources

Trail data comes from https://www.bochnissansouth.com/blogbest-hiking-and-walking-trails-near-providence-ri/ and All Trails (https://www.alltrails.com/).