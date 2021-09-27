import { FC, useEffect, useRef, useState } from 'react';
import './App.css';
import { select, Selection } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

const initialData = [
    {
        name: 'foo',
        units: 32,
    },
    {
        name: 'bar',
        units: 67,
    },
    {
        name: 'baz',
        units: 81,
    },
    {
        name: 'hog',
        units: 38,
    },
    {
        name: 'pig',
        units: 28,
    },
    {
        name: 'jim',
        units: 59,
    },
];

const dimensions = {
    width: 900,
    height: 600,
};

const App: FC = () => {
    const [data, setData] = useState(initialData);

    const ref = useRef<SVGSVGElement | null>(null);
    const [selection, setSelection] = useState<null | Selection<
        SVGSVGElement | null,
        unknown,
        null,
        undefined
    >>(null);

    const y = scaleLinear()
        .domain([0, max(data, (d) => d.units)!])
        // .range([0, dimensions.height]);
        .range([dimensions.height, 0]);

    const x = scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, dimensions.width])
        .paddingInner(0.05);

    useEffect(() => {
        if (!selection) {
            setSelection(select(ref.current));
        } else {
            //! upside down
            // selection
            //     .selectAll('rect')
            //     .data(data)
            //     .enter()
            //     .append('rect')
            //     .attr('width', x.bandwidth)
            //     .attr('height', (d) => y(d.units))
            //     .attr('x', (d) => x(d.name)!)
            //     .attr('fill', 'orange');

            //! right side up
            selection
                .selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('width', x.bandwidth)
                .attr('height', (d) => dimensions.height - y(d.units))
                .attr('x', (d) => x(d.name)!)
                .attr('y', (d) => y(d.units))
                .attr('fill', 'orange');
        }
    }, [selection]);
    return (
        <div className="App">
            <svg
                ref={ref}
                width={dimensions.width}
                height={dimensions.height}
            ></svg>
        </div>
    );
};

export default App;
