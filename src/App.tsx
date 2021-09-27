import { FC, useEffect, useRef, useState } from 'react';
import './App.css';
import { select, Selection } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import randomstring from 'randomstring';
import styled from 'styled-components';
import 'd3-transition';
import { easeElastic } from 'd3-ease';

const Button = styled.button`
    background-color: blue;
    transition-duration: 500ms;
    transition-timing-function: ease-in-out;

    &:hover {
        background-color: orange;
    }
`;

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

    let y = scaleLinear()
        .domain([0, max(data, (d) => d.units)!])
        // .range([0, dimensions.height]);
        .range([dimensions.height, 0]);

    let x = scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, dimensions.width])
        .paddingInner(0.05);

    useEffect(() => {
        if (!selection) {
            setSelection(select(ref.current));
        } else {
            selection
                .selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('width', x.bandwidth)
                .attr('height', 0)
                .attr('fill', 'orange')
                .attr('x', (d) => x(d.name)!)
                .attr('height', 0)
                .attr('y', dimensions.height)
                .transition()
                .duration(500)
                .delay((_, i) => i * 100)
                .ease(easeElastic)
                .attr('height', (d) => dimensions.height - y(d.units))
                .attr('y', (d) => y(d.units));
        }
    }, [selection]);

    useEffect(() => {
        if (selection) {
            y = scaleLinear()
                .domain([0, max(data, (d) => d.units)!])
                // .range([0, dimensions.height]);
                .range([dimensions.height, 0]);

            x = scaleBand()
                .domain(data.map((d) => d.name))
                .range([0, dimensions.width])
                .paddingInner(0.05);

            const rects = selection.selectAll('rect').data(data);

            rects
                .exit()
                .transition()
                .duration(300)
                .attr('y', dimensions.height)
                .attr('height', 0)
                .remove();

            rects
                .transition()
                .duration(300)
                .delay(100)
                .attr('width', x.bandwidth)
                .attr('height', (d) => dimensions.height - y(d.units))
                .attr('x', (d) => x(d.name)!)
                .attr('y', (d) => y(d.units))
                .attr('fill', 'orange');

            rects
                .enter()
                .append('rect')
                .attr('width', x.bandwidth)
                .attr('height', 0)
                .attr('fill', 'orange')
                .attr('x', (d) => x(d.name)!)
                .attr('y', dimensions.height)
                .attr('height', 0)
                .transition()
                .duration(500)
                .delay(250)
                .ease(easeElastic)

                .attr('y', (d) => y(d.units))
                .attr('height', (d) => dimensions.height - y(d.units));
        }
    }, [data]);

    const addRandom = () => {
        const dataToBeAdded = {
            name: randomstring.generate(10),
            units: Math.floor(Math.random() * (100 - 20) + 80),
        };

        setData([...data, dataToBeAdded]);
    };
    const removeLast = () => {
        if (data.length === 0) {
            return;
        }
        const slicedData = data.slice(0, data.length - 1);
        setData(slicedData);
    };

    return (
        <div className="App">
            <svg
                ref={ref}
                width={dimensions.width}
                height={dimensions.height}
            ></svg>
            <button onClick={addRandom}>Add Random</button>
            <button onClick={removeLast}>Remove Last</button>
        </div>
    );
};

export default App;
