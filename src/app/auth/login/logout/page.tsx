'use client';
import { useAuthStore } from "@/src/store/useUserStore";


export default function Logout() {
  const { logout } = useAuthStore();

  // Call the logout function from the auth store
  

  // Redirect to the login page after logout

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-600 to-yellow-500">
    <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">🔓 Logout</h2>
      <button
        onClick={() => {
          logout();
          window.location.href = "/auth/login"; // Redirect to login page
        }}
        className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
    </div>
  )
  ; // This component does not render anything
}