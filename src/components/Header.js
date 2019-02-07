import React from 'react'
import { Icon } from 'semantic-ui-react'
import './Header.css';

export default function Header() {
  return (
    <div className="header">
        <h1>
            <a href="/"> 
              <Icon name='newspaper outline' />
              The newsfeed app
            </a>
        </h1>
    </div>
  )
}
