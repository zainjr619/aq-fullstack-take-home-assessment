import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config();


export default {
  get(apiUrl) {
    return axios.get(apiUrl, {
      auth: {
        username: 'test',
        password: process.env.API_KEY
      }
    })
  },

  // fetch all countries
  async getCountries() {
   console.log("----->",process.env.API_KEY)
    const resp = await this.get('https://api.footprintnetwork.org/v1/countries')
    return resp.data
  },

  // fetch a single country by countryCode
  async getDataForCountry(countryCode) {
    const resp = await this.get(`https://api.footprintnetwork.org/v1/data/${countryCode}/all/EFCpc`)
    return resp.data
  }  
}