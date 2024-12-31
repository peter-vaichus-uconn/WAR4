//test
import C2 from "./face/2C@3x.png";
import C3 from "./face/3C@3x.png";
import C4 from "./face/4C@3x.png";
import C5 from "./face/5C@3x.png";
import C6 from "./face/6C@3x.png";
import C7 from "./face/7C@3x.png";
import C8 from "./face/8C@3x.png";
import C9 from "./face/9C@3x.png";
import CT from "./face/TC@3x.png";
import CJ from "./face/JC@3x.png";
import CQ from "./face/QC@3x.png";
import CK from "./face/KC@3x.png";
import CA from "./face/AC@3x.png";

import S2 from "./face/2S@3x.png";
import S3 from "./face/3S@3x.png";
import S4 from "./face/4S@3x.png";
import S5 from "./face/5S@3x.png";
import S6 from "./face/6S@3x.png";
import S7 from "./face/7S@3x.png";
import S8 from "./face/8S@3x.png";
import S9 from "./face/9S@3x.png";
import ST from "./face/TS@3x.png";
import SJ from "./face/JS@3x.png";
import SQ from "./face/QS@3x.png";
import SK from "./face/KS@3x.png";
import SA from "./face/AS@3x.png";

import H2 from "./face/2H@3x.png";
import H3 from "./face/3H@3x.png";
import H4 from "./face/4H@3x.png";
import H5 from "./face/5H@3x.png";
import H6 from "./face/6H@3x.png";
import H7 from "./face/7H@3x.png";
import H8 from "./face/8H@3x.png";
import H9 from "./face/9H@3x.png";
import HT from "./face/TH@3x.png";
import HJ from "./face/JH@3x.png";
import HQ from "./face/QH@3x.png";
import HK from "./face/KH@3x.png";
import HA from "./face/AH@3x.png";

import D2 from "./face/2D@3x.png";
import D3 from "./face/3D@3x.png";
import D4 from "./face/4D@3x.png";
import D5 from "./face/5D@3x.png";
import D6 from "./face/6D@3x.png";
import D7 from "./face/7D@3x.png";
import D8 from "./face/8D@3x.png";
import D9 from "./face/9D@3x.png";
import DT from "./face/TD@3x.png";
import DJ from "./face/JD@3x.png";
import DQ from "./face/QD@3x.png";
import DK from "./face/KD@3x.png";
import DA from "./face/AD@3x.png";



function randomNoRepeats(array) {
    var copy = array.slice(0); //copy
    return function() { // return inner function 
      if (copy.length < 1) { copy = array.slice(0); } //recreate copy if exhausted
      var index = Math.floor(Math.random() * copy.length); //get random index
      var item = copy[index]; //get item
      copy.splice(index, 1);  //remove item
      return item;            //return item
    };
  }
  
  class Queue {
      constructor() {
          this.items = {}
          this.frontIndex = 0
          this.backIndex = 0
      }
      enqueue(item) {
          this.items[this.backIndex] = item
          this.backIndex++
          return item + ' inserted'
      }
      dequeue() {
          const item = this.items[this.frontIndex]
          delete this.items[this.frontIndex]
          this.frontIndex++
          return item
      }
      peek() {
          return this.items[this.frontIndex]
      }

      length(){
        return this.backIndex - this.frontIndex;
      }

      get printQueue() {
          return this.items;
      }
  }

const deck1 = new Queue()
const deck2 = new Queue()


var cards = [
[14, SA],
[13, SK],
[12, SQ],
[11, SJ],
[10, ST],
[9, S9],
[8, S8],
[7, S7],
[6, S6],
[5, S5],
[4, S4],
[3, S3],
[2, S2],

[14, CA],
[13, CK],
[12, CQ],
[11, CJ],
[10, CT],
[9, C9],
[8, C8],
[7, C7],
[6, C6],
[5, C5],
[4, C4],
[3, C3],
[2, C3],


[2, H2],
[3, H3],
[4, H4],
[5, H5],
[6, H6],
[7, H7],
[8, H8],
[9, H9],
[10, HT],
[11, HJ],
[12, HQ],
[13, HK],
[14, HA],

[2, D2],
[3, D3],
[4, D4],
[5, D5],
[6, D6],
[7, D7],
[8, D8],
[9, D9],
[10, DT],
[11, DJ],
[12, DQ],
[13, DK],
[14, DA]

]



// for (let i = 0; i < 26; i++) {
//     deck1.enqueue(cards[i]); 
// }
// for (let i = 26; i < 52; i++) {
//     deck2.enqueue(cards[i]);
// }

var chooser = randomNoRepeats(cards);

for (let i = 0; i < 26; i++) {
    deck1.enqueue(chooser());
}
   
for (let i = 0; i < 26; i++) {
    deck2.enqueue(chooser());
}

export { Queue }
export { deck1, deck2 };



