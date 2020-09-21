import React from 'react'
import style from './style.module.scss'

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.footerInner}>
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
          className={style.logo}
        >
          Gobench
          <span />
        </a>
        <br />
        <p className="mb-0">
        A distributed benchmark tool with Golang | <img src='/resources/images/GitHub-Mark-32px.png'/>
          <a href="https://www.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
        </p>
      </div>
    </div>
  )
}

export default Footer
