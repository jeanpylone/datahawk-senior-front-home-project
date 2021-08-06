import { ChartOptions } from 'chart.js';

export const CHART_OPTIONS: ChartOptions = {
    defaultColor: 'black',
    responsive: true,
    maintainAspectRatio: false,
    animation:{duration:0},
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    unit: 'day'
                },
                ticks: {
                    maxTicksLimit: 10,
                    fontColor: "rgba(255,255,255,0.8)"
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    reverse: true,
                    min: 1,
                    fontColor: "rgba(255,255,255,0.8)"
                },
                gridLines: {
                    display: true,
                    color: "rgba(221,221,221,0.1)"
                },
            }
        ]
    }
};
