import { useState } from 'react'
import background1 from "./Screenshot 2024-11-21 at 1.21.42 PM.png";
import background2 from "./Screenshot 2024-11-21 at 1.29.16 PM.png";

import ReactCardFlip from 'react-card-flip';
import './App.css'

import { deck1 }  from './faces';
import { deck2 } from './faces'
import { Queue } from './faces';

const first1 = deck1.dequeue() // [2,H2]
const first2 = deck2.dequeue() // [2,S2]

function App() {

  const [p1_count, setCount1] = useState(26)
  const [p2_count, setCount2] = useState(26)

  const [w1_count, setWager1] = useState(0)
  const [w2_count, setWager2] = useState(0)

  const [result, setResult] = useState("...")
  const [prize, setPrize] = useState([])

  const [isFlipped, setIsFlipped] = useState(true)
  const [flipButton, setFlipButton] = useState(true)
  const [claimButton, setClaimButton] = useState(false)     //revealed after flip is clicked and cards are different
  const [warButton, setWarButton] = useState(false)         //revealed after flip clicked and cards are same
  const [refreshButton, setRefreshButton] = useState(false)

  //placeholder card light switches
  const [tcCard, setTCCard] = useState(false)
  const [bcCard, setBCCard] = useState(false)
  //for maintaining the placeholder faces
  const [tcface, setTCFace] = useState()
  const [bcface, setBCFace] = useState()

  //hide the flip action - triggered after war button clicked ("wager")
  const [flipVisible, setFlipVisible] = useState(true)
  const [winner_color,setWinner_Color] = useState("")

  const[war_boolean,setWar_Boolean] = useState(0) //signifies if we are in a war


  const [war_flipButton, setWar_FlipButton] = useState(false) //revealed after war is clicked
  const [war_claimButton, setWar_ClaimButton] = useState(false)
  
  //first two cards in the deck. ex: face1 = [2, C2]
  const [face1, setFace1] = useState(first1)
  const [face2, setFace2] = useState(first2)


  //flip the card (change the state of isFlipped)
  const flipCard = () => {
    setIsFlipped(!isFlipped); 
  };

  //flip button lightswitch
  const showFlip = () => {
    setFlipButton(!flipButton)
  }

  //claim button lightswitch
  const showClaim = () => {
    setClaimButton(!claimButton)
  }

  //war button lightswitch
  const showWar = () => {
    setWarButton(!warButton)
  }

  //refresh button lightswitch
  const showRefresh = () => {
    setRefreshButton(!refreshButton)
  }

  const showWar_Flip = () => {
    setWar_FlipButton(!war_flipButton)
  }
  const showWar_Claim = () => {
    setWar_ClaimButton(!war_claimButton)
  }

  const showTC = () => {
    setTCCard(!tcCard)
  }
  const showBC = () => {
    setBCCard(!bcCard)
  }

  const showFlipVisible = () => {
    setFlipVisible(!flipVisible)
  }

  function counterFaces(face1,face2){
    setTCFace(face1[1])
    setBCFace(face2[1])
  }

  function decrement1(){
    if(p1_count == 0){return}
    setCount1(p1_count-1)
  }

  function decrement2(){
    if(p2_count == 0){return}
    setCount2(p2_count-1)
  }

  function compare(face1,face2){
    if(face1[0] > face2[0]){
      setResult("Card 1 wins")
      setWinner_Color("red")
      return 0
      
    }
    else if(face1[0] < face2[0]){
      setResult("Card 2 wins")
      setWinner_Color("blue")
      return 1
    }
    else{
      setResult("WAR!")
      setWinner_Color("")
      setWarButton(!warButton)
      return 2
    }

  }


  


// STATE - FLIP BUTTON HANDLER - START//

  function handle_flipButton(){
    flipCard()                    //flip animation
    decrement1()                  //take a card from deck2
    decrement2()                  //take a card from deck2
    showFlip()                    //hide the flip button

    
    if(compare(face1,face2)!=2){  //if the cards are not the same
      showClaim()                 //show the claim button
    }
    else{                         //else
      setWar_Boolean(1)           //we are now in a war, so turn the boolean true
      showWar()                   //show the war button ("wager")
    }
  }

// END - FLIP BUTTON HANDLER - END//


// STATE - CLAIM FUNCTION AND CLAIM BUTTON HANDLER - START//

  function claim(temp1,temp2){

    if(p1_count ==0){                 //if no cards left for player1
      setWinner_Color("blue")         //turn the winning banner blue
      setResult("Player 2 Wins!")     //announce that player2 won
      showRefresh()                   //reveal play again button
      return                          //end function

    }
    else if(p2_count==0){             //if no cards left for player2 
      setWinner_Color("red")          //turn the winning banner red
      setResult("Player 1 Wins!")     //announce that player1 won
      showRefresh()                   //reveal play again button
      return                          //end function

    }
    else{
      setWinner_Color("black")
      setResult("...")
    }
   
    setFace1(deck1.dequeue())         //draw new card for the next hand
    setFace2(deck2.dequeue())         //draw new card for the next hand
    
    if(temp1[0] > temp2[0]){          //if player1 card higher
      deck1.enqueue(temp1)            //add both cards to player1 deck
      deck1.enqueue(temp2)            //add both cards to player1 deck
      setCount1(p1_count+2)           //increase the total count of player1 cards by 2
    }
    else if(temp1[0] < temp2[0]){     //if player2 card higher
      deck2.enqueue(temp2)            //add both cards to player2 deck
      deck2.enqueue(temp1)            //add both cards to player2 deck
      setCount2(p2_count+2)           //increase the total count of player2 cards by 2
    }
    showFlip()                        //reveal the flip button 

  }

  function handle_claimButton(){
    flipCard()                        //flp animation
    claim(face1,face2)                //claim function adds cards to winning hand
    showClaim()                       //hide the claim button
  }


// END - CLAIM FUNCTION AND CLAIM BUTTON HANDLER - END//




// START - WAR BUTTON HANDLER, WAR_FLIP, WAR_CLAIM - START//

function handle_warButton(){

  // Add the two current cards to the prize pool
  
  if(war_boolean==1){
    setPrize((prevPrize) => [...prevPrize, face1, face2]);
  }
  
  let p1_take = p1_count
  let p2_take = p2_count

  for(let i = 0; i < 3; i++){
    if(p1_take > 1 && p2_take > 1){
      //functional form of useState
      setWager1(((prevW1) => prevW1 + 1))
      setCount1((prevp1)=> prevp1-1)
      setWager2(((prevW2) => prevW2 + 1))
      setCount2(((prevp2) => prevp2 -1))
      p1_take -= 1
      p2_take -= 1

      //use constant variables not usestate, which only updates at the end
      const nextCard1 = deck1.dequeue(); //set battlecard
      const nextCard2 = deck2.dequeue(); //set battlecard
      setPrize((prevPrize) => [...prevPrize, nextCard1, nextCard2]);
    }
    else{
      break
    }
  }

  setTCCard(true)
  setBCCard(true)

  counterFaces(face1,face2)     //set placeholder card faces


  showWar()                     //hide the war button
  showFlipVisible()             //hide the flip cards and thus the flip action
  flipCard()                    //flip the cards
  showWar_Flip()                //reveal the war flip button
  

  setFace1(deck1.dequeue())     
  setFace2(deck2.dequeue())
}

//a flip function, but for war
function war_flip(){            //"battle card"
  showWar_Flip()                //hide war_flip button
  showFlipVisible()             //turn on flip animation visibility
  flipCard()                    //flip the card
  decrement1()                  //decrease total p1 count
  decrement2()                  //decrease total p2 count


  
  if(compare(face1,face2) ==2){   
    if(p1_count == 1){          //in the event that player1's last card triggers a war, player1 will lose
      setWinner_Color("red")                              
      setResult("Player 1 runs out of cards\nPlayer 2 wins!")
      setWarButton(false)
      showRefresh()
      return
    }
    else if(p2_count == 1){     //in the event that player2's last card triggers a war, player2 will lose 
      setWinner_Color("blue")   
      setResult("Player 2 runs out of cards\nPlayer 1 wins!")
      setWarButton(false)
      showRefresh()
      return
    }
    else{
      setWar_Boolean(0) //if another war is triggered, have shut this off
      showWar() 

    }
  }
  else{
    showWar_Claim()
  }

  setPrize(         // Replace the state
    [               // with a new array
      ...prize,     // that contains all the old items
      face1,        // plus the new values
      face2 
    ]
  )

}

const war_claim = () => {
  showWar_Claim()         //hide war claim button "CLAIM SPOILS"
  setWar_Boolean(0)       //set war boolean to false because no longer in a war
  setWager1(0)            //clear player1 wager cards
  setWager2(0)            //clear player2 wager cards
  showFlip()              //reveal the flip button

  showTC()                //hide the top place holder card
  showBC()                //hide the bottom place holder card
  flipCard()              //flip annimation

  if(face1[0]> face2[0]){
    for(const element of prize){
      deck1.enqueue(element) 
    }
    setCount1(p1_count+(prize.length))
  }
  else{
    for(const element of prize){
      deck2.enqueue(element)
    }
    setCount2(p2_count+(prize.length))
  }

  setFace1(deck1.dequeue())
  setFace2(deck2.dequeue())

  setWinner_Color("black")
  setResult("...")
  setTCCard(false)
  setBCCard(false)
  setPrize([])//reset prize pool
}


// END - WAR BUTTON HANDLER - END//


  const refresh = () => {
    window.location.reload();
  }

  return (
    <>
 
    <div className="button-container">

      <button className="">{p1_count}</button>
      <button className="">{p2_count}</button>
      <button className="">{war_boolean}</button>
      <div style={{color: `${winner_color}`}} className="result">{result}</div>
  
      {flipButton && (<button className="button" onClick={() => { handle_flipButton() }}>FLIP</button>)}
      {claimButton && (<button className="button" onClick={() => { handle_claimButton() }}>CLAIM</button>)}
      {warButton && (<button className="button" onClick={() => { handle_warButton() }}>WAGER</button>)}
      {war_flipButton && (<button className="button" onClick={() => { war_flip() }}>BATTLE CARD</button>)}
      {war_claimButton && (<button className="button" onClick={() => { war_claim() }}>CLAIM SPOILS</button>)}
      {refreshButton && (<button className="button" onClick={() => { refresh() }}>PLAY AGAIN</button>)}
    </div>
    
    <div className="pile1">
      {/* <div style={{backgroundImage: `url(${face1[1]})`,backgroundSize: "cover",}}className="card T TC"></div> */}

      {p1_count > 51 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN26"></div>)}
      {p1_count > 50 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN25"></div>)}
      {p1_count > 49 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN24"></div>)}
      {p1_count > 48 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN23"></div>)}
      {p1_count > 47 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN22"></div>)}
      {p1_count > 46 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN21"></div>)}
      {p1_count > 45 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN20"></div>)}
      {p1_count > 44 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN19"></div>)}
      {p1_count > 43 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN18"></div>)}
      {p1_count > 42 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN17"></div>)}
      {p1_count > 41 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN16"></div>)}
      {p1_count > 40 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN15"></div>)}
      {p1_count > 39 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN14"></div>)}
      {p1_count > 38 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN13"></div>)}
      {p1_count > 37 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN12"></div>)}
      {p1_count > 36 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN11"></div>)}
      {p1_count > 35 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN10"></div>)}
      {p1_count > 34 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN9"></div>)}
      {p1_count > 33 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN8"></div>)}
      {p1_count > 32 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN7"></div>)}
      {p1_count > 31 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN6"></div>)}
      {p1_count > 30 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN5"></div>)}
      {p1_count > 29 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN4"></div>)}
      {p1_count > 28 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN3"></div>)}
      {p1_count > 27 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN2"></div>)}
      {p1_count > 26 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TN1"></div>)}
      
      {p1_count > 25 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T1"></div>)}
      {p1_count > 24 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T2"></div>)}
      {p1_count > 23 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T3"></div>)}
      {p1_count > 22 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T4"></div>)} 
      {p1_count > 21 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T5"></div>)}
      {p1_count > 20 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T6"></div>)}
      {p1_count > 19 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T7"></div>)}
      {p1_count > 18 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T8"></div>)}
      {p1_count > 17 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T9"></div>)} 
      {p1_count > 16 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T10"></div>)}
      {p1_count > 15 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T11"></div>)}
      {p1_count > 14 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T12"></div>)}
      {p1_count > 13 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T13"></div>)}
      {p1_count > 12 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T14"></div>)}
      {p1_count > 11 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T15"></div>)}
      {p1_count > 10 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T16"></div>)}
      {p1_count > 9 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T17"></div>)}
      {p1_count > 8 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T18"></div>)}
      {p1_count > 7 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T19"></div>)}
      {p1_count > 6 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T20"></div>)}
      {p1_count > 5 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T21"></div>)}
      {p1_count > 4 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T22"></div>)}
      {p1_count > 3 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T23"></div>)}
      {p1_count > 2 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T24"></div>)}
      {p1_count > 1 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card T25"></div>)}
      
      {/* temporary placeholder card for war */}
      {tcCard && (<div style={{ backgroundImage: `url(${tcface})`,backgroundSize: "cover"}} className= "card TC"></div>)}

      {/* card will disappear if last card is drawn */}
      {p1_count > 0 && (<div style={{ backgroundImage: `url(${background1})`,backgroundSize: "cover"}} className= "card"></div>)}

      <ReactCardFlip flipDirection="verticle" isFlipped={isFlipped}>
        {flipVisible && (<div style={{ backgroundImage: `url(${face1[1]})`,backgroundSize: "cover"}} className= "card TC"></div>)}
        {false && (<div style={{ backgroundImage: `url(${background1})`,backgroundSize: "cover"}} className= "card" ></div>)}
      </ReactCardFlip>

      {w1_count > 0 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TW1"></div>)}
      {w1_count > 1 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TW2"></div>)}
      {w1_count > 2 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TW3"></div>)}
      {w1_count > 3 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TW4"></div>)}
      {w1_count > 4 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TW5"></div>)}
      {w1_count > 5 && (<div style={{backgroundImage: `url(${background1})`,backgroundSize: "cover",}}className="card TW6"></div>)}
      
     
    </div>
    <div className="pile2">
      {/* <div style={{backgroundImage: `url(${face2[1]})`,backgroundSize: "cover",}}className="card T BC"></div> */}
      {p2_count > 51 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN26'></div>}
      {p2_count > 50 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN25'></div>}
      {p2_count > 49 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN24'></div>} 
      {p2_count > 48 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN23'></div>}
      {p2_count > 47 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN22'></div>}
      {p2_count > 46 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN21'></div>}
      {p2_count > 45 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN20'></div>}
      {p2_count > 44 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN19'></div>}
      {p2_count > 43 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN18'></div>}
      {p2_count > 42 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN17'></div>}
      {p2_count > 41 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN16'></div>}
      {p2_count > 40 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN15'></div>}
      {p2_count > 39 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN14'></div>}
      {p2_count > 38 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN13'></div>}
      {p2_count > 37 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN12'></div>}
      {p2_count > 36 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN11'></div>}
      {p2_count > 35 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN10'></div>}
      {p2_count > 34 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN9'></div>}
      {p2_count > 33 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN8'></div>}
      {p2_count > 32 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN7'></div>}
      {p2_count > 31 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN6'></div>}
      {p2_count > 30 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN5'></div>}
      {p2_count > 29 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN4'></div>}
      {p2_count > 28 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN3'></div>}
      {p2_count > 27 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN2'></div>}
      {p2_count > 26 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card BN1'></div>}

      {p2_count > 25 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B1'></div>}
      {p2_count > 24 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B2'></div>}
      {p2_count > 23 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B3'></div>}
      {p2_count > 22 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B4'></div>}
      {p2_count > 21 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B5'></div>}
      {p2_count > 20 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B6'></div>}
      {p2_count > 19 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B7'></div>}
      {p2_count > 18 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B8'></div>}
      {p2_count > 17 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B9'></div>}
      {p2_count > 16 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B10'></div>}
      {p2_count > 15 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B11'></div>}
      {p2_count > 14 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B12'></div>}
      {p2_count > 13 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B13'></div>}
      {p2_count > 12 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B14'></div>}
      {p2_count > 11 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B15'></div>}
      {p2_count > 10 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B16'></div>}
      {p2_count > 9 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B17'></div>}
      {p2_count > 8 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B18'></div>}
      {p2_count > 7 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B19'></div>}
      {p2_count > 6 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B20'></div>}
      {p2_count > 5 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B21'></div>}
      {p2_count > 4 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B22'></div>}
      {p2_count > 3 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B23'></div>}
      {p2_count > 2 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B24'></div>}
      {p2_count > 1 && <div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className='card B25'></div>}
      
      {/* temporary placeholder card for war */}
      {tcCard && (<div style={{ backgroundImage: `url(${bcface})`,backgroundSize: "cover"}} className= "card BC"></div>)}


      {p2_count > -1 && (
      <>
      {p2_count > 0 && (<div style={{ backgroundImage: `url(${background2})`,backgroundSize: "cover"}} className= "card B"></div>)}

      <ReactCardFlip flipDirection="verticle" isFlipped={isFlipped}>
        {flipVisible && (<div style={{ backgroundImage: `url(${face2[1]})`, backgroundSize: "cover" }} className="card BC"></div>)}
        {false && (<div style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover" }} className="card B"></div>)}
      </ReactCardFlip>

      {w2_count > 0 && (<div style={{backgroundImage: `url(${background2})`,backgroundSize: "cover",}}className="card BW1"></div>)}
      {w2_count > 1 && (<div style={{backgroundImage: `url(${background2})`,backgroundSize: "cover",}}className="card BW2"></div>)}
      {w2_count > 2 && (<div style={{backgroundImage: `url(${background2})`,backgroundSize: "cover",}}className="card BW3"></div>)}
      {w2_count > 3 && (<div style={{backgroundImage: `url(${background2})`,backgroundSize: "cover",}}className="card BW4"></div>)}
      {w2_count > 4 && (<div style={{backgroundImage: `url(${background2})`,backgroundSize: "cover",}}className="card BW5"></div>)}
      {w2_count > 5 && (<div style={{backgroundImage: `url(${background2})`,backgroundSize: "cover",}}className="card BW6"></div>)}
      
      </>
      )}
    </div>
    </>
  )
}

export default App
