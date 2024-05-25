import fs from 'fs'
import City from '../models/city.js'
const cities = await City.findAll();
const rawData = fs.readFileSync('adjacency_list.json');
import PriorityQueue from 'js-priority-queue';
// import weather from '../city_weather.json'
const weatherData = fs.readFileSync('city_weather.json');

const data = JSON.parse(rawData);
const wData = JSON.parse(weatherData);
const w = wData.weather;
const graph = data.adjacencyList
// console.log(graph)

    function dijkstra(adj, S, D, n) {
        const dist = {};
        const parent = {};

        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
            dist[city.name] = Infinity;
            parent[city.name] = city.name;
        }

        dist[S] = 0;

        // Initialize priority queue
        const pq = new PriorityQueue({ comparator: (a, b) => a[0] - b[0] });

        // Push the source node to the queue.
        pq.queue([0, S]);

        while (pq.length > 0) {
            const [dis, node] = pq.dequeue();

            for(const adjNode in adj[String(node)]) {
                const edW = adj[String(node)][String(adjNode)]
                if (edW < 7000 && w[String(adjNode)] == 'OK' && dis + edW < dist[String(adjNode)]) {
                    dist[String(adjNode)] = dis + edW;
                    pq.queue([dis + edW, String(adjNode)]);
                    parent[String(adjNode)] = String(node);
                }
            }
        }

        if (dist[String(D)] === Infinity) return [-1];

        // Store the final path in the ‘path’ array.
        const path = [];
        let node = String(D);

        // Iterate backwards from destination to source through the parent array.
        while (parent[node] !== node) {
            path.push(node);
            node = parent[node];
        }
        path.push(S);
        path.reverse();
        return path;
    }

    async function shortest_path(src, dst){
        const n = cities.length;
        const path = dijkstra(graph,src,dst,n)
        const path_response = []
        path.forEach((element) => {
            const city  = cities.find(city => city.name === element);
            path_response.push({
                cityName: element,
                latitude: city.latitude,
                longitude: city.longitude
            })
        });
        return path_response
    }

    export default shortest_path
