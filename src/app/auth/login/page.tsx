"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Api } from "@/src/lib/api";
import { useAuthStore } from "@/src/store/useUserStore";

export default function Login() {
  const { user, login } = useAuthStore();
  const router = useRouter();

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    if (user) {
      router.replace("/"); // redirect automatico se già loggato
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginMessage("");

    try {
      const users = await Api.getUsers();
      const found = users.find(
        (u: any) => u.name === loginName && u.password === loginPassword
      );

      if (found) {
        login(found);
        setLoginMessage(`✅ Benvenuto ${found.name}`);
        router.replace("/"); // redirect dopo login
      } else {
        setLoginMessage("❌ Nome o password errati");
      }
    } catch {
      setLoginMessage("⚠️ Errore di connessione");
    }
  };

  if (user) {
    // mentre il redirect è in corso, evita il flash del form
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">🔐 Login</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Nome"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition"
          >
            Accedi
          </button>
        </form>

        {loginMessage && (
          <p className="mt-4 text-center text-sm text-gray-700">{loginMessage}</p>
        )}

        <p className="mt-6 text-center text-gray-600">
          Non hai un account?{" "}
          <a href="/register" className="text-purple-600 font-semibold hover:underline">
            Registrati
          </a>
        </p>
      </div>
    </div>
  );
}
