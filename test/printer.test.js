const Printer = require('../infrastructure/Printer')

describe('Printer', () => {
  const lines = [
    'Random phrase',
    'another phrase',
    '3rd phrase'
  ]

  it('prints on the console', () => {
    console.log = jest.fn()
    const printer = new Printer()

    lines.forEach(line => printer.print(line))

    expect(console.log).toHaveBeenCalledWith(lines[0])
    expect(console.log).toHaveBeenCalledWith(lines[1])
    expect(console.log).toHaveBeenCalledWith(lines[2])
  })
})
