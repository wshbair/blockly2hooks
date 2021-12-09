/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Arduino map functionality.
 *     The Arduino built in functions syntax can be found at:
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: This block can be improved to set the new range properly.
 */
 'use strict';
 goog.provide('Blockly.Blocks.essential'); 
 goog.require('Blockly.Blocks');
 goog.require('Blockly.Types');
 
 
 /** Common HSV hue for all blocks in this category. */
 Blockly.Blocks.essential.HUE = 120;
    /**
     * Block for defining the Hook cbak() and hook() functions.
     * @this Blockly.Block
     */
 Blockly.Blocks['hook_template'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("cbak()");
      this.appendStatementInput('SETUP_FUNC');
      this.appendDummyInput()
          .appendField("hook()");
      this.appendStatementInput('LOOP_FUNC');
      this.setInputsInline(false);
      this.setColour( Blockly.Blocks.essential.HUE);
      this.setTooltip("Block for defining the Hook cbak() and hook() functions");
      this.setHelpUrl('');
      this.contextMenu = false;
    },
    /** @return {!boolean} True if the block instance is in the workspace. */
    getArduinoLoopsInstance: function() {
      return true;
    }
  };
  



  Blockly.Blocks['_g_function'] = {
    init: function() {
      this.jsonInit({
        "message0": "_g %1 %2 %3",
        "args0": [
          {
            "type": "input_dummy"
          },
          {
            "type": "input_value",
            "name": "arg1",
            "check": Blockly.Types.NUMBER.checkList
          },
          {
            "type": "input_value",
            "name": "arg2",
            "check": Blockly.Types.NUMBER.checkList
          }
        ],
        "inputsInline": true,
        "colour": Blockly.Blocks.essential.HUE,
        "tooltip": "",
        "helpUrl": "",
        "previousStatement": null,
        "nextStatement": null,
      });
    }
  };

  Blockly.Blocks['comment'] = {
    // Text value.
    init: function() {
      this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
      this.setColour(Blockly.Blocks.essential.HUE );
      this.appendDummyInput()
          .appendTitle('Comment:')
          .appendTitle(new Blockly.FieldTextInput(''), 'TEXT');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP);
    }
  };

  Blockly.Blocks['sfcodes'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Select sfcodes")
        .appendField(new Blockly.FieldDropdown(
          [["sfInvalid","sfInvalid"],  
          ["sfGeneric","sfGeneric"],
          ["sfLedgerEntry","sfLedgerEntry"],
          ["sfTransaction","sfTransaction"], 
          ["sfValidation","sfValidation" ], 
          ["sfMetadata","sfMetadata"],
          ["sfHash","sfHash"],
          ["sfIndex","sfIndex"],
          ["sfCloseResolution","sfCloseResolution"],
          ["sfMethod","sfMethod"],
          ["sfTransactionResult","sfTransactionResult"],
          ["sfTickSize","sfTickSize"],
          ["sfUNLModifyDisabling","sfUNLModifyDisabling"],
          ["sfLedgerEntryType","sfLedgerEntryType"],
          ["sfTransactionType","sfTransactionType"],
          ["sfSignerWeight","sfSignerWeight"],
          ["sfVersion","sfVersion"],
          ["sfFlags","sfFlags"],
          ["sfSourceTag","sfSourceTag"],
          ["sfSequence","sfSequence"],
          ["sfPreviousTxnLgrSeq","sfPreviousTxnLgrSeq"],
          ["sfLedgerSequence","sfLedgerSequence"],
          ["sfCloseTime","sfCloseTime"],
          ["sfParentCloseTime","sfParentCloseTime"],
          ["sfSigningTime","sfSigningTime"],
          ["sfExpiration","sfExpiration"],
          ["sfTransferRate","sfTransferRate"],
          ["sfWalletSize","sfWalletSize"],
          ["sfOwnerCount","sfOwnerCount"],
          ["sfDestinationTag","sfDestinationTag"],
          ["sfHighQualityIn","sfHighQualityIn"],
          ["sfHighQualityOut","sfHighQualityOut"],
          ["sfLowQualityIn","sfLowQualityIn"],
          ["sfLowQualityOut","sfLowQualityOut"],
         ["sfQualityIn","sfQualityIn"],
         ["sfQualityOut","sfQualityOut"],
         ["sfStampEscrow","sfStampEscrow"],
         ["sfBondAmount","sfBondAmount"],
         ["sfLoadFee","sfLoadFee"],
         ["sfOfferSequence","sfOfferSequence"],
         ["sfFirstLedgerSequence","sfFirstLedgerSequence"], 
         ["sfLastLedgerSequence","sfLastLedgerSequence"],
         ["sfTransactionIndex","sfTransactionIndex"],
         ["[sfOperationLimit","sfOperationLimit"], 
         ["sfReferenceFeeUnits","sfReferenceFeeUnits"], 
         ["sfReserveBase","sfReserveBase"],
         ["sfReserveIncrement","sfReserveIncrement"],
         ["sfSetFlag","sfSetFlag" ],
         ["sfClearFlag","sfClearFlag" ],
         ["sfSignerQuorum","sfSignerQuorum"], 
         ["sfCancelAfter","sfCancelAfter"],
         ["sfFinishAfter","sfFinishAfter"],
         ["sfSignerListID","sfSignerListID"],
         ["sfSettleDelay","sfSettleDelay"],
         ["sfHookStateCount","sfHookStateCount"],
         ["sfHookReserveCount","sfHookReserveCount"], 
         ["sfHookDataMaxSize","sfHookDataMaxSize"],
         ["sfEmitGeneration","sfEmitGeneration"],
         ["sfIndexNext","sfIndexNext"],
         ["sfIndexPrevious",""],
         ["sfBookNode","sfBookNode"],
         ["sfOwnerNode","sfOwnerNode"],
         ["sfBaseFee","sfBaseFee"],
         ["sfExchangeRate","sfExchangeRate"],
         ["sfLowNode","sfLowNode"],
         ["sfHighNode","sfHighNode"],
         ["sfDestinationNode","sfDestinationNode"],
         ["sfCookie","sfCookie"],
         ["sfServerVersion","sfServerVersion"],
         ["sfEmitBurden","sfEmitBurden"],
         ["sfHookOn","sfHookOn"],
         ["sfEmailHash","sfEmailHash"], 
         ["sfTakerPaysCurrency","sfTakerPaysCurrency"],
         ["sfTakerPaysIssuer","sfTakerPaysIssuer"],
         ["sfTakerGetsCurrency","sfTakerGetsCurrency"],
         ["sfTakerGetsIssuer","sfTakerGetsIssuer"],
         ["sfLedgerHash","sfLedgerHash"],
         ["sfParentHash","sfParentHash"],
         ["sfTransactionHash","sfTransactionHash"],
         ["sfAccountHash","sfAccountHash"],
         ["sfPreviousTxnID","sfPreviousTxnID"], 
         ["sfLedgerIndex","sfLedgerIndex"],
         ["sfWalletLocator","sfWalletLocator"], 
         ["sfRootIndex","sfRootIndex"],
         ["sfAccountTxnID","sfAccountTxnID"],
         ["sfEmitParentTxnID","sfEmitParentTxnID"],
         ["sfEmitNonce","sfEmitNonce"],
         ["sfBookDirectory","sfBookDirectory"],
         ["sfInvoiceID","sfInvoiceID"],
         ["sfNickname","sfNickname"],
         ["sfAmendment","sfAmendment"],
         ["sfTicketID","sfTicketID"],
         ["sfDigest","sfDigest"],
         ["sfPayChannel","sfPayChannel"], 
         ["sfConsensusHash","sfConsensusHash"],
         ["sfCheckID","sfCheckID"],
         ["sfValidatedHash","sfValidatedHash"],
         ["sfAmount","sfAmount"],
         ["sfBalance","sfBalance"],
         ["sfLimitAmount"], 
         ["sfTakerPays","sfTakerPays"],
         ["sfTakerGets","sfTakerGets"], 
         ["sfLowLimit","sfLowLimit"],
         ["sfHighLimit","sfHighLimit"],
         ["sfFee","sfFee"],
         ["sfSendMax","sfSendMax"], 
         ["sfDeliverMin","sfDeliverMin" ],
         ["sfMinimumOffer","sfMinimumOffer" ],
         ["sfRippleEscrow","sfRippleEscrow" ],
         ["sfDeliveredAmount","sfDeliveredAmount"], 
         ["sfPublicKey","sfPublicKey"],
         ["sfMessageKey","sfMessageKey"],
         ["sfSigningPubKey","sfSigningPubKey"], 
         ["sfTxnSignature","sfTxnSignature"],
         ["sfSignature","sfSignature"],
         ["sfDomain","sfDomain"],
         ["sfFundCode","sfFundCode" ],
         ["sfRemoveCode","sfRemoveCode"],
         ["sfExpireCode","sfExpireCode"],
         ["sfCreateCode","sfCreateCode"],
         ["sfMemoType","sfMemoType"],
         ["sfMemoData","sfMemoData"],
         ["sfMemoFormat","sfMemoFormat"],
         ["sfFulfillment","sfFulfillment"],
         ["sfCondition","sfCondition"],
         ["sfMasterSignature","sfMasterSignature"],
         ["sfUNLModifyValidator","sfUNLModifyValidator"],
         ["sfNegativeUNLToDisable","sfNegativeUNLToDisable"],
         ["sfNegativeUNLToReEnable","sfNegativeUNLToReEnable"],
         ["sfHookData","sfHookData"],
         ["sfAccount","sfAccount"],
         ["sfOwner","sfOwner"],
         ["sfDestination","sfDestination"],
         ["sfIssuer","sfIssuer"],
         ["sfAuthorize","sfAuthorize"],
         ["sfUnauthorize","sfUnauthorize"],
         ["sfTarget","sfTarget"],
         ["sfRegularKey","sfRegularKey"],
         ["sfPaths","sfPaths"],
         ["sfIndexes","sfIndexes"],
         ["sfHashes","sfHashes"],
         ["sfAmendments","sfAmendments"],
         ["sfTransactionMetaData","sfTransactionMetaData"],
         ["sfCreatedNode","sfCreatedNode"],
         ["sfDeletedNode","sfDeletedNode"],
         ["sfModifiedNode","sfModifiedNode" ],
         ["sfPreviousFields","sfPreviousFields"], 
         ["sfFinalFields","sfFinalFields"],
         ["sfNewFields","sfNewFields" ],
         ["sfTemplateEntry","sfTemplateEntry"],
         ["sfMemo","sfMemo"],
         ["sfSignerEntry","sfSignerEntry"],
         ["sfEmitDetails","sfEmitDetails"],
         ["sfSigner","sfSigner"],
         ["sfMajority","sfMajority"],
         ["sfNegativeUNLEntry","sfNegativeUNLEntry"],
         ["sfSigningAccounts","sfSigningAccounts"],
         ["sfSigners","sfSigners"],
         ["sfSignerEntries","sfSignerEntries"],
         ["sfTemplate","sfTemplate"],
         ["sfNecessary","sfNecessary"],
         ["sfSufficient","sfSufficient"],
         ["sfAffectedNodes","sfAffectedNodes"],
         ["sfMemos","sfMemos"],
         ["sfMajorities","sfMajorities"],
         ["sfNegativeUNL","sfNegativeUNL"]]
        ), "VALUE");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(Blockly.Blocks.essential.HUE);

  }
};