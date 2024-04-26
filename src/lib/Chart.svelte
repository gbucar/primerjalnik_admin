<script lang="ts">
	import { Line } from 'svelte-chartjs';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';
	import { formatTime } from './utils';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	export let data: any;
	let formattedData: any = {};

	let base = {
		fill: true,
		lineTension: 0.3,
		backgroundColor: '#bbbbbb',
		borderColor: '#cccccc',
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: 'rgb(205, 130,1 58)',
		pointBackgroundColor: 'rgb(255, 255, 255)',
		pointBorderWidth: 10,
		pointHoverRadius: 5,
		pointHoverBackgroundColor: 'rgb(0, 0, 0)',
		pointHoverBorderColor: 'rgba(220, 220, 220,1)',
		pointHoverBorderWidth: 2,
		pointRadius: 1,
		pointHitRadius: 10
	};
	console.log(data);
	$: formattedData = {
		labels: data.map((a: any) => formatTime(a.noisecapture_timestamp_utc)),
		datasets: [
			{
				...base,
				label: 'hrup (db(A))',
				data: data.map((a: any) => Math.round(a.leq)),
				borderColor: '#fecaca',
				backgroundColor: '#b91c1c'
			},
			{
				...base,
				label: 'pm 1 (µg/m3)',
				data: data.map((a: any) => a.pm1),
				borderColor: '#15803d',
				backgroundColor: '#bbf7d0'
			},
			{
				...base,
				label: 'pm 2,5 (µg/m3)',
				data: data.map((a: any) => a.pm25),
				borderColor: '#065f46',
				backgroundColor: '#a7f3d0'
			},
			{
				...base,
				label: 'pm 10 (µg/m3)',
				data: data.map((a: any) => a.pm10),
				borderColor: '#4d7c0f',
				backgroundColor: '#d9f99d'
			},
			{
				...base,
				label: 'vlaga (%)',
				data: data.map((a: any) => (a.humidity > -1 ? a.humidity : null)),
				borderColor: '#b45309',
				backgroundColor: '#fde68a'
			},
			{
				...base,
				label: 'temperatura (°C)',
				data: data.map((a: any) => (a.temperature > -300 ? a.temperature : null)),
				borderColor: '#1d4ed8',
				backgroundColor: '#bfdbfe'
			}
		]
	};
</script>

<Line data={formattedData} />
