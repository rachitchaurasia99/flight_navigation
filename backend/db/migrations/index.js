import City from '../../models/city.js'

const runDbMigrations = async ()=>{
  console.log('BEGIN DB MIGRATION');
  const mike = City.create({
    name: "Delhi",
    country: 'India',
  });
  console.log('END DB MIGRATION');
}

export default runDbMigrations;
