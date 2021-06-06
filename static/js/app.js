console.log("app.js loaded")

var url = 'data/samples.json'
// getting data from the json file
d3.json(url).then(function (data) {
    console.log(data)

    var names = data.names

    names.forEach(d => {
        d3.select('#selDataset').append('option').text(d).property('value', d)
    })

    // Getting the top 10 sample values
    var values = data.samples[0].sample_values.slice(0, 10).reverse()

    // get only top 10 otu ids for the plot OTU and reversing it. 
    var ids = data.samples[0].otu_ids.slice(0, 10).map(d => `OTU ${d}`)

    // Get the top 10 labels for the plot
    var labels = data.samples[0].otu_labels.slice(0, 10)

    // create trace for the plot
    var trace = {
        x: values,
        y: ids,
        text: labels,
        type: "bar",
        orientation: "h",
    }

    // Connect trace data 
    var plotData = [trace]

    // Create the bar plot
    Plotly.newPlot('bar', plotData)

    // Static bubble chart

    var bubbleValues = data.samples[0].sample_values
    var bubbleIds = data.samples[0].otu_ids
    var bubbleLabels = data.samples[0].otu_labels

    // Create trace for the plot
    var traceBubble = {
        x: bubbleIds,
        y: bubbleValues,
        mode: "markers",
        marker: {
            size: bubbleValues,
            color: bubbleIds
        },
        text: bubbleLabels

    }

    // Connect trace data
    var dataBubble = [traceBubble];

    var layoutBubble = {
        xaxis: {
            title: "OTU ID"
        }
    };

    // Create the bubble plot
    Plotly.newPlot('bubble', dataBubble, layoutBubble);

    // Static Demographics
    var demographicsID = data.metadata[0].id
    var demographicsEthnicity = data.metadata[0].ethnicity
    var demographicsGender = data.metadata[0].gender
    var demographicsAge = data.metadata[0].age
    var demographicsLocation = data.metadata[0].location
    var demographicsBBtype = data.metadata[0].bbtype
    var demographicsWfreq = data.metadata[0].wfreq

    var table = d3.select('tbody')
    var row = table.append('tr')
    var cell = row.append('td')
    cell.text(`id: ${demographicsID}`)
    var row2 = table.append('tr')
    var cell2 = row2.append('td')
    cell2.text(`ethnicity: ${demographicsEthnicity}`)
    var row3 = table.append('tr')
    var cell3 = row3.append('td')
    cell3.text(`gender: ${demographicsGender}`)
    var row4 = table.append('tr')
    var cell4 = row4.append('td')
    cell4.text(`age: ${demographicsAge}`)
    var row5 = table.append('tr')
    var cell5 = row5.append('td')
    cell5.text(`location: ${demographicsLocation}`)
    var row6 = table.append('tr')
    var cell6 = row6.append('td')
    cell6.text(`bbtype: ${demographicsBBtype}`)
    var row7 = table.append('tr')
    var cell7 = row7.append('td')
    cell7.text(`wfreq: ${demographicsWfreq}`)

    // Static Gauge

    var dataGauge = [{
        value: demographicsWfreq,
        title: {
            text: "Belly Button Washing Frequency: Scrubs per week",
            font: {
                size: 24
            }
        },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {
                range: [null, 9],
                tickwidth: 1,
                tickcolor: "blue"
            },
            bar: {
                color: "#404040"
            },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "#404040",
            steps: [{
                    range: [0, 1],
                    color: "#cfc357"
                },
                {
                    range: [1, 2],
                    color: "#dfe0a4"
                },
                {
                    range: [2, 3],
                    color: "#7aebdf"
                },
                {
                    range: [3, 4],
                    color: "#8dd6d9"
                },
                {
                    range: [4, 5],
                    color: "#00FA9A"
                },
                {
                    range: [5, 6],
                    color: "#00FF7F"
                },
                {
                    range: [6, 7],
                    color: "#3CB371"
                },
                {
                    range: [7, 8],
                    color: "#2E8B57"
                },
                {
                    range: [8, 9],
                    color: "#006400"
                },
            ],
        }
    }];

    var layoutGauge = {
        width: 700,
        height: 600,
        margin: {
            t: 20,
            b: 40,
            l: 100,
            r: 100
        },
        paper_bgcolor: "white",
        font: {
            color: "#404040",
            family: "Times New Roman"
        }
    };

    // Create the Gauge plot
    Plotly.newPlot("gauge", dataGauge, layoutGauge);
})

// read the json file to get data
d3.json(url).then(function (data) {

    var input = d3.select('#selDataset')
    input.on('change', function () {

        // Dynamic Bar Chart
        var newText = d3.event.target.value;
        var values2 = data.samples.filter(d => d.id == newText)[0].sample_values.slice(0, 10).reverse()
        var ids2 = data.samples.filter(d => d.id == newText)[0].otu_ids.slice(0, 10).map(d => `OTU ${d}`)
        var labels2 = data.samples.filter(d => d.id == newText)[0].otu_labels.slice(0, 10)

        // Create trace for the plot
        var trace2 = {
            x: values2,
            y: ids2,
            type: 'bar',
            text: labels2,
            orientation: 'h'
        }

        // Connect trace data
        var plotData2 = [trace2]

        // Create the dynamic bar chart
        Plotly.newPlot('bar', plotData2)

        // Dynamic Bubble Chart
        var bubbleValues2 = data.samples.filter(d => d.id == newText)[0].sample_values
        var bubbleIds2 = data.samples.filter(d => d.id == newText)[0].otu_ids
        var bubbleLabels2 = data.samples.filter(d => d.id == newText)[0].otu_labels

        var traceBubble2 = {
            x: bubbleIds2,
            y: bubbleValues2,
            text: bubbleLabels2,
            mode: 'markers',
            marker: {
                size: bubbleValues2,
                color: bubbleIds2
            }
        }

        // Connect trace data
        var dataBubble2 = [traceBubble2];

        var layoutBubble2 = {
            xaxis: {
                title: "OTU ID"
            }
        };

        // Create the dynamic Bubble Chart
        Plotly.newPlot('bubble', dataBubble2, layoutBubble2);

        // Dynamic Demographics

        var demographicsID = data.metadata.filter(d => d.id == newText)[0].id
        var demographicsEthnicity = data.metadata.filter(d => d.id == newText)[0].ethnicity
        var demographicsGender = data.metadata.filter(d => d.id == newText)[0].gender
        var demographicsAge = data.metadata.filter(d => d.id == newText)[0].age
        var demographicsLocation = data.metadata.filter(d => d.id == newText)[0].location
        var demographicsBBtype = data.metadata.filter(d => d.id == newText)[0].bbtype
        var demographicsWfreq = data.metadata.filter(d => d.id == newText)[0].wfreq
        var table = d3.select('tbody')

        table.html('')
        var row = table.append('tr')
        var cell = row.append('td')
        cell.text(`id: ${demographicsID}`)
        var row2 = table.append('tr')
        var cell2 = row2.append('td')
        cell2.text(`ethnicity: ${demographicsEthnicity}`)
        var row3 = table.append('tr')
        var cell3 = row3.append('td')
        cell3.text(`gender: ${demographicsGender}`)
        var row4 = table.append('tr')
        var cell4 = row4.append('td')
        cell4.text(`age: ${demographicsAge}`)
        var row5 = table.append('tr')
        var cell5 = row5.append('td')
        cell5.text(`location: ${demographicsLocation}`)
        var row6 = table.append('tr')
        var cell6 = row6.append('td')
        cell6.text(`bbtype: ${demographicsBBtype}`)
        var row7 = table.append('tr')
        var cell7 = row7.append('td')
        cell7.text('wfreq: ${demographicsWfreq}')

        // Static Gauge
        var dataGauge = [{
            domain: {
                x: [0, 1],
                y: [0, 1]
            },
            value: demographicsWfreq,
            title: {
                text: "Belly Button Washing Frequency: Scrubs per week",
                font: {
                    size: 24
                }
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {
                    range: [null, 9],
                    tickwidth: 1,
                    tickcolor: "blue"
                },
                bar: {
                    color: "#404040"
                },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "#404040",
                steps: [{
                        range: [0, 1],
                        color: "#cfc357"
                    },
                    {
                        range: [1, 2],
                        color: "#dfe0a4"
                    },
                    {
                        range: [2, 3],
                        color: "#7aebdf"
                    },
                    {
                        range: [3, 4],
                        color: "#8dd6d9"
                    },
                    {
                        range: [4, 5],
                        color: "#00FA9A"
                    },
                    {
                        range: [5, 6],
                        color: "#00FF7F"
                    },
                    {
                        range: [6, 7],
                        color: "#3CB371"
                    },
                    {
                        range: [7, 8],
                        color: "#2E8B57"
                    },
                    {
                        range: [8, 9],
                        color: "#006400"
                    },
                ],
            }
        }];

        var layoutGauge = {
            width: 700,
            height: 600,
            margin: {
                t: 20,
                b: 40,
                l: 100,
                r: 100
            },
            paper_bgcolor: "white",
            font: {
                color: "#404040",
                family: "Times New Roman"
            }
        };

        // Create the Gauge plot
        Plotly.newPlot("gauge", dataGauge, layoutGauge);
    })
})