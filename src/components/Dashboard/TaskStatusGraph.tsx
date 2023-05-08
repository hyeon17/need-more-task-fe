import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ITaskStatusGraph, taskDoneData } from '@/type/dashBoardTypes';
import * as D from '@/styles/dashboard.styles';
import { motion } from 'framer-motion';
import { Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react';

interface Data {
  x: number;
  y: number;
}

const TaskStatusGraph = ({ data }: ITaskStatusGraph) => {
  const [tooltipData, setTooltipData] = useState<Data | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

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
    // .on('mouseover', (event, d) => {
    //   setTooltipData(d);
    // })
    // .on('mousemove', (event) => {
    //   setTooltipPosition({ x: event.clientX, y: event.clientY });
    // })
    // .on('mouseout', () => {
    //   setTooltipData(null);
    //   setTooltipPosition(null);
    // });

    // svgA
    //   .selectAll('circle')
    //   .data(taskDoneData)
    //   .enter()
    //   .append('circle')
    //   .attr('cx', (d) => xScale(d.x))
    //   .attr('cy', (d) => yScale(d.y))
    //   .attr('r', 3)
    //   .on('mouseover', (event, d) => {
    //     setTooltipData(d);
    //   })
    //   .on('mousemove', (event) => {
    //     setTooltipPosition({ x: event.clientX, y: event.clientY });
    //   })
    //   .on('mouseout', () => {
    //     setTooltipData(null);
    //     setTooltipPosition(null);
    //   });
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
      {/* <D.StatusGraphWrapper>
        <svg ref={svgRefA} style={{ backgroundColor: '#fff' }}>
          <path stroke="#3E7EFF" strokeWidth="3" fill="none" />
        </svg>
      </D.StatusGraphWrapper> */}
      <D.StatusGraphWrapper>
        <svg ref={svgRefA} style={{ backgroundColor: '#fff' }}>
          <path stroke="#3E7EFF" strokeWidth="3" fill="none" />
        </svg>
        {tooltipData && tooltipPosition && (
          <Popover isOpen={true} closeOnBlur={false}>
            <PopoverTrigger>
              <span style={{ position: 'absolute', left: tooltipPosition.x, top: tooltipPosition.y }} />
            </PopoverTrigger>
            <PopoverContent
              zIndex="tooltip"
              bgColor="white"
              borderColor="white"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <PopoverArrow />
              <PopoverBody color="black" p={2} textAlign="center">
                x: {tooltipData.x}, y: {tooltipData.y}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </D.StatusGraphWrapper>
    </motion.div>
  );
};

export default TaskStatusGraph;
