import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Muhibur Rahman",
    rating: 5,
    text:
      "I have taken medical services from them. They treat so well and they are providing the best medical services.",
    img: "/images/patient1.png",
  },
  {
    id: 2,
    name: "Muhibur Rahman",
    rating: 5,
    text:
      "I have taken medical services from them. They treat so well and they are providing the best medical services.",
    img: "/images/patient2.png",
  },
  {
    id: 3,
    name: "Muhibur Rahman",
    rating: 5,
    text:
      "I have taken medical services from them. They treat so well and they are providing the best medical services.",
    img: "/images/patient3.png",
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(1);

  return (
    <section className="py-20 bg-[#fdf7e7]">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-3">What our patient say</h2>
        <p className="text-gray-500 mb-12">
          World-class care for everyone. Our health system offers
          unmatched, expert health care.
        </p>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`w-[320px] p-6 rounded-xl shadow-md transition-all duration-300
                ${
                  active === item.id
                    ? "bg-blue-600 text-white scale-105"
                    : "bg-white text-gray-700"
                }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <div className="flex text-yellow-400">
                    {"★".repeat(item.rating)}
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed">"{item.text}"</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-3 h-3 rounded-full ${
                active === item.id ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
