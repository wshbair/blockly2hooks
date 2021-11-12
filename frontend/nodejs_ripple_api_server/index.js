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

//------------------------------------------------------------------------------
// Ripple API Setting 
//------------------------------------------------------------------------------
const api = new RippleAPI({server: 'ws://localhost:6006'});

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


 })



app.listen(port, () => {
  console.log("***********************************")  
  console.log(`Blockly2Hook Ripple_API Server`)
  console.log("***********************************")  
  console.log("> Path : " + `http://localhost:${port}`)

})





// api.on('error', (errorCode, errorMessage) => {console.log(errorCode + ': ' + errorMessage);});
// api.on('connected', () => {console.log('connected');});
// api.on('disconnected', (code) => {console.log('disconnected, code:', code);});
// // api.connect().then(() => {

//               console.log(req.body)
//               let data_in = "-----WASM binary data AGFzbQEAAAABnICAgAAEYAV/f39/fwF+YAN/f34BfmACf38Bf2ABfgF+AqOAgIAAAwNlbnYCX2cAAgNlbnYGYWNjZXB0AAEDZW52BXRyYWNlAAADg4CAgAACAwMEhICAgAABcAAABYOAgIAAAQABBoGAgIAAAAeYgICAAAMGbWVtb3J5AgAEY2JhawADBGhvb2sABAqwgICAAAKEgICAAABCAAuhgICAAABBEEEUQTBBEkEAEAIaQQBBAEIAEAEaQQFBARAAGkIACwuxgICAAAIAQRALFCJBY2NlcHQuYzogQ2FsbGVkLiIAAEEwCxJBY2NlcHQuYzogQ2FsbGVkLgA=";
//               let data = data_in.split(' ')[3]; // "data:;base64," + data.split('\n')[1];
//               let buff = new Buffer(data, 'base64');
//               let text = buff.toString('ascii');
//                binary = buff.toString('hex').toUpperCase();
//            j = {
//               Account: address,
//               TransactionType: "SetHook",
//               CreateCode: binary,
//               HookOn: '0000000000000000'
//           }
//           api.prepareTransaction(j).then( (x)=>
//           {
//               let s = api.sign(x.txJSON, secret)
//               console.log(s)
//               api.submit(s.signedTransaction).then( response => {
//                   console.log(response.resultCode, response.resultMessage);
//               }).catch ( e=> { console.log(e) });
//           });
//       }).then(() => {}).catch(console.error);

// app.post('/test', (req, res) => {
//       api.on('error', (errorCode, errorMessage) => {console.log(errorCode + ': ' + errorMessage);});
//       api.on('connected', () => {console.log('connected');});
//       api.on('disconnected', (code) => {console.log('disconnected, code:', code);});
//       api.connect().then(() => {

//           let j = {
//               Account: sender_address,
//               TransactionType: "Payment",
//               Amount: "" + amount,
//               Destination: address,
//               Fee: "100000"
//           }
//           api.prepareTransaction(j).then((x)=>
//           {
//               s = api.sign(x.txJSON, sender_secret)
//               console.log(s)
//               api.submit(s.signedTransaction).then( response => {
//                   console.log(response.resultCode, response.resultMessage);
//               }).catch (e=> { console.log(e) });
//           });

//       }).then(() => {}).catch(console.error);
//   res.send('Test payment route.')
// })