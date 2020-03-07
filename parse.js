const parse = require('csv-parse')
const fs = require('fs')

const INPUT = 'data/input.csv'
const OUTPUT = 'data/output.csv'

const parseResult = entry => {
    const [
        cents,
        names,
    ] = entry

    let output = [cents, names].join(',')

    fs.appendFileSync(OUTPUT, output + '\n')
}

let lineNumber = 0
const readResults = parser => {
    let entry
    while (entry = parser.read()) {
        lineNumber && parseResult(entry)
        lineNumber++
    }
}

const parseAllResults = () => {
    const data = fs.readFileSync(INPUT, 'utf8')
    const parser = parse({delimiter: ','})
    parser.on('readable', () => readResults(parser))
    parser.write(data)
    parser.end()
}

fs.existsSync(OUTPUT) && fs.unlinkSync(OUTPUT)
fs.appendFileSync(OUTPUT, 'cents,names\n')

parseAllResults()
