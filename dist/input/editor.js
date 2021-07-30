import {
  Signature
} from '../../index.js'

export const components = {
  Signature
}

export const config = {"logo":"./example-logo.png","displayName":"Signature","name":"signature-library","version":"1.0.1","components":[{"name":"Signature","displayName":"Signature","icon":"./example-thumbnail.png","defaultWidth":162,"defaultHeight":111,"props":[{"name":"backgroundColor","displayName":"Background Color","type":"color","default":"@background"},{"name":"penColor","displayName":"Pen Color","type":"color","default":"@text"},{"name":"buttonColor","displayName":"Button Background Color","type":"color","default":"@primary"},{"name":"clearText","displayName":"Clear Button Text","type":"text","default":"Clear"},{"name":"saveText","displayName":"Save Button Text","type":"text","default":"Save"},{"name":"buttonTextColor","displayName":"Button Text Color","type":"color","default":"@background"},{"name":"borderColor","displayName":"Border Color","type":"color","default":"@text"},{"name":"action","displayName":"Action on Saved Signature","type":"action","arguments":[{"type":"text","displayName":"Signature Image"}]}]}]}