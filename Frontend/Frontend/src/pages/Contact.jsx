 const Contact = () => {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-xl shadow">
        
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-3">
          Contact Us
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Got a technical issue? Want to send feedback about a beta feature?
          Let us know.
        </p>

        {/* Form */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="Let us know how we can help you"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Message
            </label>
            <textarea
              rows="6"
              placeholder="Leave a comment..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-10 py-3 rounded-lg
              font-medium hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
