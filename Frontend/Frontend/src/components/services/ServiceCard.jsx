
import {Link} from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

const ServiceCard = ({item,index}) => {
    const {name,desc,bgcolor,textcolor} = item
  return (
    <div className="py-[28px] px-4 lg:px-6 bg-white rounded-lg shadow-sm max-w-[340px] w-full mx-auto flex flex-col justify-between min-h-[300px]">
     <div>
       <h2 className="text-[20px] md:text-[22px] lg:text-[24px] leading-7 text-headingColor font-semibold text-center">{name}</h2>
         <p className="text-[15px] leading-6 font-400 text-textColor mt-4 text-center">{desc}</p>
      </div>
         <div className="flex items-center justify-between mt-6">
            <Link
      to="/doctors"
      aria-label={`Explore ${name}`}
    >
      <BsArrowRight
  className="w-10 h-10 p-2 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white transition-all duration-300"
/>
</Link>
<span className="inline-flex items-center justify-center text-[18px] font-semibold px-3 py-2"
    style={{
        background: `${bgcolor}`,
        color: `${textcolor}`,
        borderRadius: "6px",
    }}>
{index+1}
</span>
</div>
</div>
  )
};

export default ServiceCard