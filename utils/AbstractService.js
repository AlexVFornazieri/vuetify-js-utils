import axios from 'axios'
import Cookies from 'js-cookie'
import cookieparser from 'cookieparser'
import { API_URL } from './apiURL'

/**
 * Abstract Service for Cloud Function/Auth Token require requests API
 */
export default class {
  /**
   * New services Constuctor, passs endpoint entrie for actions
   * @param {String} endpoint
   * @param {Object} req
   */
  constructor (endpoint, req) {
    this.req = req
    this.endpoint = endpoint
  }

  request (contentType = 'application/json') {
    let config = {}

    this.baseUrl = this.baseUrl || API_URL

    // SSR
    if (typeof this.req === 'object') {
      config = {
        baseURL: `${this.baseUrl}`,
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': contentType,
          Authorization: `${cookieparser.parse(this.req.headers.cookie).access_token}`,
        },
      }
    } else {
      config = {
        baseURL: `${this.baseUrl}`,
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': contentType,
          Authorization: `${Cookies.get('access_token')}`,
        },
      }
    }

    return axios.create(config)
  }
}
