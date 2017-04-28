;(function (d3) {
  var data = d3.range(8).map(function (d, i) {
    return {v: Math.random()}
  })

  var pie = d3.pie()
    .value(function (d) {
      return d.v
    })

  console.log(pie(data))

  var colors = d3.scaleOrdinal(d3.schemeCategory20b)

  var pieHolder = d3.select('a-scene')
    .append('a-entity')
    .attr('position', '0 2 -4')

  pieHolder.attr('animation', function (d, i) {
    return 'property:rotation;to:0 360 0;dur:10000;easing:linear;loop:true'
  })

  var entities = pieHolder.selectAll('a-entity')
      .data(pie(data))

  entities.enter()
      .append('a-entity')
      .attr('geometry', function (d, i) {
        var a = d.startAngle * 180 / Math.PI
        var b = (d.endAngle - d.startAngle) * 180 / Math.PI
        var l = Math.random() + 1
        return 'primitive:cylinder;radius:' + l + ';thetaStart:' + a + ';thetaLength:' + b + 'height:1;openEnded:false'
      })
      .attr('material', function (d, i) {
        return 'side: double; color:' + colors(i) + ';'
      })
      .attr('rotation', '-90 90 0')
})(window.d3)
