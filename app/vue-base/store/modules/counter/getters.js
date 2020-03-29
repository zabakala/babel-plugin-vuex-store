export const total = (state) => {
  return state.count
}

export const totalMultiplied = (state) => (multiplier) => {
  return state.count * multiplier
}
