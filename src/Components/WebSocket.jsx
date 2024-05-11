import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const WebSocket = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const client = new W3CWebSocket('ws://localhost:1729');
        
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        
        client.onmessage = (message) => {
            console.log('Received:', message.data);
            // if (message.data.includes(studentId)) {
                // Update the UI with the received message
               // setMessage('Marks updated for student: ' + studentId);
                // Fetch updated student data from the server
                // You can call the student details API here
            //}
        };
        
        return () => {
            client.close();
        };
    }, []);

    return <div>WebSocket Component</div>;
};

export default WebSocket