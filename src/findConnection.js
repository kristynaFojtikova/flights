
const addNextConnectingFlights = (connections, allFlights, destination) => {
    return connections.reduce((acc, connection) => {
        const lastFlight = connection[connection.length - 1];
        if (lastFlight[1] === destination) {
            acc.push(connection)
        } else {
            const pastTransits = connection.map(flight => flight[0]);
            const connectingFlights = allFlights.filter(flight => flight[0] === lastFlight[1] && !pastTransits.includes(flight[1]));
            connectingFlights.forEach(flight => {
                const newConnection = [...connection, flight];
                acc.push(newConnection)
            })
        }
        return acc;
    }, [])
}

export const findConnection = (origin, destination, allFlights, maxConnections) => {
    const departures = allFlights.filter(flight => flight[0] === origin)
    let connections = departures.map(flight => [flight]);
    let i = 0;
    while (i < maxConnections - 1) {
        connections = addNextConnectingFlights(connections, allFlights, destination)
        i++
    }
    const sucessfulConnections = connections
        .filter(connection => {
            return connection[connection.length - 1][1] === destination
        })
        .sort((a,b) => a[2] > b[2] ? -1 : 1);

    const connection = sucessfulConnections[0];
    if (!connection) {
        console.log("No connection found");
        return null
    }
    console.log("Found connection: ", connection)
    return connection
}









