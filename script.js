window.addEventListener("load", function() {
  fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
    response.json().then(function(json) {
      //generating index randomly
      let index = Math.round(Math.random()*(json.length-1));
      document.getElementById("missionTarget").innerHTML=`<h2>Mission Destination</h2>
      <ol>
         <li>Name: ${json[index].name}</li>
         <li>Diameter: ${json[index].diameter}</li>
         <li>Star: ${json[index].star}</li>
         <li>Distance from Earth: ${json[index].distance}</li>
         <li>Number of Moons: ${json[index].moons}</li>
      </ol>
      <img src="${json[index].image}">`;
      const faultyItems = document.getElementById("faultyItems");
      const form = document.querySelector("form");
      const inputs = document.getElementsByTagName("input");
      for (const input of inputs){
        //when an input is clicked, the launchStatus is reseted and received value : Awaiting Information Before Launch
        input.addEventListener("click",function(){
          const launchStatus = document.getElementById("launchStatus");
          launchStatus.innerHTML = "Awaiting Information Before Launch";
          launchStatus.style.color = "black";
          faultyItems.style.visibility = "hidden";
        });
      }
      form.addEventListener("submit", function(event) {
        //validating there are no empty inputs
        const pilotName = document.querySelector("input[name=pilotName]").value;
        const copilotName = document.querySelector("input[name=copilotName]").value;
        const fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        const cargoMass = document.querySelector("input[name=cargoMass]").value;
        if (pilotName === "" || copilotName === "" ||
            fuelLevel === "" || cargoMass === "") {
          alert("All fields are required!");
        }else if(!isNaN(pilotName)){
          alert("Pilot name is invalid");
        }else if(!isNaN(copilotName)){
          alert("Co-pilot name is invalid");
        //validating fuel Level is a number 
        }else if (isNaN(fuelLevel)){
          alert("Fuel Level must be a number");
        //validating cargo Mass is a number  
        }else if (isNaN(cargoMass)){
          alert("Cargo Mass must be a number");
        }else if (Number(fuelLevel) < 10000 || Number(cargoMass) > 10000){
          faultyItems.style.visibility = "visible";
          const pilotStatus = document.getElementById("pilotStatus");
          pilotStatus.innerHTML = `Pilot ${pilotName} is ready for launch`;
          const copilotStatus = document.getElementById("copilotStatus");
          copilotStatus.innerHTML = `Co-pilot ${copilotName} is ready for launch`;
          const launchStatus = document.getElementById("launchStatus");
          launchStatus.innerHTML = "Shuttle not ready for launch";
          launchStatus.style.color = "red";
          const fuelStatus = document.getElementById("fuelStatus");
          if (Number(fuelLevel) < 10000){
            fuelStatus.innerHTML = "There is not enough fuel for the journey";
          }else{
            fuelStatus.innerHTML = "There is enough fuel for the journey";
          }
          const cargoStatus = document.getElementById("cargoStatus");
          if (Number(cargoMass) > 10000){
            cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
          }
          else{
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
          }
        //the shuttle is ready for launch
        }else {
          launchStatus.innerHTML = "Shuttle is ready for launch";
          launchStatus.style.color = "green";
        }
        event.preventDefault();
      });
    });
  });
});

