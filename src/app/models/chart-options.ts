import { ChartOptions, Chart } from 'chart.js';

Chart.plugins.register({
    afterDatasetUpdate(chartInstance: Chart, options?: any) {
        const dataset = chartInstance?.data?.datasets?.[options.index];
        const lastDataIndex = (chartInstance as any).scales["x-axis-0"].ticks.length;

        if(dataset) {
            dataset.pointBorderWidth = 1;
            dataset.borderWidth = 2;
            dataset.hoverBorderWidth = 8;
            const lastData = dataset?.data?.[lastDataIndex];
            if (lastData) {
                const value = lastData as number;
                dataset.hoverBackgroundColor =
                dataset.hoverBorderColor =
                dataset.pointBackgroundColor =
                dataset.borderColor = `rgba(${
                    Math.round(value * Math.log(255))
                },${
                  255 - Math.round(value * 2)
                },${
                  Math.round(value)
                },${value % 10 === 1 ? 1 : 0.7})`;
                if (value % 10 === 1) {
                    dataset.borderWidth = 6;
                }
            } else {
                dataset.hoverBackgroundColor =
                dataset.hoverBorderColor =
                dataset.pointBackgroundColor =
                dataset.borderColor = `rgba(255,255,255,0.5)`;
            }
        }
    }
});

export const CHART_OPTIONS: ChartOptions = {
    defaultColor: 'black',
    responsive: true,
    maintainAspectRatio: false,
    hover: {
        mode: "dataset"
    },
    layout: {
        padding:24
    },
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
