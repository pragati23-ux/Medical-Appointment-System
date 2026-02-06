import { useState } from "react";

const Feedback = () => {
  const [rating, setRating] = useState(0);

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-[22px] font-semibold text-headingColor mb-6">
        Patient Feedback
      </h3>

      {/* Existing Reviews */}
      <div className="mb-8">
        <div className="flex justify-between gap-4 mb-6">
          <div>
            <h4 className="text-[16px] font-semibold text-headingColor">
              John Doe
            </h4>
            <p className="text-[14px] text-textColor">
              Excellent doctor, very professional and caring.
            </p>
          </div>
          <span className="text-yellowColor font-semibold">★★★★★</span>
        </div>

        <div className="flex justify-between gap-4">
          <div>
            <h4 className="text-[16px] font-semibold text-headingColor">
              Sarah Ahmed
            </h4>
            <p className="text-[14px] text-textColor">
              Explained everything clearly and treatment was effective.
            </p>
          </div>
          <span className="text-yellowColor font-semibold">★★★★☆</span>
        </div>
      </div>

      {/* Feedback Form */}
      <form>
        <h4 className="text-[18px] font-semibold text-headingColor mb-4">
          Leave Your Feedback
        </h4>

        {/* Rating */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${
                star <= rating ? "text-yellowColor" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment */}
        <textarea
          rows="4"
          placeholder="Write your feedback..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-irisBlueColor mb-4"
        ></textarea>

        <button
          type="submit"
          className="bg-primaryColor text-white py-2 px-6 rounded-lg hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </form>
    </section>
  );
};

export default Feedback;
