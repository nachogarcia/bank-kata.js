const Clock = require('../infrastructure/Clock')
const timeKeeper = require('timekeeper')

describe('Clock', () => {
  const currentTime = new Date("October 13, 2014 11:13:00")

  before( () => {
    timeKeeper.freeze(currentTime)
  })

  it('gives the current Date', () => {
    const clock = new Clock()

    const now = clock.now()

    expect(now).deep.eq(new Date())
  })

  after( () => {
    timeKeeper.reset()
  })
})
