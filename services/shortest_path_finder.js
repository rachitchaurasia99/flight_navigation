import fs from 'fs'
import City from '../models/city.js'
const cities = await City.findAll();
const rawData = fs.readFileSync('adjacency_list.json');

const data = JSON.parse(rawData);
console.log(rawData)
const graph = data.adjacencyList

class ShortestPathBFS {
    static bfs(graph, S, par, dist, V) {
        const q = [];
        dist[S] = 0;
        q.push(S);

        while (q.length > 0) {
            const node = q.shift();
            // console.log(node)
            for (let i=1; i<V; i++) {
                if (dist[i] === Infinity) {
                    par[i] = node;
                    dist[i] = dist[node] + 1;
                    console.log(i)
                    q.push(i);
                }
            }
        }
    }

    static printShortestDistance(graph, S, D, V) {
        const par = Array(V).fill(-1);
        const dist = Array(V).fill(Infinity);
        ShortestPathBFS.bfs(graph, S, par, dist, V);

        const path = [];
        let currentNode = D;
        path.push(D);
        while (par[currentNode] !== -1) {
            // console.log(currentNode)
            path.push(par[currentNode]);
            currentNode = par[currentNode];
        }

        // Concatenate the path elements into a single string
        const pathString = path.reverse().join(" ");
        console.log(pathString);
    }

    static main() {
        const V = cities.length;
        // Source and Destination vertex
        const S = "Anaa", D = "Aden";
        // Edge list

        ShortestPathBFS.printShortestDistance(data.matrix, S, D, V);
    }
}


// Run the main function
ShortestPathBFS.main();
