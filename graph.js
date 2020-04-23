
// get the data
links =  [
  {
    "source": "Milwaukee Bucks",
    "target": "Cleveland Cavaliers",
    "value": 0
  },
  {
    "source": "Milwaukee Bucks",
    "target": "Sacramento Kings",
    "value": 0
  },
  {
    "source": "Detroit Pistons",
    "target": "Philadelphia 76ers",
    "value": 1
  },
  {
    "source": "Cleveland Cavaliers",
    "target": "Los Angeles Lakers",
    "value": 1
  },
  {
    "source": "Dallas Mavericks",
    "target": "Houston Rockets",
    "value": 1
  },
  {
    "source": "Miami Heat",
    "target": "San Antonio Spurs",
    "value": 1
  },
  {
    "source": "Miami Heat",
    "target": "Los Angeles Lakers",
    "value": 1
  },
  {
    "source": "Brooklyn Nets",
    "target": "Los Angeles Lakers",
    "value": 1
  },
  {
    "source": "Brooklyn Nets",
    "target": "Houston Rockets",
    "value": 1
  },
  {
    "source": "Sacramento Kings",
    "target": "Los Angeles Lakers",
    "value": 1
  },
  {
    "source": "Houston Rockets",
    "target": "Golden State Warriors",
    "value": 0
  },
  {
    "source": "Los Angeles Lakers",
    "target": "Los Angeles Clippers",
    "value": 1
  },
  {
    "source": "Sacramento Kings",
    "target": "Philadelphia 76ers",
    "value": 1
  },
  {
    "source": "San Antonio Spurs",
    "target": "Miami Heat",
    "value": 0
  },
  {
    "source": "Portand Trail Blazers",
    "target": "Miami Heat",
    "value": 0
  },
  {
    "source": "Chicago Bulls",
    "target": "Boston Celtics",
    "value": 0
  },
  {
    "source": "New York Knicks",
    "target": "Golden State Warriors",
    "value": 0
  },
  {
    "source": "Denver Nuggets",
    "target": "Golden State Warriors",
    "value": 0
  },
  {
    "source": "Portand Trail Blazers",
    "target": "Golden State Warriors",
    "value": 0
  },
  {
    "source": "New York Knicks",
    "target": "Denver Nuggets",
    "value": 1
  },
  {
    "source": "San Antonio Spurs",
    "target": "Denver Nuggets",
    "value": 0
  },
  {
    "source": "Houston Rockets",
    "target": "Denver Nuggets",
    "value": 1
  },
  {
    "source": "Portand Trail Blazers",
    "target": "San Antonio Spurs",
    "value": 1
  },
  {
    "source": "Houston Rockets",
    "target": "Brooklyn Nets",
    "value": 0
  },
  {
    "source": "Milwaukee Bucks",
    "target": "Boston Celtics",
    "value": 0
  },
  {
    "source": "Golden State Warriors",
    "target": "Milwaukee Bucks",
    "value": 1
  },
  {
    "source": "Golden State Warriors",
    "target": "Atlanta Hawks",
    "value": 1
  },
  {
    "source": "Orlando Magic",
    "target": "Memphis Grizzlies",
    "value": 0
  },
  {
    "source": "Washington Wizards",
    "target": "New York Knicks",
    "value": 1
  },
  {
    "source": "Boston Celtics",
    "target": "Orlando Magic",
    "value": 1
  },
  {
    "source": "Oklahoma City Thunder",
    "target": "Sacramento Kings",
    "value": 0
  },
  {
    "source": "Boston Celtics",
    "target": "Charlotte Hornets",
    "value": 1
  },
  {
    "source": "Boston Celtics",
    "target": "Philadelphia 76ers",
    "value": 1
  },
  {
    "source": "Brooklyn Nets",
    "target": "Miami Heat",
    "value": 1
  },
  {
    "source": "Indiana Pacers",
    "target": "Chicago Bulls",
    "value": 1
  },
  {
    "source": "New York Knicks",
    "target": "Boston Celtics",
    "value": 0
  },
  {
    "source": "Los Angeles Lakers",
    "target": "Phoenix Suns",
    "value": 0
  },
  {
    "source": "Golden State Warriors",
    "target": "Dallas Mavericks",
    "value": 1
  },
  {
    "source": "New Orleans Pelicans",
    "target": "Indiana Pacers",
    "value": 0
  },
  {
    "source": "Milwaukee Bucks",
    "target": "Brooklyn Nets",
    "value": 0
  },
  {
    "source": "Washington Wizards",
    "target": "Portand Trail Blazers",
    "value": 1
  },
  {
    "source": "Utah Jazz",
    "target": "Golden State Warriors",
    "value": 1
  },
  {
    "source": "Boston Celtics",
    "target": "Utah Jazz",
    "value": 1
  },
  {
    "source": "Golden State Warriors",
    "target": "Charlotte Hornets",
    "value": 1
  },
  {
    "source": "Boston Celtics",
    "target": "Atlanta Hawks",
    "value": 1
  },
  {
    "source": "Philadelphia 76ers",
    "target": "Boston Celtics",
    "value": 0
  }
];

var nodes = {}; // Empty information to initialize

// compute the distinct nodes from the links.
// carlos note: update them or add them
links.forEach(function(link) {
    link.source = nodes[link.source] ||
        (nodes[link.source] = {name: link.source}); // if we get that one repeated we don't get extra nodes
    link.target = nodes[link.target] ||
        (nodes[link.target] = {name: link.target}); //if you were not in the source but were in the target we will add
});

var width = 1200,
    height = 700
    heightLetters = 20;




// this constructor that create the nodes and links

var force = d3.forceSimulation()

    .nodes(d3.values(nodes))
    .force("link", d3.forceLink(links).distance(100))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .force("charge", d3.forceManyBody().strength(-250))
    .alphaTarget(1)
    .on("tick", tick);

// This function contains the data in links
// I see no difference between d and i
//console.log (links, function(d,i) {return i })
//console.log (links, function(d,i) {return d })

// carlos note use the following as canvas on html
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// carlos note:

// add the links and the arrows
var path = svg.append("g")
    .selectAll("path")
    .data(links)
    .enter()
    .append("path")
    .attr("class", function(d) { return "link " + d.type; })
    .style ("stroke", function (d){
    return d.value == 0 ? "blue"
    :      "black";
    })
    .style ("stroke-width", function (d){
    return d.value == 0 ? 5
    :      1;
    })
    .style ("stroke-dasharray", function (d){
    return d.value == 1 ? 5: "none";
    });




// define the nodes
var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g");

var link = svg.selectAll('path.link')
    .data(links)
    .enter()
    .append("g")


var nodesCircle = node.append("circle")
   .attr("class", "node")
   .attr("r", function(d) {
   d.weight = links.filter(function(l) {
   return l.source.index == d.index || l.target.index == d.index
   }).length;
   var minRadius =5;
   return minRadius + (d.weight * 2);
   })
   .on("dblclick",dblclick)
   .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

var arrayNodes = d3.values(nodes);
let resultNodes = arrayNodes.map(function(d) { return d.weight});

var nodeMin = d3.min(resultNodes);
var nodeMax = d3.max(resultNodes);

var colorScale = d3.scaleSequential()
        .domain([nodeMin, nodeMax])
        .interpolator(d3.interpolateBlues);

nodesCircle.style( "fill", function(d) {
        return colorScale(d.weight);
   });



node.append("text")
    .attr ("dx", 12)
    .attr ("dy", ".90em")
    .text(function (d) { return d.name });


// add the curvy lines
function tick() {
/*
    text.attr("x", d -> d.x )
    text.attr("y", d -> d.y )
*/
    path.attr("d", function(d) {
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" +
            d.source.x + "," +
            d.source.y + "A" +
            dr + "," + dr + " 0 0,1 " +
            d.target.x + "," +
            d.target.y;
    });

    node
        .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")"; })
};

// Pin the nodes
function dblclick(d){
console.log("Before")
console.log(d.fixed)

    if (d.fixed == true) {
         d3.select(this).classed ("fixed",d.fixed = false).style("fill",  function(d) {
            return colorScale(d.weight);
         });
         d.fx = null;
         d.fy = null;
         }

    else {d3.select(this).classed ("fixed",d.fixed = true).style("fill", "orange");

        d.fx = d.x;
        d.fy = d.y;
        }

    console.log("After")
    console.log(d.fixed)

};

// Creates the name cordonez top right
svg.append("g")
    .attr("transform", "translate(0," + heightLetters + ")")
    .append("text")
    .attr("fill", "#000")
    .attr("x", 900)
    .attr("dy", "3em")
    .attr("text-anchor", "end")
    .text("cordonez6");

function dragstarted(d) {
if (!d3.event.active) force.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
    };

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    };

function dragended(d) {
    if (!d3.event.active) force.alphaTarget(0);
    if (d.fixed == true) {
        d.fx = d.x;
        d.fy = d.y;
}
    else {
        d.fx = null;
        d.fy = null;
}
};

