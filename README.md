## Blockly2Hooks
A platform for developing visually XRPL hooks smart contracts using [Blockly][2] from Google. 
The platform helps users to develop XRPL Hook using visual drag-and-drop blocks. Also, it compiles the hook code into WASM format.
We have also integrated the deployment function into the XRPL Hook testnet network.

We build our hooks block based on the official documentation of the XRPL Hook [https://xrpl-hooks.readme.io/](https://xrpl-hooks.readme.io/)

### Getting Started 

Clone the Blockly2hook repository 

```bash
git clone https://github.com/wshbair/blockly2hooks
```

Install required libraries
```bash
npm install
```

Run the server
```bash
npm start
```

Open the browser using [http://localhost:3000/](http://localhost:3000/)

![Blockly2Hook]( blockly2hook_shot.png)

### XRPL Hooks Examples
The platform has been integrated with some hooks for testing. 

More examples can be found on [https://github.com/XRPL-Labs/xrpld-hooks/tree/hooks-ssvm/hook-api-examples](https://github.com/XRPL-Labs/xrpld-hooks/tree/hooks-ssvm/hook-api-examples)

<!--- ### Online Demo --->
<!--- Please open the following link in your browser: --->
<!--- https://bit.ly/blockly2hooks --->

### Credits
This project has been inspired and built using [Ardublockly][1]. 

We have extended and adapted it to fit the XRPL Hooks development requirements. 

### Acknowledgment 
This project has been funded by the XRPL grant program 2021 

[https://xrplgrants.org/grantees](https://xrplgrants.org/grantees)


[1]: https://github.com/carlosperate/ardublockly
[2]: https://developers.google.com/blockly 
 
