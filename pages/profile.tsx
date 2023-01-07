import { Auth } from 'aws-amplify'
import type { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import Container from 'components/Container/Container'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

const ProfilePage = () => {
  const [userData, setUserData] = useState<CognitoUserAttribute[] | null>(null)

  useEffect(()=>{
    
    Auth.currentAuthenticatedUser().then(user => {
      Auth.userAttributes(user).then(user => {
        setUserData(user)
      }).catch(err =>{
        console.log(err);
      })
    }).catch(err =>{
      console.log(err);
    })
  }, [])

  if(!userData){
    return <Container>
      <h1>Loading ...</h1>
    </Container>
  }

  return (
    <Container>
        <ul className='profilePage__list'>
          {userData.map(attr => {
            if(attr.Name === "sub" || attr.Name ==='custom:airtable') {
              return null
            }

            const value = ['true', 'false'].includes(attr.Value) ? <div className={classNames('profilePage__dot', {
              'profilePage__dot--true': Boolean(attr.Value)
            })}></div> :<strong>{attr.Value}</strong>

            return (
              <li key={attr.Name} className='profilePage__listItem'>
                <span>{attr.Name.replace("_", " ")}: </span>{value}
              </li>
            )
          })}
        </ul>
    </Container>
  )
}

export default ProfilePage