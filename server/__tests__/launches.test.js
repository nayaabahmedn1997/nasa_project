const request = require('supertest');
const app = require('../src/app');
const { connectMongoDB, mongoDisconnect } = require('../src/services/mongo');
describe('Test GET /launches', () => {

    beforeAll(async () => {
        await connectMongoDB();
    });

    afterAll(async () => {
        await mongoDisconnect();
    })

    test('It should response with 200 success', async () => {
        const response = await request(app).get('/launches')
            .expect('Content-Type', /json/)
            ;
        const statusCode = response.statusCode
        expect(statusCode).toBe(200);
    })
});


describe('Test POST /launches', () => {

    beforeAll(async () => {
        await connectMongoDB();
    });

    afterAll(async () => {
        await mongoDisconnect();
    })

    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .post("/launches")
            .send({
                "mission": "ZTMadada155",
                "rocket": "ZTM Experimental IS1",
                "destination": "Kepler-442 b",
                "launchDate": "October 13, 2014 11:13:00"
            }).expect('Content-Type', /json/);
        const statusCode = response.statusCode;
        console.log(response.message)
        //expect(statusCode).toBe(201);
        expect(response.body).toMatchObject({
            "message": "Launch added successfully",
        })
    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post("/launches")
            .send({
                mission: 'USS Enterprise',
                rocket: "NCC 1701-D",
                launchDate: 'January 4,2028'
            }).expect('Content-Type', /json/);
        const statusCode = response.statusCode;
        expect(statusCode).toBe(400);
        expect(response.body).toStrictEqual({
            "error": "Missing required launch property",
        })
    });

    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post("/launches")
            .send({
                mission: 'USS Enterprise',
                rocket: "NCC 1701-D",
                destination: 'Kepler-186 f',
                launchDate: 'Jary 4,2028'
            }).expect('Content-Type', /json/);
        const statusCode = response.statusCode;
        expect(statusCode).toBe(400);
        expect(response.body).toStrictEqual({
            "error": "Invalid launch Date",
        })
    });
});


describe("Test Delete launches", () => {

    beforeAll(async () => {
        await connectMongoDB();
    });

    afterAll(async () => {
        await mongoDisconnect();
    })

    test('Test to successfully abort launch', async () => {
        const flightNumber = 101;
        const response = await request(app)
            .delete(`/launches/${flightNumber}`)
            .expect('Content-Type', /json/);
        const statusCode = response.statusCode;
        expect(statusCode).toBe(200);
        expect(response.body).toMatchObject({ "message": "Successfully aborted the launch" });
    });


    test('test to unsuccessfully abort launch', async () => {
        const flightNumber = 2000;
        const response = await request(app)
            .delete(`/launches/${flightNumber}`)
            .expect('Content-Type', /json/);
        console.log(response.body)
        const statusCode = response.statusCode;
        expect(statusCode).toBe(404);
        expect(response.body).toMatchObject({
            "message": "Launch not found."
        })
    });
});