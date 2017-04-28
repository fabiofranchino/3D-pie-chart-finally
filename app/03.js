;(function (d3) {
  var data = d3.range(10).map(function (d, i) {
    var r = 1 + parseInt(Math.random() * 2)
    return d3.range(8).map(function (p, j) {
      return {v: Math.random(), r: r}
    })
  })

  var pies = d3.select('a-scene')
    .selectAll('a-entity')
    .data(data)
    .enter()
    .append('a-entity')
    .attr('rotation', function () {
      return '0 0 ' + parseInt(Math.random() * 360)
    })
    .classed('pie', true)
    .attr('animation__1', function (d, i) {
      var del = i * 1000
      var z = parseInt(Math.random() * 15 + 4) * -1
      var x = parseInt(Math.random() * 20 - 10)
      var y = parseInt(Math.random() * 8)
      return 'property:position;to:' + x + ' ' + y + ' ' + z + ';dur:3000;delay:' + del + ';easing:easeInOutSine;loop:false'
    })
    .attr('animation__2', function (d, i) {
      var del = i * 750
      return 'property:rotation;to:0 0 -90;dur:3000;delay:' + del + ';easing:easeInOutSine;loop:false'
    })

  var pie = d3.pie()
    .value(function (d) {
      return d.v
    })

  var colors = d3.scaleOrdinal(d3.schemeCategory20c)

  pies.selectAll('a-entity')
      .data(function (d, i) {
        return pie(d)
      })
      .enter()
      .append('a-entity')
      .attr('geometry', function (d, i) {
        var a = d.startAngle * 180 / Math.PI
        var b = (d.endAngle - d.startAngle) * 180 / Math.PI
        return 'primitive:cylinder;radius:' + d.data.r + ';thetaStart:' + a + ';thetaLength:' + b + ';height:0.5;openEnded:false'
      })
      .attr('material', function (d, i) {
        return 'side: double; color:' + colors(i) + ';'
      })
      .attr('rotation', '-90 90 0')
})(window.d3)
