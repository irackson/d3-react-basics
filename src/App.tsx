import './App.css';
import { FC, useEffect, useRef, useState } from 'react';
import { select, Selection } from 'd3-selection';
import { groups } from 'd3-array';

const data = [
    { units: 150, color: 'purple' },
    { units: 100, color: 'red' },
    { units: 50, color: 'blue' },
    { units: 70, color: 'teal' },
    { units: 120, color: 'orange' },
];

const App: FC = () => {
    const ref = useRef<SVGSVGElement | null>(null);

    const [selection, setSelection] = useState<Selection<
        SVGSVGElement | null,
        unknown,
        null,
        undefined
    > | null>(null);

    useEffect(() => {
        if (!selection) {
            setSelection(select(ref.current));
        } else {
            const rects = selection
                .selectAll('rect')
                .data(data)
                .attr('width', 100)
                .attr('height', (d) => d.units)
                .attr('fill', (d) => d.color)
                .attr('x', (_, i) => i * 100);

            rects
                .enter()
                .append('rect')
                .attr('width', 100)
                .attr('height', (d) => d.units)
                .attr('fill', (d) => d.color)
                .attr('x', (_, i) => i * 100);
        }
    }, [selection]);
    return (
        <div className="App">
            <svg ref={ref} width={500}>
                <rect> </rect>
                <rect> </rect>
                <rect> </rect>
            </svg>
        </div>
    );
};

export default App;
