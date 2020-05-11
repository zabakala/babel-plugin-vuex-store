/**
 * -page- param  magically injected by jest-puppeteer
 */

const {
  testDefaultReactivity,
  testProgressReactivity,
  testTitle,
  timeout,
} = require('../utils')

beforeEach(async () => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' })
})

describe('Base Tests - New Browser For Each Verification', () => {
  test('Page title', async () => {
    await testTitle(page, process.env.PAGE_TITLE)
  }, timeout)

  test('Verify .p1-link1 reactivity', async () => {
    await testDefaultReactivity(page, '.p1-link1')
    await page.click('a.link1')
    await testProgressReactivity(page, '.p1-link1')
  }, timeout)

  test('Verify .p2-link1 reactivity', async () => {
    await testDefaultReactivity(page, '.p2-link1')
    await page.click('a.link1')
    await testProgressReactivity(page, '.p2-link1')
  }, timeout)

  test('Verify .p3-link1 reactivity', async () => {
    await testDefaultReactivity(page, '.p3-link1')
    await page.click('a.link1')
    await testProgressReactivity(page, '.p3-link1')
  }, timeout)

  test('Verify .p1-link2 reactivity', async () => {
    await testDefaultReactivity(page, '.p1-link2 span:first-child')
    await testDefaultReactivity(page, '.p1-link2 span:last-child')

    await page.click('a.link2')

    await testProgressReactivity(page, '.p1-link2 span:first-child')
    await testProgressReactivity(page, '.p1-link2 span:last-child')
  }, timeout)

  test('Verify .p2-link2 reactivity', async () => {
    await testDefaultReactivity(page, '.p2-link2 span')
    await page.click('a.link2')
    await testProgressReactivity(page, '.p2-link2 span')
  }, timeout)

  test('Verify .p3-link2 reactivity', async () => {
    await testDefaultReactivity(page, '.p3-link2 span')
    await page.click('a.link2')
    await testProgressReactivity(page, '.p3-link2 span')
  }, timeout)
})
