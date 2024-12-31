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

  const [p1_count, SetCount1] = useState(26)
  const [p2_count, SetCount2] = useState(26)

  const [w1_count, SetWager1] = useState(0)
  const [w2_count, SetWager2] = useState(0)

  const [result, SetResult] = useState("")
  const [prize, SetPrize] = useState([])

  const [isFlipped, SetIsFlipped] = useState(true)
  const [available, SetAvailable] = useState(true)
  const [flipButton, SetFlipButton] = useState(true)
  const [claimButton, SetClaimButton] = useState(false)     //revealed after flip is clicked and cards are different
  const [warButton, SetWarButton] = useState(false)         //revealed after flip clicked and cards are same

  const [tcCard, SetTCCard] = useState(false)
  const [bcCard, SetBCCard] = useState(false)
  const [flipVisible, setFlipVisible] = useState(true)


  const [war_flipButton, SetWar_FlipButton] = useState(false) //revealed after war is clicked
  const [war_claimButton, SetWar_ClaimButton] = useState(false)
  
  //first two cards in the deck. ex: face1 = [2, C2]
  const [face1, SetFace1] = useState(first1)
  const [face2, SetFace2] = useState(first2)


  //flip the card (change the state of isFlipped)
  const flipCard = () => {
    SetIsFlipped(!isFlipped); 
  };

  
  //only take a card if the card is removed from the pile
  const flipAvailable = () => {
    SetAvailable(!available); 
  };

  //flip button lightswitch
  const showFlip = () => {
    SetFlipButton(!flipButton)
  }

  //claim button lightswitch
  const showClaim = () => {
    SetClaimButton(!claimButton)
  }

  //war button lightswitch
  const showWar = () => {
    SetWarButton(!warButton)
  }

  const showWar_Flip = () => {
    SetWar_FlipButton(!war_flipButton)
  }
  const showWar_Claim = () => {
    SetWar_ClaimButton(!war_claimButton)
  }


  const showTC = () => {
    SetTCCard(!tcCard)
  }
  const showBC = () => {
    SetBCCard(!bcCard)
  }

  const showFlipVisible = () => {
    setFlipVisible(!flipVisible)
  }


  function decrement1(){
    if(p1_count == 0){return}
    SetCount1(p1_count-1)
  }

  function decrement2(){
    if(p2_count == 0){return}
    SetCount2(p2_count-1)
  }

  function compare(face1,face2){
    if(face1[0] > face2[0]){
      SetResult("Card 1 wins")
      return 0
      
    }
    else if(face1[0] < face2[0]){
      SetResult("Card 2 wins")
      return 0
    }
    else{
      SetResult("WAR!")
      SetWarButton(!warButton)
      return 1
    }

  }

  function war(){
    for(let i = 0; i < 3; i++){
      if(p1_count > 1 && p2_count > 1){
        //functional form of useState
        SetWager1(((prevW1) => prevW1 + 1))
        SetCount1((prevp1)=> prevp1-1)
        SetWager2(((prevW2) => prevW2 + 1))
        SetCount2(((prevp2) => prevp2 -1))
  
      }
      else{
        break
      }
    }

    showTC()          //reveal the placeholder card
    showBC()          //reveal the placeholder card
    showWar()         //hide the war button
    showFlipVisible() //hide the flip cards and thus the flip action
    flipCard()        //flip the cards
    showWar_Flip()    //reveal the war flip button
    


  }

  function claim(temp1,temp2){

    if(p1_count ==0){
      SetResult("Player 2 Wins!")

    }
    else if(p2_count==0){
      SetResult("Player 1 Wins!")
    }
    else{
      SetResult("")
    }
   
    SetFace1(deck1.dequeue())
    SetFace2(deck2.dequeue())
    
    if(temp1[0] > temp2[0]){
      deck1.enqueue(temp1)
      deck1.enqueue(temp2)
      SetCount1(p1_count+2)
    }
    else if(temp1[0] < temp2[0]){
      deck2.enqueue(temp1)
      deck2.enqueue(temp2)
      SetCount2(p2_count+2)
    }

  }

  function war_flip(){
    showWar_Flip()      //hide war_flip button
    showFlipVisible()   //turn on flip action visibility
    flipCard()          //flip the card
    decrement1()        //decrease total p1 count
    decrement2()        //decrease total p2 count

    SetFace1(deck1.dequeue())
    SetFace2(deck2.dequeue())

  }

  const war_claim = () => {
    
  }


  return (
    <>
    <div className ="score">
      <div>
        <button className = "deal">{p1_count}</button>
        <button className = "FC">{p2_count}</button>
        <button>{result}</button>
        
      </div>
      <div>
        {/* <button className = "deal" onClick={increment1}>deal</button> */}
        {flipButton &&(<button  onClick={() => { flipCard(), decrement1(), decrement2(), showFlip(), (compare(face1,face2)==0 ? showClaim(): showWar())}}>flip</button>)}
        {claimButton &&(<button c onClick={() => { flipCard(), claim(face1,face2), showFlip(), showClaim()}}>claim</button>)}
        {warButton &&(<button onClick={() => {war()}}>war</button>)}
        {war_flipButton &&(<button onClick={() => {war_flip(), (compare(face1,face2)==0 ? showWar_Claim(): showWar())}}>battle card</button>)}
        {war_claimButton &&(<button onClick={() => {war_claim()}}>claim war prize</button>)}
        <div>{w1_count}</div>
      </div>
      
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
      {tcCard && (<div style={{ backgroundImage: `url(${face1[1]})`,backgroundSize: "cover"}} className= "card TC"></div>)}

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
      {tcCard && (<div style={{ backgroundImage: `url(${face2[1]})`,backgroundSize: "cover"}} className= "card BC"></div>)}


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
