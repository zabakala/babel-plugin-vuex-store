export function increment (state, payload) {
  state.count += payload
}

export function incrementPowered (state) {
  state.countPowered = state.count * state.count
}

export function setTime (state) {
  state.actionTime = Date.now()
}

export function randomize (state, payload) {
  state.rootRandom = Math.random() * 1000 * payload
}
