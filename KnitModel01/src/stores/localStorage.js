class localStorage {
  // add
  setVal(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val))
  }
  // get
  getVal(key) {
    const val = window.localStorage.getItem(key)
    return val ? JSON.parse(val) : null
  }
  // find
  findVal(key) {
    return window.localStorage.getItem(key) ? true : false
  }
  // delete
  deleteVal(key) {
    window.localStorage.removeItem(key)
  }
  // clear
  clear() {
    window.localStorage.clear()
  }
}

export default new localStorage()
