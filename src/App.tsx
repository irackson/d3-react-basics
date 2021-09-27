import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select, Selection } from 'd3-selection';
import { FC, useEffect, useRef, useState } from 'react';
import './App.css';

const dimensions = {
    width: 800,
    height: 500,
    chartWidth: 700,
    chartHeight: 400,
    marginLeft: 100,
};

const data = [
    {
        name: 'foo',
        number: 9000,
    },
    {
        name: 'bar',
        number: 2345,
    },
    {
        name: 'baz',
        number: 4543,
    },
    {
        name: 'hog',
        number: 8766,
    },
    {
        name: 'pig',
        number: 1723,
    },
];

const App: FC = () => {
    const ref = useRef<SVGSVGElement | null>(null);

    const [selection, setSelection] = useState<null | Selection<
        SVGSVGElement | null,
        unknown,
        null,
        undefined
    >>(null);

    const y = scaleLinear()
        .domain([0, max(data, (d) => d.number) ?? 10000])
        .range([0, dimensions.chartHeight]);

    const x = scaleBand()
        .domain(data.map(({ name }) => name))
        .range([0, dimensions.chartWidth])
        .paddingInner(0.3);

    const yAxis = axisLeft(y)
        .ticks(3)
        .tickFormat((d) => `$${d}`);
    const xAxis = axisBottom(x);

    useEffect(() => {
        if (!selection) {
            setSelection(select(ref.current));
        } else {
            // selection
            //     .append('rect')
            //     .attr('width', dimensions.width)
            //     .attr('height', dimensions.height)
            //     .attr('fill', 'lightblue');

            const xAxisGroup = selection
                .append('g')
                .attr(
                    'transform',
                    `translate(${dimensions.marginLeft}, ${dimensions.chartHeight})`
                )
                .call(xAxis);

            const yAxisGroup = selection
                .append('g')
                .attr('transform', `translate(${dimensions.marginLeft}, ${0})`)
                .call(yAxis);

            selection
                .append('g')
                .attr('transform', `translate(${dimensions.marginLeft}, 0)`) // like css transform/translate
                .selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('width', x.bandwidth)
                .attr('x', (d) => x(d.name)!) // ts bang!
                .attr('fill', 'orange')
                .attr('height', (d) => y(d.number));
        }
    }, [selection]); // x, y?

    return (
        <div className="App">
            <svg ref={ref} width={dimensions.width} height={dimensions.height}>
                {/* <g>
                    <rect></rect>
                    <rect></rect>
                    <rect></rect>
                </g> */}
            </svg>
        </div>
    );
};

export default App;
