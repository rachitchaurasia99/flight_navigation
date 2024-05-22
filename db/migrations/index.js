import db from "../index.js"

const runDbMigrations = async ()=>{
  console.log('BEGIN DB MIGRATION');

  // use single client forn transactions
  const client = await db.connect()
}

export default runDbMigrations;
