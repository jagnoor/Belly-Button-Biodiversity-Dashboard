console.log("app.js loaded")

function InitDashboard() {
    console.log("InitDashboard")

    // Populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(function(data) {
        console.log(data);
    });

    // update the bar graph
    //update the demographic info


}

InitDashboard();