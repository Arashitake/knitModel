class localStorage {
  // add
  setVal(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val))
  }
  // find
  getVal(key) {
    const val = window.localStorage.getItem(key)
    if (val) return JSON.parse(val)
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
