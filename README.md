GOAL _

It’s required to program a web service to allow users to, when invoking an API method (POST),
to write on a shared log file such that each entry (line) is linked to the previous one using it’s
hash and a proof of work.

Expected line output CSV (file on server):
`prev_hash,message,nonce`
where:
- *prev_hash*: previous line hash (sha256) in hex format without any separators. You
  should use random for the first line.
- *message*: message sent by the user.
- *nonce*: a number that guarantees that `sha256(pre_hash + message + nonce)
  => RegEx('^00.*')`, i.e., starts with two zeroes.
  Log file content example:

    `0000000000000000000000000000000000000000000000000000000000000000,Hola Mundo,5`

    `0038711c83bd05b1e369e27246df4ba815a6dda04116b1b2f9a8c21ba4e1de38,Chau Mundo,71`

Where effectively it holds that:

`sha256(pre_hash + message + nonce) => RegEx('^00.*')`

For example, you can find in the second line:

`0038711c83bd05b1e369e27246df4ba815a6dda04116b1b2f9a8c21ba4e1de38,Chau Mundo,71`

If we want to verify the nonce is valid, we need to:

> HEX(SHA256(0038711c83bd05b1e369e27246df4ba815a6dda04116b1b2f9a8c21ba4e1de38,Chau
Mundo,71))

> 00232c7d3c2283695a4029eddc1b9e8c83914515832a04f57b402fc444aa11b5

In NodeJs you could calculate it doing:
<pre>
crypto.createHash('sha256')
      .update('0038711c83bd05b1e369e27246df4ba815a6dda04116b1b2f9a8c21ba4e1de38,Chau Mundo,71', 'utf8')
      .digest('hex')
      .toString()
</pre>

SUCCESS CRITERIA _
- Code needs to be published on Github or Gitlab. We will be reviewing commit history.
- It must contain a proper README file to help reviewers to understand how to launch or
test the application. Also, don’t forget to keep your code clean and easy to read.
- Users can perform requests (API calls) at the same time, the file log not necessarily
must be sorted by requests income time.
- The file:
  - The link between lines must hold for all the lines in the file, i.e.,
  `hash(line(n-1)) == line(n)[0])`
  - All the log lines hash must start with two zeroes.

NICE TO HAVE _

- Integration tests.
- Proper app logs to be able to troubleshoot.
- A single request must not block the file. All the requests must compete with each other
to write down in the log file.