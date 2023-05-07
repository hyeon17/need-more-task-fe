import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import * as D from '@/styles/dashboard.styles';

interface BarChartData {
  date: string;
  taskCount: number;
  doneCount: number;
}

interface BarChartProps {
  data: BarChartData[];
}

function PerformanceGraph({ data }: BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 30, right: 30, bottom: 70, left: 37 };
    const width = 960 - margin.left - margin.right;
    const height = 200;
    // const height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map((d) => d.date));

    // const y = d3
    //   .scaleLinear()
    //   .range([height, 0])
    //   .domain(d3.extent(d3.merge(data.map((d) => [d.taskCount, d.doneCount]))) as unknown as [number, number]);
    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, (d) => Math.max(d.taskCount, d.doneCount))!]);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    svg.select('.domain').remove(); // x축 라인 제거
    // svg.selectAll('.tick text').text((d) => d.split('-')[2]); // tick 라벨에서 날짜만 추출하여 보이도록 변경
    svg.selectAll('.tick line').remove();

    svg.append('g').call(d3.axisLeft(y)).attr('class', 'yTick');
    svg.select('.domain').remove(); // y축 라인 제거
    svg.selectAll('.tick line').remove(); // y축 tick 제거
    svg.selectAll('.yTick text').remove();

    // const barWidth = x.bandwidth() / 3;
    const barWidth = 5;

    svg
      .selectAll('.taskBar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'taskBar')
      .attr('x', (d) => x(d.date)!)
      .attr('y', (d) => y(d.taskCount))
      .attr('width', barWidth)
      .attr('height', (d) => height - y(d.taskCount))
      .attr('fill', '#3E7EFF')
      .attr('rx', 3)
      .attr('ry', 3);

    svg
      .selectAll('.doneBar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'doneBar')
      .attr('x', (d) => x(d.date)! + barWidth)
      .attr('y', (d) => y(d.doneCount))
      .attr('width', barWidth)
      .attr('height', (d) => height - y(d.doneCount))
      .attr('fill', '#E4E6E8D9')
      .attr('rx', 3)
      .attr('ry', 3);

    const defs = svg.append('defs');

    const doneGradient = defs
      .append('linearGradient')
      .attr('id', 'doneGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    doneGradient.append('stop').attr('offset', '0%').attr('style', 'stop-color: rgba(255, 255, 255, 0.9)');

    doneGradient.append('stop').attr('offset', '100%').attr('style', 'stop-color: rgba(255, 255, 255, 0.9)');
  }, [data]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}
    >
      <D.PerformanceGraphWrapper>
        <svg ref={svgRef} />
      </D.PerformanceGraphWrapper>
    </motion.div>
  );
}

export default PerformanceGraph;
