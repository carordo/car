var fullWidth = 600;
var fullHeight = 400;
var margin = { top: 20, bottom: 20, left: 30, right: 20 };
var width = fullWidth - margin.left - margin.right;
var height = fullHeight - margin.top - margin.bottom;

var numberPoints = 500;

var rangeScale = d3.scale.linear()
    .domain([-200, 200])
    .range([-3, 3]);

var randomX = d3.random.normal(0, 50);
var randomY = d3.random.normal(0, 50);
//
// var data = d3.range(numberPoints).map(function(d, i) {
//     var x = randomX();
//     var y = randomY();
//
//     return {
//         x: x,
//         y: y,
//         z: rangeScale(x + y),
//         i: i
//     };
// });
//
// var xRange = d3.extent(data, function(d) { return d.x });
// var yRange = d3.extent(data, function(d) { return d.y });
//
// var xScale = d3.scale.linear()
//     .domain([xRange[0] - 10, xRange[1] + 10])
//     .range([0, width]);
//
// var yScale = d3.scale.linear()
//     .domain([yRange[0] - 10, yRange[1] + 10])
//     .range([height, 0]);

// var svg = d3.select('#main-svg')
//     .attr('width', fullWidth)
//     .attr('height', fullHeight)
//     .append('g')
//     .attr('transform', 'translate(' + margin.left + ',' +
//     margin.top + ')');
//
// var xAxis = d3.svg.axis()
//     .scale(xScale)
//     .orient('bottom');
//
// var yAxis = d3.svg.axis()
//     .scale(yScale)
//     .orient('left');
//
// var xAxisSvg = svg.append('g')
//     .attr('class', 'x axis')
//     .attr('transform', 'translate(0,' + height + ')')
//     .call(xAxis);
//
// var yAxisSvg = svg.append('g')
//     .attr('class', 'y axis')
//     .call(yAxis);
//
// svg.selectAll('circle').data(data)
//     .enter()
//     .append('circle')
//     .attr('cx', function(d) {
//         return xScale(d.x);
//     })
//     .attr('cy', function(d) {
//         return yScale(d.y);
//     })
//     .attr('r', 5);
//
// add the legend now
var legendFullHeight = fullHeight;
var legendFullWidth = 50;

var legendMargin = { top: 20, bottom: 20, left: 5, right: 20 };

// use same margins as main plot
var legendWidth = legendFullWidth - legendMargin.left - legendMargin.right;
var legendHeight = legendFullHeight - legendMargin.top - legendMargin.bottom;

var legendSvg = d3.select('#legend-svg')
    .attr('width', legendFullWidth)
    .attr('height', legendFullHeight)
    .append('g')
    .attr('transform', 'translate(' + legendMargin.left + ',' +
    legendMargin.top + ')');

updateColourScale(scales['puOr11']);

// attach event listener to control
d3.select('#scale-select').on('change', function() {
    var val = d3.select(this).node().value;
    updateColourScale(scales[val]);
});

// update the colour scale, restyle the plot points and legend
function updateColourScale(scale) {
    // create colour scale
    var colorScale = d3.scale.linear()
        .domain(linspace(-3, 3, scale.length))
        .range(scale);

    // style points
    d3.selectAll('circle')
        .attr('fill', function(d) {
            return colorScale(d.z);
        });

    // clear current legend
    legendSvg.selectAll('*').remove();

    // append gradient bar
    var gradient = legendSvg.append('defs')
        .append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%') // bottom
        .attr('y1', '100%')
        .attr('x2', '0%') // to top
        .attr('y2', '0%')
        .attr('spreadMethod', 'pad');

    // programatically generate the gradient for the legend
    // this creates an array of [pct, colour] pairs as stop
    // values for legend
    var pct = linspace(0, 100, scale.length).map(function(d) {
        return Math.round(d) + '%';
    });

    var colourPct = d3.zip(pct, scale);

    colourPct.forEach(function(d) {
        gradient.append('stop')
            .attr('offset', d[0])
            .attr('stop-color', d[1])
            .attr('stop-opacity', 1);
    });

    legendSvg.append('rect')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#gradient)');

    // create a scale and axis for the legend
    var legendScale = d3.scale.linear()
        .domain([-3, 3])
        .range([legendHeight, 0]);

    var legendAxis = d3.svg.axis()
        .scale(legendScale)
        .orient("right")
        .tickValues(d3.range(-3, 4))
        .tickFormat(d3.format("d"));

    legendSvg.append("g")
        .attr("class", "legend axis")
        .attr("transform", "translate(" + legendWidth + ", 0)")
        .call(legendAxis);
}

function linspace(start, end, n) {
    var out = [];
    var delta = (end - start) / (n - 1);

    var i = 0;
    while(i < (n - 1)) {
        out.push(start + (i * delta));
        i++;
    }

    out.push(end);
    return out;
}
</script>
