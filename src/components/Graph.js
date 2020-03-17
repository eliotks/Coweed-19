import React, { Component } from 'react'
import Chart from "chart.js";
import '../stylesheets/Graph.css';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

Chart.plugins.register([ChartAnnotation]);

export default class Graph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August"],
                datasets: [
                    {
                        label: "Infected by Coweed-19",
                        data: [1000, 9000, 70000, 500000, 1200000, 1500000, 1200000, 800000, 200000]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Title: Coweed-19'
                },
                annotation: {
                    annotations: [{
                        type: 'line',
                        mode: 'vertical',
                        scaleID: 'x-axis-0',
                        value: 2.6,
                        borderColor: "rgb(192,1,0)",
                        borderWidth: 4,
                        label: {
                            enabled: true,
                            content: 'Current day. To the left we have observed statistics. To the right we have predictions.'
                        }
                    }]
                }
            }
        });
    }
    render() {
        return (
            <div className="myGraph">
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}