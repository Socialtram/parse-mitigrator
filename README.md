# parse-migrator

Tiny package to retrieve recursively data from [Parse.com](https://parse.com). Created for data migrations.

Works only in io.js +1.6 and node.js +0.12 passing the following flags: `--harmony --harmony_arrow_functions`

## Installation

```bash
npm install parse-mitigrator
```

## Usage

```js
const mitigrator = require('parse-mitigrator')

const client = mitigrator({
  appId: 'blablabla',
  appKey: 's3cr3t'
})

let query = client.createQuery('User')
query.exists('email')

let fetcher = client.fetch(query, next)

function next(err, results) {
  if (err) {
    return console.error('Error:', err)
  }
  if (this.hasMore()) {
    return this.next(next)
  }
  console.log('All fetched!')
}
```

## API

### mitigrator(opts)

#### mitigrator#createQuery(entity)
Return: [`Parse.Query`](https://parse.com/docs/js/guide#queries)

#### mitigrator#fetch(query, callback)
Return: `Fetch`

### Fetch(query)

#### Fetch#run(callback)

Perform the query to parse, passing the results or error to the callback with the following notation:
`callback(err, results)`

#### Fetch#hasMore()
Return: `boolean`

Check if the current query has more results

#### Fetch#next(callback)

Fetch the next bunch of results based on the current index

## License

MIT - Socialtram Ltd and contributors
