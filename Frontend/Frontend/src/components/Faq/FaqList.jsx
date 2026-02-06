import './Faq.css'
import {faqs} from './../../assets/data/faqs';
import Faqitem from './Faqitem';

const FaqList = () => {
  return (
     <ul className="faq-list mt-38px">
        {faqs.map((item,index) => <Faqitem item ={item} key={index}/>)}
     </ul>
  )
}

export default FaqList