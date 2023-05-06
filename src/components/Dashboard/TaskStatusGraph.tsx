import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ITaskStatusGraph, taskDoneData } from '@/type/dashBoardTypes';

interface Data {
  x: number;
  y: number;
}

// const data: Data[] = [
//   { x: 0, y: 10 },
//   { x: 1, y: 3 },
//   { x: 2, y: 12 },
//   { x: 3, y: 8 },
//   { x: 4, y: 17 },
//   { x: 5, y: 15 },
//   { x: 6, y: 10 },
// ];

const TaskStatusGraph = ({ data }: ITaskStatusGraph) => {
  // console.log('data>>>', data);

  const taskDoneData: taskDoneData[] = [];
  // console.log(taskDoneData);

  for (let i = 0; i < 7; i++) {
    taskDoneData.push({
      x: i + 1,
      y: data[i].count,
    });
  }
  // console.log('taskDoneData>>', taskDoneData);

  const svgRefA = useRef<SVGSVGElement>(null);

  const w = 100;
  const h = 100;

  useEffect(() => {
    const svgA = d3.select(svgRefA.current).attr('width', w).attr('height', h);

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(taskDoneData, (d) => d.x) as [number, number]) // data 배열에서 x츅의 최소값과 최대값
      .range([0, w]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(taskDoneData, (d) => d.y) as [number, number])
      .range([h, 0]);

    const line = d3
      .line<Data>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    svgA.select('path').datum(taskDoneData).attr('d', line.curve(d3.curveBasis));
  }, [data]);

  return (
    <svg ref={svgRefA} style={{ backgroundColor: '#fff' }}>
      <path stroke="blue" strokeWidth="3" fill="none" />
    </svg>
  );
};

export default TaskStatusGraph;
