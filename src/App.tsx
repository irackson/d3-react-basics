import './App.css';
import { FC, useEffect, useRef, useState } from 'react';
import { select, Selection } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

const svgSize = { width: 800, height: 500 };

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
        .range([0, 500]);

    const x = scaleBand()
        .domain(data.map(({ name }) => name))
        .range([0, svgSize.width])
        // .padding(0.1);
        .paddingInner(0.3)
        .paddingOuter(0.7);

    useEffect(() => {
        if (!selection) {
            setSelection(select(ref.current));
        } else {
            // console.log('y(0): ', y(0));
            // console.log('y(123): ', y(123));
            // console.log('y(8766): ', y(8766));

            selection
                .selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('width', x.bandwidth)
                // .attr('x', (_, i) => i * 100)
                .attr('x', (d) => x(d.name)!) // ts bang!
                // .attr('x', (d) => x(d.name) ?? null)
                .attr('fill', 'orange')
                .attr('height', (d) => y(d.number));
        }
    }, [selection]); // x, y?

    return (
        <div className="App">
            <svg
                ref={ref}
                width={svgSize.width}
                height={svgSize.height}
                style={{ outline: '1px solid white' }}
            ></svg>
        </div>
    );
};

export default App;
