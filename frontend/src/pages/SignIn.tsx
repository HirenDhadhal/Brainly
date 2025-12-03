import { useState } from "react";
// Removed unused Button import
import { BACKEND_URL } from "../config";

export function SignIn() {
  const [isHovered, setIsHovered] = useState(false);

  const loginWithGoogle = () => {
    window.location.href = `${BACKEND_URL}/google`;
  };

  // Logic retained as requested, though no longer called by a button
  const onSwitchToSignup = () => {
    console.log("Switch to signup not implemented");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-gray-400
 flex items-center justify-center p-4 overflow-hidden relative"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse bottom-0 right-0 translate-x-1/2 translate-y-1/2 animation-delay-2000"></div>
      </div>

      <div className="relative w-full max-w-5xl bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-purple-500/20">
        <div className="flex flex-col md:flex-row min-h-[600px]">
          <div className="md:w-1/2 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 p-12 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              ></div>
            </div>

            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse bottom-0 right-0 translate-x-1/2 translate-y-1/2 animation-delay-2000"></div>

              <div className="absolute w-1 h-1 bg-white/40 rounded-full top-[10%] left-[20%] animate-twinkle"></div>
              <div className="absolute w-1.5 h-1.5 bg-white/30 rounded-full top-[15%] left-[75%] animate-twinkle animation-delay-500"></div>
              <div className="absolute w-1 h-1 bg-purple-300/40 rounded-full top-[25%] left-[45%] animate-twinkle animation-delay-1000"></div>
              <div className="absolute w-0.5 h-0.5 bg-white/50 rounded-full top-[35%] left-[85%] animate-twinkle animation-delay-1500"></div>
              <div className="absolute w-1 h-1 bg-indigo-300/40 rounded-full top-[45%] left-[15%] animate-twinkle animation-delay-2000"></div>
              <div className="absolute w-1.5 h-1.5 bg-white/30 rounded-full top-[55%] left-[60%] animate-twinkle animation-delay-750"></div>
              <div className="absolute w-0.5 h-0.5 bg-purple-300/40 rounded-full top-[65%] left-[30%] animate-twinkle animation-delay-1250"></div>
              <div className="absolute w-1 h-1 bg-white/40 rounded-full top-[75%] left-[80%] animate-twinkle animation-delay-1750"></div>
              <div className="absolute w-1 h-1 bg-indigo-300/40 rounded-full top-[85%] left-[25%] animate-twinkle animation-delay-2500"></div>
              <div className="absolute w-1.5 h-1.5 bg-white/30 rounded-full top-[20%] left-[90%] animate-twinkle animation-delay-3000"></div>

              <div className="absolute w-24 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent top-[30%] left-[-10%] animate-shooting-star"></div>
              <div className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-purple-300/60 to-transparent top-[60%] left-[-8%] animate-shooting-star animation-delay-4000"></div>
              <div className="absolute w-28 h-0.5 bg-gradient-to-r from-transparent via-indigo-300/60 to-transparent top-[80%] left-[-12%] animate-shooting-star animation-delay-6000"></div>
            </div>

            <div className="relative z-10 mb-8 group">
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="filter drop-shadow-2xl"
              >
                <g className="opacity-40">
                  <line
                    x1="50"
                    y1="80"
                    x2="100"
                    y2="100"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <line
                    x1="150"
                    y1="80"
                    x2="100"
                    y2="100"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    className="animate-pulse animation-delay-500"
                  />
                  <line
                    x1="50"
                    y1="120"
                    x2="100"
                    y2="100"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    className="animate-pulse animation-delay-1000"
                  />
                  <line
                    x1="150"
                    y1="120"
                    x2="100"
                    y2="100"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    className="animate-pulse animation-delay-1500"
                  />
                </g>

                <path
                  d="M100,40 C120,40 140,50 150,70 C155,80 155,90 150,100 C155,110 155,120 150,130 C140,150 120,160 100,160 C80,160 60,150 50,130 C45,120 45,110 50,100 C45,90 45,80 50,70 C60,50 80,40 100,40 Z"
                  fill="url(#brainGradient)"
                  className="transition-all duration-500 group-hover:scale-105"
                />

                <path
                  d="M100,60 Q110,80 100,100 Q90,120 100,140"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M80,70 Q90,85 85,100 Q80,115 85,130"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M120,70 Q110,85 115,100 Q120,115 115,130"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                  fill="none"
                />

                <circle
                  cx="50"
                  cy="80"
                  r="6"
                  fill="#a78bfa"
                  className="animate-pulse"
                />
                <circle
                  cx="150"
                  cy="80"
                  r="6"
                  fill="#a78bfa"
                  className="animate-pulse animation-delay-500"
                />
                <circle
                  cx="50"
                  cy="120"
                  r="6"
                  fill="#a78bfa"
                  className="animate-pulse animation-delay-1000"
                />
                <circle
                  cx="150"
                  cy="120"
                  r="6"
                  fill="#a78bfa"
                  className="animate-pulse animation-delay-1500"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="8"
                  fill="#c4b5fd"
                  className="animate-pulse animation-delay-750"
                />

                <defs>
                  <linearGradient
                    id="brainGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="absolute top-20 left-10 bg-purple-500/20 backdrop-blur-sm p-3 rounded-lg border border-purple-400/30 animate-float">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="text-purple-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div className="absolute bottom-32 right-10 bg-indigo-500/20 backdrop-blur-sm p-3 rounded-lg border border-indigo-400/30 animate-float animation-delay-1000">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                className="text-indigo-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>

            <div className="relative z-10 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Your Second Brain
              </h1>
              <p className="text-purple-200 text-lg">
                Store, organize, and access your important content in one place
              </p>

              <div className="flex flex-wrap gap-2 justify-center mt-8">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-purple-100 border border-white/20">
                  📺 YouTube Videos
                </span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-purple-100 border border-white/20">
                  🐦 Twitter Posts
                </span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-purple-100 border border-white/20">
                  🔗 Important Links
                </span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 p-12 flex flex-col justify-center bg-gray-900/60">
            <div className="max-w-md mx-auto w-full">
              {/* UPDATED SECTION START */}
              <div className="mb-8">
                <h2 className="text-white text-4xl font-light mb-4 tracking-tight">
                  Welcome
                </h2>
                <p className="text-gray-400 text-md leading-relaxed">
                  Join us or sign in securely with your Google account. <br />
                  No separate account creation is needed.
                </p>
              </div>
              {/* UPDATED SECTION END */}

              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900/60 text-gray-400">
                    Sign in with
                  </span>
                </div>
              </div>

              <button
                onClick={loginWithGoogle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group w-full py-4 px-6 bg-white hover:bg-gray-50 border-2 border-gray-700 hover:border-purple-500 rounded-xl text-gray-900 font-medium cursor-pointer transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 active:translate-y-0"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-300 group-hover:scale-110"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="transition-all duration-300 group-hover:tracking-wide">
                  Continue with Google
                </span>
              </button>

              {/* Security note */}
              <p className="text-center text-gray-500 text-xs mt-8 leading-relaxed">
                🔒 Your data is encrypted and secure. We'll never share your
                information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
       /* Keep your existing animations */
 @keyframes float {
   0%, 100% { transform: translateY(0px); }
   50% { transform: translateY(-20px); }
 }
  
 /* NEW: Add these animations */
 @keyframes twinkle {
   0%, 100% { opacity: 0.2; transform: scale(1); }
   50% { opacity: 1; transform: scale(1.5); }
 }
  
 @keyframes shootingStar {
   0% { transform: translateX(0) translateY(0); opacity: 0; }
   10% { opacity: 1; }
   90% { opacity: 1; }
   100% { transform: translateX(400px) translateY(200px); opacity: 0; }
 }
  
 .animate-float {
   animation: float 3s ease-in-out infinite;
 }
  
 /* NEW: Add these classes */
 .animate-twinkle {
   animation: twinkle 3s ease-in-out infinite;
 }
  
 .animate-shooting-star {
   animation: shootingStar 4s ease-in-out infinite;
 }
  
 .animation-delay-500 {
   animation-delay: 0.5s;
 }
  
 .animation-delay-750 {
   animation-delay: 0.75s;
 }
  
 .animation-delay-1000 {
   animation-delay: 1s;
 }
  
 .animation-delay-1250 {
   animation-delay: 1.25s;
 }
  
 .animation-delay-1500 {
   animation-delay: 1.5s;
 }
  
 .animation-delay-1750 {
   animation-delay: 1.75s;
 }
  
 .animation-delay-2000 {
   animation-delay: 2s;
 }
  
 .animation-delay-2500 {
   animation-delay: 2.5s;
 }
  
 .animation-delay-3000 {
   animation-delay: 3s;
 }
  
 .animation-delay-4000 {
   animation-delay: 4s;
 }
  
 .animation-delay-6000 {
   animation-delay: 6s;
 }
      `}</style>
    </div>
  );
}