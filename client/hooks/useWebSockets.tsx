import { useEffect } from 'react';

export const useWebSockets = () => {
	useEffect(() => {
		const websocket = new WebSocket('ws://127.0.0.1:8001');

		websocket.onopen = (event) => {
			console.log("connected", event);
		}

		websocket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log(data);
		}

		return () => {
			websocket.close()
		}
	}, [])
}