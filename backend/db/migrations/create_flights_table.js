const createFlightsTable = `
    CREATE TABLE IF NOT EXISTS flights (
        id INT PRIMARY KEY,
        number VARCHAR(255) NOT NULL
    );
`;

export default createFlightsTable;
