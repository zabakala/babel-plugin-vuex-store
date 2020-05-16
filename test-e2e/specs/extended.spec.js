/**
 * -page- param  magically injected by jest-puppeteer
 */

const {
  startUpServer,
  testDefaultReactivity,
  testProgressReactivity,
  timeout,
  waitForContainer
} = require('../utils')

let srv = undefined

beforeAll(async () => {
  srv = await startUpServer()

  let url = process.env.FRAGMENT
    ? URL + process.env.FRAGMENT
    : URL

  await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await waitForContainer(page)
})

afterAll(async () => {
  await srv.tearDown()
})

describe('Extended Tests - One Browser For All Verifications', () => {
  test('Verify .p[num]-link1 reactivity', async () => {
    await testDefaultReactivity(page, '.p1-link1')
    await testDefaultReactivity(page, '.p2-link1')
    await testDefaultReactivity(page, '.p3-link1')

    await page.click('a.link1')

    await testProgressReactivity(page, '.p1-link1')
    await testProgressReactivity(page, '.p2-link1')
    await testProgressReactivity(page, '.p3-link1')
  }, timeout)

  test('Verify .p[num]-link2 reactivity', async () => {
    await testDefaultReactivity(page, '.p1-link2 span:first-child')
    await testDefaultReactivity(page, '.p1-link2 span:last-child')
    await testDefaultReactivity(page, '.p2-link2 span')
    await testDefaultReactivity(page, '.p3-link2 span')

    await page.click('a.link2')

    await testProgressReactivity(page, '.p1-link2 span:first-child')
    await testProgressReactivity(page, '.p1-link2 span:last-child')
    await testProgressReactivity(page, '.p2-link2 span')
    await testProgressReactivity(page, '.p3-link2 span')
  }, timeout)
})
