import React from 'react';
import 'pages/intro/Intro.scss'
import Story from 'assets/images/icons/story.png';
import {routes} from 'constants/routes';

/**
 * This is where we tell our story. This will demonstrate how a user will go 
 * through the process of receiving, controlling and providing a verifiable credential.
 * */
const IntroPage = () => {
  return (
    <div className='intro page-form page-form--large'>
      <div className='intro__heading-block'>
        <h1 className='intro__heading'>
          The Degree Dilemma
        </h1>
        <h5 className='intro__subheading'>Bayside University</h5>
      </div>
      <div className='intro__text-block'>
        <h4>Issuer - Holder - Verifier Flow</h4>
        <img className='story-size' src={Story} alt='Story'/>
      </div>
      <div className='intro__text-block'>
        <h4>How many requests?</h4>
        <p>After graduating college, employers will want to see proof of our degree and what we majored in.</p>
        <p>The employer can take on this endeavor by using a third party to do an educational background check, contact the university, or ask us to provide the degree itself to be copied and held for the employer's records. </p> 
        <p>The question becomes, How many employers are we providing this information for? If there is a data breach for any one of these employers how do we know the information provided is protected? If all the employer needs is proof of a degree, shouldn't we have control of that being the only information provided?</p>
      </div>
      <div className='intro__text-block'>
        <h4>SURI's Mission</h4>
        <p>We believe the answer to these questions should be in control of the user. By using SURI we provide the user the ability to receive a verifiable credential from our University, hold that credential in our Digital Wallet and provide that credential for the requesting employer.</p>
        <p>Once the user has been issued the credential, we can go the rest of our lives never having to make another credential request again.</p>
        <p>This will prevent sensitive information being stored and provided to employers who may compromise your identity.</p>
        <p>SURI provides exaclty what the employer wants to know, has the ability to revoke the information the employer recevies and never has to worry about requesting the credential more than once.</p>
      </div>
    </div>
  )
}

export default IntroPage
