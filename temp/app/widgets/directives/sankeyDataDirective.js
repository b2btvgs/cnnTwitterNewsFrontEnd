angular.module('dashboardModule')
    .directive('sankeyDataWidget', ['sankeyDataService', function (sankeyDataService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/widgets/partialViews/sankeyChart.tmpl.html',
            controller: 'SankeyDataController',
            link: function (scope, $element, attr, sanKeyCtrl) {
                var units = "Widgets";
                var modifiedNodePositions = localStorage.getItem("userModifiedNodePositions");
                var modifiedNodePositions = (modifiedNodePositions != null) ? JSON.parse(localStorage.getItem("userModifiedNodePositions")) : "";
                var modifiedNodePositions = (modifiedNodePositions.length > 0) ? modifiedNodePositions : [];

                var margin = {
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10
                    },

                    width = 1600 - margin.left - margin.right,
                    height = 760 - margin.top - margin.bottom

                var formatNumber = d3.format(",.0f"), // zero decimal places
                    format = function (d) {
                        return formatNumber(d) + " " + units;
                    },
                    color = d3.scale.category20();

                //                d3.select("#chart").remove();
                // append the svg canvas to the page
                var svg = d3.select("#chart").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

                // Set the sankey diagram properties
                var sankey = d3.sankey()
                    .nodeWidth(36)
                    .nodePadding(10)
                    .size([width, height]);

                var path = sankey.link();
                //                    var myDataPromise = sankeyDataService.getData();
                //                    myDataPromise.then(function (result) {
                //                        $scope.sankeyData = result;
                //                        $scope.selectedIten = $scope.sankeyData[0];


                //                if (Object.getOwnPropertyNames(scope.selectedItem).length != 0) {
                scope.$watch('selectedItem', function () {
                    // load the data
                    //                    d3.json(sankeyDataResult, function (error, graph) {
                    //                        graph = JSON.parse(JSON.stringify($scope.sankeyData[1]));
                    //                    console.log("in clause -- selectedItem is: " + JSON.stringify(scope.selectedItem));
                    d3.selectAll("svg > *").remove();

                    var svg = d3.select("#chart").append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform",
                            "translate(" + margin.left + "," + margin.top + ")");

                    // Set the sankey diagram properties
                    var sankey = d3.sankey()
                        .nodeWidth(36)
                        .nodePadding(10)
                        .size([width, height]);

                    var path = sankey.link();

                    graph = JSON.parse(JSON.stringify(scope.selectedItem));
                    var nodeMap = {};
                    graph.nodes.forEach(function (x) {
                        nodeMap[x.name] = x;
                    });
                    graph.links = graph.links.map(function (x) {
                        return {
                            source: nodeMap[x.source],
                            target: nodeMap[x.target],
                            value: x.value
                        };
                    });

                    sankey
                        .nodes(graph.nodes)
                        .links(graph.links)
                        .layout(32);

                    // add in the links
                    var link = svg.append("g").selectAll(".link")
                        .data(graph.links)
                        .enter().append("path")
                        .attr("class", "link")
                        .attr("d", path)
                        .style("stroke-width", function (d) {
                            return Math.max(1, d.dy);
                        })
                        .sort(function (a, b) {
                            return b.dy - a.dy;
                        });

                    // add the link titles
                    link.append("title")
                        .text(function (d) {
                            return d.source.name + " → " +
                                d.target.name + "\n" + format(d.value);
                        });

                    // add in the nodes
                    var node = svg.append("g").selectAll(".node")
                        .data(graph.nodes)
                        .enter().append("g")
                        .attr("class", "node")
                        .attr("class", "nodeFont")
                        .attr("transform", function (d) {
                            for (var i = 0; i < modifiedNodePositions.length; i++) {
                                if (d.name == modifiedNodePositions[i].name) {
                                    d.x = modifiedNodePositions[i].x;
                                    d.y = modifiedNodePositions[i].y;
                                };
                            };
                            return "translate(" + d.x + "," + d.y + ")";
                        })

                    .call(d3.behavior.drag()
                        .origin(function (d) {
                            console.log("dragging started");
                            return d;
                        })
                        .on("dragstart", function () {
                            this.parentNode.appendChild(this);
                        })
                        .on("drag", dragmove)
                        .on("dragend", updateModifiedNodes));

                    // add the rectangles for the nodes
                    node.append("rect")
                        .attr("height", function (d) {
                            return d.dy;
                        })
                        .attr("width", sankey.nodeWidth())
                        .style("fill", function (d) {
                            return d.color = color(d.name.replace(/ .*/, ""));
                        })
                        .style("stroke", function (d) {
                            return d3.rgb(d.color).darker(2);
                        })
                        .append("title")
                        .text(function (d) {
                            return d.name + "\n" + format(d.value);
                        });

                    // add in the title for the nodes
                    node.append("text")
                        .attr("x", -6)
                        .attr("y", function (d) {
                            return d.dy / 2;
                        })
                        .attr("dy", ".35em")
                        .attr("text-anchor", "end")
                        .attr("transform", null)
                        .text(function (d) {
                            return d.name;
                        })
                        .filter(function (d) {
                            return d.x < width / 2;
                        })
                        .attr("x", 6 + sankey.nodeWidth())
                        .attr("text-anchor", "start");
                    sankey.relayout();
                    link.attr("d", path);

                    // the function for moving the nodes
                    function dragmove(d) {
                        d3.select(this).attr("transform",
                            "translate(" + (
                                d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
                            ) + "," + (
                                d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                            ) + ")");

                        sankey.relayout();
                        link.attr("d", path);
                    }

                    function updateModifiedNodes(d) {
                            var isModified = false;
                            for (var i = 0; i < modifiedNodePositions.length; i++) {
                                if (d.name == modifiedNodePositions[i].name) {
                                    console.log("found " + d.name);
                                    modifiedNodePositions[i].x = d.x;
                                    modifiedNodePositions[i].y = d.y;
                                    isModified = true;
                                    break;
                                };
                            };
                            if (!isModified) {
                                modifiedNodePositions.push({
                                    name: d.name,
                                    x: d.x,
                                    y: d.y
                                });
                            };
                            console.log("executing dragend");
                            var modifiedNodeSet = JSON.stringify(modifiedNodePositions);
                            localStorage.setItem("testItem", "PMM");
                            localStorage.setItem("userModifiedNodePositions", modifiedNodeSet);
                        }
                        //                    });
                })
            }
        }
    }]);

function resetUserModifiedNodePositions(nodes) {
    for (var i = 0; i < modifiedNodePositions.length; i++) {
        console.log("d3.data: " + JSON.stringify(nodes));
        for (var n = 0; n < nodes.length; n++) {
            if (nodes[n].name == modifiedNodePositions[i].name) {
                var modifiedNode = nodes[n];
                console.log("found: " + modifiedNode.name);
                dragmove(nodes[n]);
            }
        };
    };
};

function manualDragMove(node, d, userModifiedSettings) {
    d3.select(node).attr("transform",
        "translate(" + (d.x = userModifiedSettings.x) + "," +
        (d.y = userModifiedSettings.y) + ")");
    sankey.relayout();
    link.attr("d", path);
};