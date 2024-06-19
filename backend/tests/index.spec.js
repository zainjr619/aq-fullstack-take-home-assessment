import axios from "axios";
import request from "supertest";
import footprintApi from "../footprintApi";
import express from "express";
const app = express();

describe("GET /", () => {
  // Test case for successful data retrieval and pagination
  it('should fetch and paginate data correctly', async () => {
    const mockData = [
      { record: 'EFConsPerCap', value: 10 },
      { record: 'EFConsPerCap', value: 20 },
      { record: 'EFConsPerCap', value: 30 },
      // Add more data as needed
    ];

     // Spy on getDataForYear method
     const getDataForYearSpy = jest.spyOn(footprintApi, 'getDataForYear');
     getDataForYearSpy.mockResolvedValueOnce(mockData);

    const response = await axios.get('http://127.0.0.1:5000/?page=1&year=2000'); // Adjust the query parameters as necessary

    expect(response.status).toBe(200);
  });

  // // Test case for error handling
  it("should handle errors if no year provided from API", async () => {
    // Spy on getDataForYear method
    const getDataForYearSpy = jest.spyOn(footprintApi, "getDataForYear");
    getDataForYearSpy.mockResolvedValueOnce(new Error("API Error"));

    const response = await request(app).get("/");

    expect(response.status).toBe(404); // Expecting a 404 status code for bad request
  });

  // Test case for default pagination behavior (page 1 if no page param)
  it('should fetch data correctly', async () => {
    const mockData = [
      { record: 'EFConsPerCap', value: 10 },
      { record: 'EFConsPerCap', value: 20 },
      { record: 'EFConsPerCap', value: 30 },
      // Add more data as needed
    ];

     // Spy on getDataForYear method
     const getDataForYearSpy = jest.spyOn(footprintApi, 'getDataForYear');
     getDataForYearSpy.mockResolvedValueOnce(mockData);

    const response = await axios.get('http://127.0.0.1:5000/?year=2000'); // Adjust the query parameters as necessary

    expect(response.status).toBe(200);
  });
});
