/**
 * -page- param  magically injected by jest-puppeteer
 */

const {
  testDefaultReactivity,
  testProgressReactivity,
  timeout
} = require('../utils')

beforeAll(async () => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' })
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
