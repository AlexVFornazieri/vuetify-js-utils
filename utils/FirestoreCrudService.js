import { isString } from 'lodash'
import db from '~/firebase/firestore'
import { auth } from '~/firebase/fireauth'
import { planeObject } from '~/utils'
import { contributeWarnLog } from '.'

/**
 * Abstract Service for CRUD Operations in Firestore
 */
export class FirestoreCrudService {
  constructor (serviceName) {
    this.serviceName = serviceName
    this.collection = db.collection(serviceName)
  }

  getSubcollectionService (docId, subcollectionName, Constructor) {
    const path = this.serviceName + '/' + docId + '/' + subcollectionName
    return new FirestoreCrudService(path)
  }

  /**
   * Merge a pice of data to a stored doc.
   */
  merge (_id, obj) {
    return new Promise((resolve, reject) => {
      const user = auth.currentUser
      const data = planeObject(obj)
      data.updatedAt = new Date()
      data.updater = {
        email: user.email,
        name: user.displayName || user.name || user.email.split('@')[0],
      }
      this.collection.doc(_id)
        .set(data, { merge: true })
        .then((docRef) => {
          resolve(docRef)
        })
        .catch((error) => {
          console.error('Error to merge', error)
          reject(error)
        })
    })
  }

  /**
   * Create or update a doc
   */
  async save (obj, isUpdate = false) {
    const user = auth.user || auth.currentUser
    const data = planeObject(obj)

    if (!data.createdAt) {
      data.createdAt = new Date()
      data.creator = {
        email: user.email,
        name: user.displayName || user.name || user.email.split('@')[0],
      }
    } else {
      data.updatedAt = new Date()
      data.updater = {
        email: user.email || user._id,
        name: user.displayName || user.email.split('@')[0],
      }
    }

    const captalize = ['title', 'displayName', 'name', 'description']

    for (const prop in data) {
      let v = data[prop]
      if (isString(v) && prop !== '_id') {
        v = v.trim()
        if (captalize.includes(prop)) {
          v = v.charAt(0).toUpperCase() + v.slice(1)
        }
      }
      data[prop] = v
    }

    let ref = this.collection.doc()
    if (data._id) {
      ref = this.collection.doc(data._id)
      if (!isUpdate) {
        // Check if doc exist
        const doc = await ref.get()
        if (doc.exists) {
          throw new Error('doc_exists')
        }
      }
    }

    data.active = true

    // Return Promise
    return ref.set(data)
      .then(() => {
        data._id = ref.id
        return data
      })
      .catch((error) => {
        console.error('Error to persist.', error)
        throw error
      })
  }

  /**
   * Get a doc data.
   */
  get (_id, params) {
    return new Promise((resolve, reject) => {
      const docRef = this.collection.doc(_id)
      docRef.get().then((doc) => {
        if (!doc.exists) { throw new Error('Doc not exists.') }
        const obj = Object.assign({ _id: doc.id }, doc.data())
        if (!obj.active) { throw new Error('Doc inactivated, you need restore before get.') }
        resolve(obj)
      }).catch((error) => {
        console.error('Error to get.', error)
        reject(error)
      })
    })
  }

  /**
   * List collection docs.
   */
  async list (params) {
    try {
      params = Object.assign({
        // Default prams
        active: true,
        activeProp: 'active',
      }, params)

      const items = []

      // Quering
      let query = this.collection
      if (!params.ignoreActive) {
        query = query.where(params.activeProp, '==', params.active)
      }
      if (params.limit) { query = query.limit(params.limit) }
      console.log(params)
      if (params.search) {
        const hits = await this.search(params.query)
        hits.forEach((doc) => {
          items.push(doc)
        })
      } else {
        const querySnapshot = await query.get()
        querySnapshot.forEach((doc) => {
          items.push(Object.assign(doc.data(), { _id: doc.id }))
        })
      }
      return { items }
    } catch (err) {
      console.error('Error when listing items', err)
      throw err
    }
  }

  async search (query) {
    try {
      const algoliasearch = require('algoliasearch')
      const client = algoliasearch(process.env.algoliaAppId, process.env.algoliaSearchKey)
      const index = client.initIndex(process.env.algoliaPrefix + this.serviceName)
      // Perform an Algolia search:
      // https://www.algolia.com/doc/api-reference/api-methods/search/
      const response = await index.search({ query })
      console.log(response)
      return response.hits
    } catch (err) {
      console.warn('Can\'t perform search')
      console.warn('     Tip1: Set "algoliaAppId" and "algoliaPrefix" in process env on node env and/or nuxt config.')
      console.warn('     Tip2: Install algoliasearch dependence')
      contributeWarnLog()
      console.error(err)
    }
  }

  /**
   * Remove a collection doc.
   */
  remove (data) {
    return new Promise((resolve, reject) => {
      this.collection.doc(data._id).delete().then(function () {
        resolve()
      }).catch(function (error) {
        console.error('Error to delete.', error)
        reject(error)
      })
    })
  }
}
