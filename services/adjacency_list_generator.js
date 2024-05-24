import City from '../models/city.js'
import fs from 'fs';
const cities = await City.findAll();
import Graph from "graph-data-structure";

// console.log(cities.length)
function haversineDistance(lat1, lon1, lat2, lon2) {
    // Radius of the earth in km
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

async function generateAdjacencyList() {
    const cities = await City.findAll();
    var adjacencyList = {};

    for (let i = 0; i < cities.length; i++) {
        adjacencyList[cities[i].name] = {}; // Initialize an empty object for each city

        for (let j = 0; j < cities.length; j++) {
            if (i !== j) {
                const distance = haversineDistance(
                    cities[i].latitude, cities[i].longitude,
                    cities[j].latitude, cities[j].longitude
                );

                // Push the neighbor and distance to the city's adjacency list
                adjacencyList[cities[i].name][cities[j].name] = distance;
            }
        }
    }

    // console.log(adjacencyList)
    // Save the adjacency matrix to a JSON file
    fs.writeFileSync('adjacency_list.json', JSON.stringify({
      adjacencyList
    }));

    console.log('Adjacency matrix saved to adjacency_matrix.json');
}
generateAdjacencyList();

export default null;
