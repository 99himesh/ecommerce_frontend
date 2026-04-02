import { useNavigate } from "react-router-dom";

const PaymentFailedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 rounded-full p-5 text-3xl animate-pulse">
            ❌
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed
        </h1>

        {/* Message */}
        <p className="text-gray-500 mb-6">
          Your transaction could not be completed. Please try again or use a different payment method.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          
          <button
            onClick={() => navigate("/checkout")}
            className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition transform hover:scale-105 active:scale-95"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-lg font-medium transition transform hover:scale-105 active:scale-95"
          >
            Go to Home
          </button>

        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;