console.log("app.js loaded")

function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        console.log(data);
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        console.log(resultArray);
    });
}

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);
}

function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);
}

//add an event handler
function optionChanged(newSampleId) {
    console.log(`User Selected ${newSampleId}`)

    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
}

function InitDashboard() {
    console.log("InitDashboard()")

    // Populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(data => {
        // console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        // update the bar graph
        // Create a stub for the bargraph 

        var id = sampleNames[0];

        DrawBubblechart(id);
        DrawBargraph(id);
        ShowMetadata(id);

    });

    // update the bubblechart
    //update the demographic info


}

InitDashboard();