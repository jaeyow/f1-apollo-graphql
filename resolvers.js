const axios = require('axios');
const DataLoader = require('dataloader');
const Promise = require('promise');

const resultLoader = new DataLoader((rounds) => {
    return getAllData(rounds.map((round) => {
        // console.log(`Axios get: http://ergast.com/api/f1/2019/${round}/results.json?limit=1`);
        return `http://ergast.com/api/f1/2019/${round}/results.json?limit=1`;
    }));
});

function getAllData(URLs){
    return Promise.all(URLs.map(fetchData));
}

function fetchData(URL) {
    return axios
      .get(URL)
      .then(function(response) {
        //   console.log(`Return round: ${response.data.MRData.RaceTable.Races[0].round}`);
        return response.data.MRData.RaceTable.Races[0].Results;
      })
      .catch(function(error) {
        console.log(`Error: ${error}`);
      });
  }

// Resolver map
const resolvers = {
    Query: {
      results() {
        return axios
          .get(`http://ergast.com/api/f1/2019/results.json?limit=5`)
          .then(res => {
            // console.log(res.data.MRData.RaceTable.Races[0].Results);
            return res.data.MRData.RaceTable.Races[0].Results;
          })
          .catch(function (error) {
            // handle error
            console.log(`Error: ${error}`);
          });
      },
      races() {
        return axios
          .get(`http://ergast.com/api/f1/2019.json`) // Ergast Data
          .then(res => {
            // console.log(res.data.MRData.RaceTable.Races);
            return res.data.MRData.RaceTable.Races;
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      },
      raceResults() {
        return axios
          .get(`http://ergast.com/api/f1/2019.json`) // Ergast Data
          .then(res => {
            return res.data.MRData.RaceTable.Races;
          })
          .catch(function (error) {
            // handle error
            console.log(`Error: ${error}`);
          });
      }
    },
    RaceResult: {
        async results(parent) {
            return await resultLoader.load(parent.round);
        }
    }
  };

  module.exports = resolvers;