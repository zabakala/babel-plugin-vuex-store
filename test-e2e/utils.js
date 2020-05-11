/**
 *
 * @param {Object} page
 * @param {String} pSelector
 * @returns {Promise<*>}
 */
const getEvaluatedElement = async (page, pSelector) => {
  const pHandle = await page.$(pSelector)
  return await page.evaluate(elm => elm.textContent, pHandle)
}

/**
 *
 * @type {number}
 */
module.exports.timeout =  process.env.SLOWMO ? 30000 : 10000

/**
 *
 * @param {Object} page
 * @param {String} targetTitle
 * @returns {Promise<void>}
 */
module.exports.testTitle = async (page, targetTitle) => {
  const title = await page.title()
  expect(title).toBe(targetTitle)
}

/**
 *
 * @param {Object} page
 * @param {String} pSelector
 * @returns {Promise<void>}
 */
module.exports.testDefaultReactivity = async (page, pSelector) => {
  let pElm = await getEvaluatedElement(page, pSelector)
  expect(Number(pElm)).toBe(0)
}

/**
 *
 * @param {Object} page
 * @param {String} pSelector
 * @returns {Promise<void>}
 */
module.exports.testProgressReactivity = async (page, pSelector) => {
  let pElm = await getEvaluatedElement(page, pSelector)
  expect(Number(pElm)).toBeGreaterThan(0)
}
