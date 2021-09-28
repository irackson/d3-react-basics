import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ScatterPlot } from './ScatterPlot';

ReactDOM.render(
    <React.StrictMode>
        <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
            <App />
            <ScatterPlot />
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
