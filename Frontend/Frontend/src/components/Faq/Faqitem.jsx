import React, {useState} from 'react'

const Faqitem = ({item}) => {
  const [open, setOpen] = useState(false)

  return (
    <li className={`faq-item ${open ? 'open' : ''}`}>
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-${item.question.replace(/\s+/g, '-')}`}
      >
        <span className="faq-question-text">{item.question}</span>
        <span className={`faq-icon ${open ? 'rotate' : ''}`} aria-hidden>
          ▾
        </span>
      </button>

      <div
        id={`faq-${item.question.replace(/\s+/g, '-')}`}
        className={`faq-answer ${open ? 'open' : ''}`}
      >
        <p>{item.content}</p>
      </div>
    </li>
  )
}

export default Faqitem