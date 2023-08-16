import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
const width = window.innerWidth / 2;
const height = window.innerHeight / 2;
const margin = { top: 20, bottom: 50, left: 60, right: 40 };
const center = [width / 2, height / 2];


if (window.innerWidth > 1800){
    circleArt(width, height * 1.5, 500, 4, center[0] / 3 + margin.left , center[1], 9, "0 0 700 700")
}

if (window.innerWidth < 1300 && window.innerWidth > window.innerHeight){
    circleArt(width, height * 1.5, 200, 2, center[0] / 1.5 + margin.left , center[1] + 20, 9, "0 0 700 700")
}

if (((window.innerWidth / window.innerHeight) > 3/2) && window.innerWidth <= 1800 && window.innerWidth >=1300){
    circleArt(width, height * 1.5, 500, 4, center[0], center[1] + 20, 9, "0 0 700 700")
}

if ((window.innerWidth / window.innerHeight) < 3/2 && window.innerHeight > window.innerWidth){
    circleArt(width * 1.5, height, 125, 3, center[0] + margin.left * 1.5, center[1] + margin.top * 1.5, 4, "0 0 450 450")
}


function circleArt(w, h, points, r, cx, cy, j, viewbox){

    //constants
    const color = d3.scaleSequential(d3.interpolateViridis).domain([0, points]);


    //build random data
    const data = Array.from({ length: points }, (_, i) => ({
    r: 1.88 * (4 + j * Math.random() ** 1.5),
    color: color(i),
    }));

    const container = d3.select("#chart");

    let svg = container
    .append("svg")
    .attr("id", "chartcanvas")
    .attr("viewBox", viewbox)
    .attr("width", w)
    .attr("height", h)
    .attr("font-family", "sans-serif")
    .attr("font-size", 10);

    const canvas = svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", r)
    .attr("fill", (d) => d.color);

    const simulation = d3
    .forceSimulation(data)
    .on("tick", tick)
    .force(
        "charge",
        d3.forceManyBody().distanceMax(center)
    )
    .force("x", d3.forceX(center[0]).strength(0.0001))
    .force("y", d3.forceY(center[1]).strength(0.0001))
    .stop();

    setTimeout(() => {
        simulation.restart();
        canvas.transition().attr("r", d => d.r);
    }, 3000);

    tick();

    function tick() {
    canvas.attr("cx", (d) => d.x + cx).attr("cy", (d) =>  d.y +  cy);
    }

}