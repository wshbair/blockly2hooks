const express = require('express')
const RippleAPI = require('ripple-lib').RippleAPI;
const keypairs = require('ripple-keypairs');
var bodyParser = require('body-parser')
//------------------------------------------------------------------------------
// Express Server Setting 
//------------------------------------------------------------------------------
const app = express()
const port = 3000
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(express.static(__dirname+'/core'))
app.use(express.static(__dirname+'/blockly'))
app.use(express.static(__dirname+'/core/catalog'))

//------------------------------------------------------------------------------
// XRPL Hooks API Setting 
//------------------------------------------------------------------------------
//const api = new RippleAPI({server: 'ws://localhost:6006'});
const api = new RippleAPI({server: 'wss://hooks-testnet.xrpl-labs.com'});

const secret  = "shGfbDdPJ1Qim3MSAizyRdZK4NSFQ";     //hook account secret (this account will receive money from /test)
//const address = keypairs.deriveAddress(keypairs.deriveKeypair(secret).publicKey) //hook account address (this account will receive money from /test)
//console.log("Hook address: " + address);

//for /test route
// const sender_secret  = "snYybavZsffNL3xr2vGjK8ULmocyL"     // address: r4aSwkyLSeb2Qypy62Uf4An5ywgvS33qc8
// const sender_address = keypairs.deriveAddress(keypairs.deriveKeypair(sender_secret).publicKey)
// const amount = BigInt(10) * 1000000n
// console.log("Test sender address: " + sender_address);
// console.log("Test amount to send: " + amount + "drops");


//------------------------------------------------------------------------------
// Create SetHook Transaction 
//------------------------------------------------------------------------------
app.post('/hook/create/sethook_tx', (req, res) => {
    // Convert WASM to binary 
    const wasmTextFile = req.body.wasmFile
    const walletAddress = req.body.walletAddress
    let buff = Buffer.from(wasmTextFile, 'base64');
    let binary = buff.toString('hex').toUpperCase();

    // SetHook transaction preparation 
    let tx = { Account: walletAddress, TransactionType: "SetHook", CreateCode: binary, HookOn: '0000000000000000'}
    console.log(">> Request to create SetHook")
    // Connent to Ripple API 
    api.connect().then(() => {
        api.prepareTransaction(tx).then((result)=>{
            api.disconnect();
            res.json(result.txJSON)
        })
    });
    api.on('error', (errorCode, errorMessage) => { res.json({errorCode : errorMessage})});

})

//------------------------------------------------------------------------------
// Sign and Publish the SetHook Transaction 
//------------------------------------------------------------------------------
app.post('/hook/sign/publish',(req,res) =>{
    console.log(">> Request to sign and publish SetHook")
    //Get the SetHook transaction 
    const setHookTxJson = JSON.parse(req.body.setHookTx)
    // Connent to Ripple API 
    api.connect().then(() => {
        let signedTx = api.sign(setHookTxJson, secret)
        api.submit(signedTx.signedTransaction).then(response =>{
            api.disconnect();
            res.json({"resultCode":response.resultCode, "resultMessage": response.resultMessage})
        }).catch ( e=> { console.log(e) });
    });
    api.on('error', (errorCode, errorMessage) => { res.json({errorCode : errorMessage})});

})

//------------------------------------------------------------------------------
// Test Accept Hook 
//------------------------------------------------------------------------------
app.get('/hook/accept/test', (req,res) =>{
    console.log(">> Test Accept Hook")

    // Test Setting 
    const sender_secret  = "snYybavZsffNL3xr2vGjK8ULmocyL"     // address: r4aSwkyLSeb2Qypy62Uf4An5ywgvS33qc8
    const sender_address = keypairs.deriveAddress(keypairs.deriveKeypair(sender_secret).publicKey)
    const amount = BigInt(10) * 1000000n

    const distination_address = "rGZfSDWpvyiko5i4v8TwLTpnEzAbVeYszV"
    // Connent to Ripple API 
    api.connect().then(() => {
        let j = {
                    Account: sender_address,
                    TransactionType: "Payment",
                    Amount: "" + amount,
                    Destination: distination_address,
                    Fee: "100000"
                } 
        api.prepareTransaction(j).then((x)=>
            {
                s = api.sign(x.txJSON, sender_secret)
                api.submit(s.signedTransaction).then( response => {
                    res.json({"TestResultCode":response.resultCode, "TestresultMessage": response.resultMessage})
                }).catch (e=> { console.log(e) });
            });
    });

    api.on('error', (errorCode, errorMessage) => { res.json({errorCode : errorMessage})});
 })

//------------------------------------------------------------------------------
// Web pages APIs 
//------------------------------------------------------------------------------
app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/Blockly2hook/default.html")
})
//------------------------------------------------------------------------------
// Start The Server
//------------------------------------------------------------------------------
app.listen(port, () => {
  console.log("***********************************")  
  console.log(`Blockly2Hook Server`)
  console.log("***********************************")  
  console.log("> Path : " + `http://localhost:${port}`)

})



