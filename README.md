# Climate Warrior

This is a dapp created to incentivize donations towards climate change, based on the concept of B-CAT.

## Main Idea

Donate towards climate change to gain climate warrior badges. Badges gained will be displayed on their social media profiles.

## Development Setup

### Running at Local Environment

1. Install <a href = "https://www.truffleframework.com/ganache">Ganache</a>.

2. Launch `Ganache` and generate a blockchain running locally on port 7545.

3. Install Truffle globally.
    ```javascript
    npm install -g truffle
    ```

4. Make a local copy of this repo.
    ```javascript
    git clone http://jiayushe.github.com/climate-warrior
    ```

5. Compile the smart contracts.
    ```javascript
    truffle compile
    ```

6. Migrate the smart contracts to your local blockchain.
    ```javascript
    truffle migrate
    ```

7. Install <a href = "https://metamask.io/">Metamask</a> in your browser (Chrome or Firefox).

8. Connect `Metamask` to Custom RPC at http://127.0.0.1:7545.

7. Run the `liteserver` development server for front-end hot reloading. Note that smart contract changes must be manually recompiled and migrated.
    ```javascript
    npm run dev
    ```
