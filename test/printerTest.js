const stdout = require('test-console').stdout;

const Printer = require('../infrastructure/Printer')

describe('Printer', () => {
  const lines = [
    'Random phrase',
    'another phrase',
    '3rd phrase'
  ]

  it('prints on the console', () => {
    const printer = new Printer()
    const consoleRedirection = stdout.inspect()

    lines.forEach(line => printer.print(line) )

    consoleRedirection.restore()
    expect(consoleRedirection.output).to.deep.eq([
      lines[0]+'\n',
      lines[1]+'\n',
      lines[2]+'\n',
    ])
  })
})
