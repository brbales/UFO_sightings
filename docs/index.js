// Set references to tbody elements for input fields and buttons
var $tbody = document.querySelector("tbody");
var $ufoInputDa = document.querySelector("#date");
var $ufoInputSt = document.querySelector("#state");
var $ufoInputCo = document.querySelector("#country");
var $ufoInputCi = document.querySelector("#city");
var $ufoInputSh = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

// Add listener to the searchButton, call when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set initial variable for dataset to be filtered
var sightings = dataSet;

// renders the filtered data to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < sightings.length; i++) {
    // target each dictionary as a row
    var sighting = sightings[i];
    var fields = Object.keys(sighting);
    // Create new row in the tbody, 
    var $row = $tbody.insertRow(i);
    // read through the row's dictionary to get cell data
    for (var j = 0; j < fields.length; j++) {
      // For field in row dict, create new cell containing the field data
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }
  console.log(sightings.length)
}

function handleSearchButtonClick() {
  // Format search terms by removing whitespace and make lowercase
  var filterDate = $ufoInputDa.value.trim();
  var filterState = $ufoInputSt.value.trim().toLowerCase();
  var filterCountry = $ufoInputCo.value.trim().toLowerCase();
  var filterCity = $ufoInputCi.value.trim().toLowerCase();
  var filterShape = $ufoInputSh.value.trim().toLowerCase();

  // Set sightings to array of all events matching the filters and assign blank input values conditionally
  sightings = dataSet.filter(function(sighting) {
    var ufoDate = filterDate != '' ? sighting.datetime : '';
    var ufoState = filterState != '' ? sighting.state.substring(0, filterState.length).toLowerCase() : '';
    var ufoCountry = filterCountry != '' ? sighting.country.substring(0, filterCountry.length).toLowerCase() : '';
    var ufoCity = filterCity != '' ? sighting.city.substring(0, filterCity.length).toLowerCase() : '';
    var ufoShape = filterShape != '' ? sighting.shape.substring(0, filterShape.length).toLowerCase() : '';

    if (ufoDate === filterDate && ufoState === filterState && ufoCountry === filterCountry && ufoCity === filterCity && ufoShape === filterShape) {
      return true;
    }
    return false;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();
