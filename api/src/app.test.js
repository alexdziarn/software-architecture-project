const request = require("supertest");
const { app } = require("./app");
const { Pool } = require("pg")

const testRows = [{
    ticker: "TEST",
    name: "TEST",
    rsi: "45"
}]

jest.mock("pg", () => {
    const mockClient = {
        query: jest.fn().mockReturnValue({
            rows: testRows
        })
    }
    const mockPool = {
        connect: jest.fn(() => mockClient)
    }
    return { Pool: jest.fn(() => mockPool) }
})

describe("app routes", () => {
    let pool;
    let client;
    beforeEach(() => {
        pool = new Pool();
        client = pool.connect();
        client.query = jest.fn().mockReturnValue({
            rows: testRows
        })
    })

    describe("GET /", () => {
        it("responds with Hello World", async () => {
            const res = await request(app)
            .get("/")
            expect(res.status).toBe(200)
            expect(res.text).toEqual("Hello World!")
        })
    })
    
    describe("GET /getStockAll/:ticker", () => {
        it("gets all data for stock", async () => {
            const res = await request(app)
            .get("/getStockAll/TEST")
            expect(res.status).toBe(200)
            expect(res.text).toEqual(JSON.stringify(testRows[0]))
        })
        it("sends error when fails", async () => {
            client.query = jest.fn().mockImplementationOnce(() => {
                throw new Error("an error")
            })
            const res = await request(app)
            .get("/getStockAll/TEST")
            expect(res.status).toBe(500)
            expect(res.error.text).toContain("an error")
        })
    })
    
    describe("GET /getStockName/:ticker", () => {
        it("gets name of company", async () => {
            const res = await request(app)
            .get("/getStockName/TEST")
            expect(res.status).toBe(200)
            expect(res.text).toContain(testRows[0].name)
        })
        it("sends error when fails", async () => {
            client.query = jest.fn().mockImplementationOnce(() => {
                throw new Error("an error")
            })
            const res = await request(app)
            .get("/getStockName/TEST")
            expect(res.status).toBe(500)
            expect(res.error.text).toContain("an error")
        })
    })

    describe("GET /getStockRSI/:ticker", () => {
        it("gets rsi of company", async () => {
            const res = await request(app)
            .get("/getStockRSI/TEST")
            expect(res.status).toBe(200)
            expect(res.body.rsi).toContain(testRows[0].rsi)
        })
        it("sends error when fails", async () => {
            client.query = jest.fn().mockImplementationOnce(() => {
                throw new Error("an error")
            })
            const res = await request(app)
            .get("/getStockRSI/TEST")
            expect(res.status).toBe(500)
            expect(res.error.text).toContain("an error")
        })
    })

    describe("GET /getStockAnalysis/:ticker", () => {
        it("gets analysis of company", async () => {
            const res = await request(app)
            .get("/getStockAnalysis/TEST")
            expect(res.status).toBe(200)
            expect(res.body.ticker).toEqual(testRows[0].ticker)
            expect(res.body.analysis).toEqual("hold")
        })
        it("sends error when fails", async () => {
            client.query = jest.fn().mockImplementationOnce(() => {
                throw new Error("an error")
            })
            const res = await request(app)
            .get("/getStockAnalysis/TEST")
            expect(res.status).toBe(500)
            expect(res.error.text).toContain("an error")
        })
    })
})

