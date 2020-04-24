const axios = require('axios');
const DataLoader = require('dataloader');
const Promise = require('promise');

const resultLoader = new DataLoader((parents) => {
    return getAllData(parents.map((parent) => {
        return `http://ergast.com/api/f1/${parent.season}/${parent.round}/results.json?limit=1`;
    }));
});

function getAllData(URLs) {
    return Promise.all(URLs.map(fetchData));
}

function fetchData(URL) {
    return axios
        .get(URL)
        .then(function (response) {
            return response.data.MRData.RaceTable.Races[0].Results;
        })
        .catch(function (error) {
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
        raceResults(parent, args) {
            const { season } = args;
            return axios
                .get(`http://ergast.com/api/f1/${season}.json`)
                .then(res => {
                    return res.data.MRData.RaceTable.Races;
                })
                .catch(function (error) {
                    // handle error
                    console.log(`Error: ${error}`);
                });
        },
        raceResultsV2(parent, args) {
            const { season } = args;
            return axios
                .get(`http://ergast.com/api/f1/${season}/results.json?limit=1000`)
                .then(res => {
                    return res.data.MRData.RaceTable.Races;
                })
                .catch(function (error) {
                    // handle error
                    console.log(`Error: ${error}`);
                });
        },
        seasons() {
            return axios
                .get(`http://ergast.com/api/f1/seasons.json?limit=100`)
                .then(res => {
                    return res.data.MRData.SeasonTable.Seasons
                        .sort((a, b) => (parseInt(a.season) > parseInt(b.season) ? -1 : 1));
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
    },
    RaceResult: {
        async results(parent) {
            return await resultLoader.load(parent);
        }
    }
};

module.exports = resolvers;