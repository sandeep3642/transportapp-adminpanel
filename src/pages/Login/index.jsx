import { useState } from "react";
import HeroImage from "../../assets/hero.png";
import LogoImage from "../../assets/Logo.png";

export default function HaulixLogin() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white flex max-w-6xl w-full h-[600px]  shadow-lg rounded-xl overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 flex flex-col justify-center px-16 py-8 relative">
          <div className="max-w-sm">
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-gray-900 mb-3">Login</h1>
              <p className="text-gray-600 text-base">
                Enter the email and OTP to sign in
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Mobile Number
                </label>
                <div className="flex gap-3">
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors whitespace-nowrap"
                  >
                    Get OTP
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  maxLength="6"
                />
                <div className="mt-2">
                  <span className="text-gray-600 text-sm">
                    Didn't get code?{" "}
                  </span>
                  <button
                    type="button"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Resend
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="button"
                className="w-full bg-[#E86A2B] text-white font-semibold py-4 rounded-lg hover:bg-orange-600 transition-colors text-lg mt-8"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Illustration */}
        <div className="w-1/2 bg-[#FEFFF7] relative overflow-hidden flex flex-col justify-center p-12">
          <div className="flex justify-start">
            <img src={LogoImage} alt="" className="w-20 h-20" />
          </div>

          <div>
            <div className="text-center">
              <h2 className="text-4xl font-medium text-orange-600 leading-tight">
                Effortless Oversight for
                <br />
                Smarter Journeys.
              </h2>
            </div>

            {/* Illustration Container */}
            <div className="relative   flex items-center justify-center">
              <div className="w-full h-full  rounded-2xl">
                <img src={HeroImage} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
