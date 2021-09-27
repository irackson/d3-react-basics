import './App.css';
import { FC, useRef, useEffect } from 'react';
// import * as d3 from 'd3';
import { select, selectAll } from 'd3-selection';

const App: FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        console.log(select(svgRef.current));
        // select(svgRef.current)
        //     .append('rect')
        //     .attr('width', 100)
        //     .attr('height', 100)
        //     .attr('fill', 'blue');

        selectAll('rect')
            .attr('width', 100)
            .attr('height', 100)
            .attr('fill', 'blue')
            .attr('x', (_, i) => i * 100);
    }, []);
    return (
        <div className="App">
            <svg ref={svgRef}>
                <rect />
                <rect />
                <rect />
            </svg>
        </div>
    );
};

export default App;
