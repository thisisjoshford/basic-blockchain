const SHA256 = require('crypto-js/sha256');

class Block{
  //index is location of the block
  constructor(index, timestamp, data, prevHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.calculateHash;
  }

  calculateHash(){
    return SHA256(
      this.index +
      this.prevHash +
      this.timestamp +
      JSON.stringify(this.data)
      ).toString();
  }
}

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }

    createGenesisBlock(){
      return new Block(0, "06/30/2020", "Genesis Block", "0");
  }

    getLatestBlock(){
      return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
      newBlock.prevHash = this.getLatestBlock().hash;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
    }

    isChainValid(){
      for(let i = 1; i < this.chain.length; i ++){
        const currentBlock = this.chain[i];
        const prevBlock = this.chain[i -1];

        if(currentBlock.hash !== currentBlock.calculateHash()){
          return false;
        }

        if(currentBlock.prevHash !== prevBlock.hash){
          return false;
        }

        return true;
      }
    }
}

let blockCoin = new Blockchain();
blockCoin.addBlock(new Block(1, "06/30/2020", { amount: 10 }))
blockCoin.addBlock(new Block(2, "06/30/2020", { amount: 20 }))

console.log('is blockchain valid? ' + blockCoin.isChainValid());

// console.log(JSON.stringify(blockCoin, null, 4));
