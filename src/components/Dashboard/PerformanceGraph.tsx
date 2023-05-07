import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import * as D from '@/styles/dashboard.styles';
import { PopoverHeader, Tooltip } from '@chakra-ui/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody } from '@chakra-ui/react';

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
  const [tooltipData, setTooltipData] = useState<BarChartData | null>(null);
  console.log('tooltipData>>', tooltipData);

  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

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

    // svg
    //   .selectAll('.taskBar')
    //   .data(data)
    //   .enter()
    //   .append('rect')
    //   .attr('class', 'taskBar')
    //   .attr('x', (d) => x(d.date)!)
    //   .attr('y', (d) => y(d.taskCount))
    //   .attr('width', barWidth)
    //   .attr('height', (d) => height - y(d.taskCount))
    //   .attr('fill', '#3E7EFF')
    //   .attr('rx', 3)
    //   .attr('ry', 3);

    // svg
    //   .selectAll('.doneBar')
    //   .data(data)
    //   .enter()
    //   .append('rect')
    //   .attr('class', 'doneBar')
    //   .attr('x', (d) => x(d.date)! + barWidth)
    //   .attr('y', (d) => y(d.doneCount))
    //   .attr('width', barWidth)
    //   .attr('height', (d) => height - y(d.doneCount))
    //   .attr('fill', '#E4E6E8D9')
    //   .attr('rx', 3)
    //   .attr('ry', 3);
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
      .attr('ry', 3)
      .on('mouseover', (event, d) => {
        setTooltipData(d);
        setTooltipPosition({ x: event.clientX, y: event.clientY - 20 }); // 상대적인 위치 조정이 필요한 경우 숫자를 조정해주세요.
      })
      .on('mouseout', () => {
        setTooltipData(null);
        setTooltipPosition(null);
      });

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
      .attr('ry', 3)
      .on('mouseover', (event, d) => {
        setTooltipData(d);
        setTooltipPosition({ x: event.clientX, y: event.clientY - 20 }); // 상대적인 위치 조정이 필요한 경우 숫자를 조정해주세요.
      })
      .on('mouseout', () => {
        setTooltipData(null);
        setTooltipPosition(null);
      });

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
        {tooltipData && tooltipPosition && (
          <D.StyledPopover isOpen={true} closeOnBlur={false}>
            <PopoverTrigger>
              <span style={{ position: 'absolute', left: tooltipPosition.x, top: tooltipPosition.y - 200 }} />
            </PopoverTrigger>
            <PopoverContent
              // zIndex="tooltip"
              // maxW="none"
              width="180px"
              height="100px"
              border="none"
              bgColor="white"
              // borderColor="white"
              // borderRadius="md"
              // display="flex"
              // alignItems="center"
              // justifyContent="center"
            >
              {/* <PopoverArrow /> */}
              <D.StyledPopoverBody color="black">
                <div>
                  <header>{tooltipData.date}</header>
                  {/* <span>Assigned: {tooltipData.taskCount}</span>
                  <span>Done: {tooltipData.doneCount}</span> */}
                  <D.FlagWrapper>
                    <D.DoneFlag></D.DoneFlag>
                    <D.FlagTitle>Done {tooltipData.taskCount}</D.FlagTitle>
                  </D.FlagWrapper>
                  <D.FlagWrapper>
                    <D.AssignedFlag></D.AssignedFlag>
                    <D.FlagTitle>Assigned {tooltipData.doneCount}</D.FlagTitle>
                  </D.FlagWrapper>
                </div>
              </D.StyledPopoverBody>
              {/* <PopoverArrow /> */}
            </PopoverContent>
          </D.StyledPopover>
        )}
      </D.PerformanceGraphWrapper>
    </motion.div>
  );
}

export default PerformanceGraph;
