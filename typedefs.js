const { gql } = require('apollo-server');

// Schema definition
const typeDefs = gql`
    type Driver {
        driverId: String
        permanentNumber: String
        code: String
        url: String
        givenName: String
        familyName: String
        dateOfBirth: String
        nationality: String
    }

    type Constructor {
        constructorId: String
        url: String
        name: String
        nationality: String
    }

    type Time {
        millis: String
        time: String
    }

    type AverageSpeed {
        units: String
        speed: String
    }

    type FastestLap {
        rank: String
        lap: String
        Time: Time
        AverageSpeed: AverageSpeed
    }

    type Result {
        number: Int
        position: Int
        positionText: String
        points: Float
        Driver: Driver
        Constructor: Constructor
        grid: String
        laps: Int
        status: String
        Time: Time
        FastestLap: FastestLap
    }

    type QResult {
        number: Int
        position: Int
        points: Float
        Driver: Driver
        Constructor: Constructor
        Q1: String
        Q2: String
        Q3: String
    }

    type Location {
        lat: String
        long: String
        locality: String
        country: String
    }

    type Circuit {
        circuitId: String
        url: String
        circuitName: String
        Location: Location
    }

    type Race {
        season: String
        round: String
        url:  String
        raceName: String
        Circuit: Circuit
        date: String
        time: String
    }

    type RaceResult {
        season: String
        round: Int
        url:  String
        raceName: String
        Circuit: Circuit
        date: String
        time: String
        Results: [Result]
    }

    type QualifyingResult {
        season: String
        round: Int
        url:  String
        raceName: String
        Circuit: Circuit
        date: String
        time: String
        QualifyingResults: [QResult]
    }

    type Season {
        season: String
        url: String
    }

    type Query {
        results: [Result]
        races: [Race]
        raceResults(season: String!, resultsLimit: Int): [RaceResult]
        seasons: [Season]
        qualifying(season: String!): [QualifyingResult] 
    }
`;

module.exports =  typeDefs;
