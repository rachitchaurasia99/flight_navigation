import myfunc from "../db/index.js"
import DataTypes from "sequelize";

const City = myfunc.sq.define('City', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  iata_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country_iso2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timezone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gmt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  geoname_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

  City.sync().then(() => {
    console.log("City Model synced");
  });

export default City;
