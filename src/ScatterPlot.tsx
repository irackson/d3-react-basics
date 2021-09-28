import 'd3-transition';
import { FC, useEffect, useRef, useState } from 'react';
import { select, Selection } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { svg } from 'd3-fetch';

const initialData = [
    [90, 20],
    [20, 100],
    [66, 44],
    [53, 80],
    [24, 182],
    [80, 72],
    [10, 76],
    [33, 150],
    [100, 15],
];

const dimensions = {
    width: 400,
    height: 300,
};

export const ScatterPlot: FC = () => {
    const [data] = useState<number[][]>(initialData);

    const svgRef = useRef<SVGSVGElement | null>(null);
    const [selection, setSelection] = useState<Selection<
        any,
        unknown,
        null,
        undefined
    > | null>(null);

    useEffect(() => {
        if (!selection) {
            setSelection(
                select(svgRef.current)
                    .attr('width', dimensions.width)
                    .attr('height', dimensions.height)
                    .style('overflow', 'visible')
                    .style('margin-top', '100px')
            );
        } else {
            const xScale = scaleLinear()
                .domain([0, max(data, (d) => d[0])!])
                .range([0, dimensions.width]);

            const yScale = scaleLinear()
                .domain([0, max(data, (d) => d[1] + 18)!])
                .range([dimensions.height, 0]);

            const xAxis = axisBottom(xScale).ticks(data.length);
            const yAxis = axisLeft(yScale).ticks(10);

            selection
                .append('g')
                .call(xAxis)
                .attr('transform', `translate(0, ${dimensions.height})`);
            selection.append('g').call(yAxis);

            selection
                .append('text')
                .attr('x', dimensions.width / 2)
                .attr('y', dimensions.height + 50)
                .text('x');
            selection
                .append('text')
                // .attr('fill', 'green')
                .attr('y', dimensions.height / 2)
                .attr('x', -50)
                .text('y');

            selection.selectAll('text').attr('fill', 'green');

            selection
                .selectAll()
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', (d) => xScale(d[0]))
                .attr('cy', (d) => yScale(d[1]))
                .attr('r', 2);
        }
    }, [selection]);

    return (
        <div style={{ margin: '0 0 0 200px' }}>
            <svg
                ref={svgRef}
                style={{
                    // outline: '1px solid white',
                    color: 'orange',
                    fill: 'yellow',
                }}
            ></svg>
        </div>
    );
};
