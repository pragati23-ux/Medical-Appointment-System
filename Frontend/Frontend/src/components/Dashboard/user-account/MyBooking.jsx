import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const MyBooking = () => {
  const { user, token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/users/appointments/my",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setBookings(data.data || []);
        } else {
          toast.error("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBookings();
    }
  }, [token]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/bookings/${bookingId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setBookings(bookings.filter((booking) => booking._id !== bookingId));
          toast.success("Booking cancelled successfully");
        } else {
          toast.error("Failed to cancel booking");
        }
      } catch (error) {
        console.error("Error cancelling booking:", error);
        toast.error("Error cancelling booking");
      }
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading your bookings...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">My Bookings</h2>

        {bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600 text-lg">No bookings found</p>
            <p className="text-gray-500 mt-2">You haven't booked any appointments yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Doctor Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Doctor</h3>
                    <p className="text-gray-700">{booking.doctorId?.name}</p>
                    <p className="text-gray-600 text-sm">{booking.doctorId?.specialization}</p>
                    <p className="text-gray-600 text-sm">{booking.doctorId?.email}</p>
                  </div>

                  {/* Booking Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                    <p className="text-gray-700">
                      <span className="font-medium">Date:</span> {new Date(booking.appointmentDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Time:</span> {booking.appointmentTime}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Status:</span>{" "}
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        booking.status === "approved" ? "bg-green-100 text-green-800" :
                        booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {booking.status}
                      </span>
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex items-end">
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
