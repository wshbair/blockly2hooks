const express = require('express')
const app = express()
const port = 3000

const RippleAPI = require('ripple-lib').RippleAPI;
const keypairs = require('ripple-keypairs');
const fs = require('fs');
const api = new RippleAPI({server: 'ws://localhost:6006'});

//for / route
const secret  = "shGfbDdPJ1Qim3MSAizyRdZK4NSFQ";     //hook account secret (this account will receive money from /test)
const address = keypairs.deriveAddress(keypairs.deriveKeypair(secret).publicKey) //hook account address (this account will receive money from /test)
console.log("Hook address: " + address);

//for /test route
const sender_secret  = "snYybavZsffNL3xr2vGjK8ULmocyL"     // address: r4aSwkyLSeb2Qypy62Uf4An5ywgvS33qc8
const sender_address = keypairs.deriveAddress(keypairs.deriveKeypair(sender_secret).publicKey)
const amount = BigInt(10) * 1000000n
console.log("Test sender address: " + sender_address);
console.log("Test amount to send: " + amount + "drops");

app.get('/', (req, res) => {
api.on('error', (errorCode, errorMessage) => {console.log(errorCode + ': ' + errorMessage);});
api.on('connected', () => {console.log('connected');});
api.on('disconnected', (code) => {console.log('disconnected, code:', code);});
api.connect().then(() => {

              let data_in = "-----WASM binary data AGFzbQEAAAABnICAgAAEYAV/f39/fwF+YAN/f34BfmACf38Bf2ABfgF+AqOAgIAAAwNlbnYCX2cAAgNlbnYGYWNjZXB0AAEDZW52BXRyYWNlAAADg4CAgAACAwMEhICAgAABcAAABYOAgIAAAQABBoGAgIAAAAeYgICAAAMGbWVtb3J5AgAEY2JhawADBGhvb2sABAqwgICAAAKEgICAAABCAAuhgICAAABBEEEUQTBBEkEAEAIaQQBBAEIAEAEaQQFBARAAGkIACwuxgICAAAIAQRALFCJBY2NlcHQuYzogQ2FsbGVkLiIAAEEwCxJBY2NlcHQuYzogQ2FsbGVkLgA=";
              let data = data_in.split(' ')[3]; // "data:;base64," + data.split('\n')[1];
              //console.log("data" + data);
              let buff = new Buffer(data, 'base64');
              let text = buff.toString('ascii');
              //console.log('"' + data + '" converted from Base64 to ASCII is "' + text + '"');
              binary = buff.toString('hex').toUpperCase();
              //console.log("Our binary : " + binary);
          j = {
              Account: address,
              TransactionType: "SetHook",
              CreateCode: binary,
              HookOn: '0000000000000000'
          }
          api.prepareTransaction(j).then( (x)=>
          {
              let s = api.sign(x.txJSON, secret)
              console.log(s)
              api.submit(s.signedTransaction).then( response => {
                  console.log(response.resultCode, response.resultMessage);
                  process.exit(0);
              }).catch ( e=> { console.log(e) });
          });
      }).then(() => {}).catch(console.error);
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
      api.on('error', (errorCode, errorMessage) => {console.log(errorCode + ': ' + errorMessage);});
      api.on('connected', () => {console.log('connected');});
      api.on('disconnected', (code) => {console.log('disconnected, code:', code);});
      api.connect().then(() => {

          let j = {
              Account: sender_address,
              TransactionType: "Payment",
              Amount: "" + amount,
              Destination: address,
              Fee: "100000"
          }
          api.prepareTransaction(j).then((x)=>
          {
              s = api.sign(x.txJSON, sender_secret)
              console.log(s)
              api.submit(s.signedTransaction).then( response => {
                  console.log(response.resultCode, response.resultMessage);
                  process.exit(0);
              }).catch (e=> { console.log(e) });
          });

      }).then(() => {}).catch(console.error);
  res.send('Test payment route.')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})