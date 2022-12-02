<script setup lang="ts">
import { useNuxt } from '@nuxt/kit'
import * as d3 from 'd3'
import { filter } from 'd3'
const { $api } = useNuxtApp()
const { data: tt } = await useAsyncData(() => $api.typeTree.getTypeTree())

onMounted(() => { createBar(); update() })
const margin = { top: 30, right: 30, bottom: 70, left: 60 }
const width = 460 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom
const x = d3.scaleBand()
  .range([0, width])
  .padding(0.2)
const y = d3.scaleLinear()
  .range([height, 0]
  )
let svg:d3.Selection<SVGGElement, unknown, HTMLElement, any>
let xAxis : d3.Selection<SVGGElement, unknown, HTMLElement, any>
let yAxis: d3.Selection<SVGGElement, unknown, HTMLElement, any>

function createBar () {
  svg = d3.select('#my_dataviz')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')

  xAxis = svg.append('g')
    .attr('transform', `translate(0,${height})`)

  yAxis = svg.append('g')
    .attr('class', 'myYAxis')
}

function update (filterId?:number) {
  console.log(filterId, !filterId, !!filterId)
  const data = Object.values(tt.value?.typeTree || {})
    .filter(x => (x.root.length === 0 && !filterId) || (!!filterId && x.root.includes(filterId)))
    .filter(x => x.count + x.count_subs !== 0)
  console.log(data)
  x.domain(data.map(d => d.name))
  xAxis.transition().duration(1000).call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'translate(-10,0)rotate(-45)')
    .style('text-anchor', 'end')

  y.domain([0, d3.max(data, d => d.count + d.count_subs)])
  yAxis.transition().duration(1000).call(d3.axisLeft(y))

  const u = svg.selectAll('rect')
    .data(data)

  u.enter()
    .append('rect')
    .on('click', (d, i) => update(i.id))
    .merge(u)
    .transition()
    .duration(1000)
    .attr('x', d => x(d.name))
    .attr('y', d => y(d.count + d.count_subs))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.count + d.count_subs))
    .attr('fill', '#69b3a2')
    .attr('class', 'dingens')
}
</script>
<template>
  <div>
    <v-btn @click="update(73)" />
    <div id="my_dataviz" />
  </div>
</template>

<style>
.dingens{
  transition: all 150ms ease-in-out;
}
.dingens:hover{
  cursor: pointer;
  fill: aqua;
}
</style>
