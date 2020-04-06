const Roll4Win = artifacts.require('./Roll4Win.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Roll4Win', ([deployer, author, tipper]) => {
  let roll4Win

  before(async () => {
    roll4Win = await Roll4Win.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await roll4Win.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await roll4Win.name()
      assert.equal(name, 'Roll4.Win - Decentralized Dice Gaming')
    })
  })

  describe('posts', async () => {
    let result, postCount

    before(async () => {
      result = await roll4Win.createPost('This is my first post', { from: author })
      postCount = await roll4Win.postCount()
    })

    it('creates posts', async () => {
      // SUCESS
      assert.equal(postCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(event.content, 'This is my first post', 'content is correct')
      assert.equal(event.tipAmount, '0', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')

      // FAILURE: Post must have content
      await roll4Win.createPost('', { from: author }).should.be.rejected;
    })

    it('lists posts', async () => {
      const post = await roll4Win.posts(postCount)
      assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(post.content, 'This is my first post', 'content is correct')
      assert.equal(post.tipAmount, '0', 'tip amount is correct')
      assert.equal(post.author, author, 'author is correct')
    })

  })
})
