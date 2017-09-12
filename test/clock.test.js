const Clock = require('../infrastructure/Clock')
const timeKeeper = require('timekeeper')

describe('Clock', () => {
  const currentTime = new Date('October 13, 2014 11:13:00')

  it('gives the current Date', () => {
    timeKeeper.freeze(currentTime)
    const clock = new Clock()

    const now = clock.now()

    expect(now).toEqual(new Date())
    timeKeeper.reset()
  })
})
