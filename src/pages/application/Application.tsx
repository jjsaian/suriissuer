import React, { useState, useContext } from 'react';
import AppContext from 'context/app';
import {Button, FormControl, FormGroup, FormLabel, FormFile} from 'react-bootstrap';
import ApiService from 'utils/apiService';
import 'pages/application/Application.scss'
import firebase from 'utils/firebase/firebase';
import randomstring from 'randomstring';

interface IBaseVCData {
    givenName: string; //company name
    familyName: string; //unused, since we are treat each indiv credential as an organisation credential
    issueDate: string;
  }
  
  interface IExtendVCData {
    companyID: string;
    countryCode: string;
    email: string;
    issuerOrganization: string;
  }
  
  const defaultBaseVCData: IBaseVCData = {
    givenName: '',
    familyName: '',
    issueDate: ''
  }
  
  const defaultExtendVCData: IExtendVCData = {
    companyID: '',
    countryCode: '',
    email: '',
    issuerOrganization: 'Bayside University'
  }

interface IPayload extends IBaseVCData{
  idClass: string; //stringifiedCredentials, workaround
  holderDid: string
}

const Application: React.FC = (): React.ReactElement => {
    const {appState} = useContext(AppContext);
    const [inputDID, setinputDID] = useState(appState.didToken || '')

    //var baseVCData is instantiated as defaultBaseVCData,  has setter setBaseVCData and implements IBaseVCData interface
    const [baseVCData, setBaseVCData] = useState<IBaseVCData>(defaultBaseVCData) 

    const [extendVCData, setExtendVCData] = useState<IExtendVCData>(defaultExtendVCData)

    /**
     * Function for issuing an unsigned employment VC.
     * */
    const issueDrugLicensePersonVC = async () => {
        try {
          const {  givenName, familyName, issueDate } = baseVCData;

          // Generate a random Affinidi pharmaceutical ID from a list provided from pharmacy manufacturer, which will double up as an application ID
          const applicationID: string = randomstring.generate(10);
          const vcToStringify = {...extendVCData, affinidicompanyID: applicationID}
          
          const payload: IPayload = {
            givenName,
            familyName,
            issueDate,
            idClass: JSON.stringify(vcToStringify),
            holderDid: inputDID || appState.didToken || '',
          }

          // Store unsignedVC into issuer's database. 
          const db = firebase.firestore();
          db.collection('drug-license-waiting-approval').add({username: appState.username, payload, applicationID, approved: false})
          console.log(payload);
          alert('You have successfully submitted your application. You will receive an email to your Verifiable Credential once approved by the Issuer');
        } catch (error) {
            ApiService.alertWithBrowserConsole(error.message);
        }
    }
    
    const resetToDefaults = () => {
      setinputDID(appState.didToken || '')

      setBaseVCData(defaultBaseVCData)
      setExtendVCData(defaultExtendVCData)
    }
    
    const updateBaseVC = (e: any) => {
      setBaseVCData({...baseVCData, [e.target.name]: e.target.value})
    }

    const updateExtendBaseVC = (e: any) => {
      setExtendVCData({...extendVCData, [e.target.name]: e.target.value})
    }
    return (
      <div className='tutorial'>
        <div className='tutorial__step'>
          <Button 
            style={{float: 'right'}}
            onClick={e => resetToDefaults()}
            >Clear all fields
          </Button>

          <p><strong>Complete the form to receive a VC for your degree.</strong></p>
          <FormGroup controlId='email'>
            <FormLabel className='label' style={{margin: '10px 0 0 0'}}>School Email Address:</FormLabel>
            <FormControl name='email' type='text' value={extendVCData.email} onChange={e => updateExtendBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='givenName'>
            <FormLabel className='label' style={{margin: '10px 0 0 0'}}>Full Name:</FormLabel>
            <FormControl name='givenName' type='text' value={baseVCData.givenName} onChange={e => updateBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='issueDate'>
            <FormLabel style={{margin: '10px 0 0 0'}}>Date of Graduation:</FormLabel>
            <FormControl name='issueDate' type='text' value={baseVCData.issueDate} onChange={e => updateBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='drugLicense'>
            <FormLabel style={{margin: '10px 0 0 0'}}>CWID:</FormLabel>
            <FormControl name='companyID' type='text' value={extendVCData.companyID} onChange={e => updateExtendBaseVC(e)}/>
          </FormGroup>
          
          <Button 
            onClick={e => issueDrugLicensePersonVC()}
            >Submit
          </Button>
        </div>
      </div>
    )
}

export default Application;