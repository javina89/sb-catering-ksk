const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const url = 'https://raw.githubusercontent.com/javina89/sb-json/main/catering.json';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Not ok, return a 500 error
            return { statusCode: 500, body: 'Error fetching the JSON' };
        }
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};