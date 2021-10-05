
const addNextConnectingFlights = (connections: [string, string, number][][], allFlights: [string, string, number][], destination: string) => {
    return connections.reduce((acc: [string, string, number][][], connection) => {
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

export const findConnection = (origin: string, destination: string, allFlights: [string, string, number][], maxConnections: number) => {
    const departures = allFlights.filter(flight => flight[0] === origin)
    let connections: [string, string, number][][] = departures.map(flight => [flight]);
    let i = 0;
    while (i < maxConnections - 1) {
        connections = addNextConnectingFlights(connections, allFlights, destination)
        i++
    }
    const connection = connections
        .filter(connection => {
            return connection[connection.length - 1][1] === destination
        })
        .sort((a,b) => a[2] > b[2] ? -1 : 1)[0]
    if (!connection) {
        console.log("No connection found");
        return null
    }
    console.log("Found connection: ", connection)
    return connection
}









