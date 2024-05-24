const createCitiesTable = `
    CREATE TABLE IF NOT EXISTS cities (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
`;

export default createFlightsTable;
