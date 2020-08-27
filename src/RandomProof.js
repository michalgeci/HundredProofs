import React, { useState } from 'react'
import proofs from './proofs.json'
import { WingBlank, WhiteSpace, Button } from 'antd-mobile'

function getRandomProof() {
  let randomNum = Math.floor(Math.random() * proofs.length)
  return [proofs[randomNum], randomNum + 1] //133
}

function styleProof(proof) {
  return (
    <div>
      <div className='bigProofTitle'>{proof[1]}. {proof[0].title}</div>

      {proof[0].steps.map((entry) =>
        <div key={Math.random()}>
          <WhiteSpace size="sm" />
          <div className="bigProofSteps"> {entry} </div>
        </div>
      )}

      { proof[0].bonus !== "" ? (
        <div>
          <WhiteSpace size="xl" />
          <a href={proof[0].bonus} target="_blank" rel="noopener noreferrer">See more</a>
        </div>
      ) : (
        <div></div>
      )}
       
    </div>
  )
}

function RandomProof() {

  const [proof, setProof] = useState(getRandomProof())

  return (
    <div>
      <WingBlank>
        <WhiteSpace size="lg" />
        {styleProof(proof)}
        <WhiteSpace size="lg" />
      </WingBlank>

      <div style={{height: '48px'}}/>
      <div style={{ position: 'absolute', width: '100%', bottom: 0 }}>
      <Button onClick={()=>{setProof(getRandomProof())}}><div className='handwritten'>GET RANDOM PROOF</div></Button>
      </div>
      

    </div>
  )

}

export default RandomProof