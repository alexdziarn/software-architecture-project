const { Pool } = require("pg")
const { start, dropTable, createTable, insertData, getData } = require('./populate')
const { stockList } = require("./stockList")


jest.mock("pg", () => {
    const mockClient = jest.fn(() => {
        return {
            end: jest.fn(),
            query: jest.fn().mockReturnValue({
                rows:[{
                    ticker: "TEST",
                    name: "TEST",
                    rsi: 45
                }]
            })
        }
    })
    const mockPool = jest.fn(() => {
        return {
            connect: mockClient
        }
    })
    return { Pool: mockPool }
})


describe("start()", () => {
    let client;
    let pool;
    
    beforeEach(async () => {
        pool = new Pool();
        client = pool.connect();
        await start();
    })
    it("should initialize the client", () => {
        expect(pool.connect).toHaveBeenCalled();
    })
})

describe("db queries", () => {
    const mClient = {
        query: jest.fn()
    }
    afterEach(() => {
        jest.clearAllMocks();
    })
    it("dropTable()", async () => {
        await dropTable(mClient);
        expect(mClient.query).toHaveBeenCalledTimes(1)
    })
    it("createTable()", async () => {
        await createTable(mClient);
        expect(mClient.query).toHaveBeenCalledTimes(1)
    })
    it("insertData", async () => {
        await insertData(mClient, stockList);
        expect(mClient.query).toHaveBeenCalledTimes(2)
    })
    it("getData", async () => {
        const getDataMClient = {
            query: jest.fn().mockReturnValue({rows: []})
        }
        await getData(getDataMClient);
        expect(getDataMClient.query).toHaveBeenCalledTimes(1)
    })
})
