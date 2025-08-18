"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Api } from "@/src/lib/api";
import { useAuthStore } from "@/src/store/useUserStore";

export default function Register() {
  const { user } = useAuthStore();
  const router = useRouter();

  const [regName, setRegName] = useState("");
  const [regAvatar, setRegAvatar] = useState("");
  const [regBirthdate, setRegBirthdate] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regArticlesId, setRegArticlesId] = useState("");
  const [regMessage, setRegMessage] = useState("");

  useEffect(() => {
    if (user) {
      router.replace("/"); // redirect automatico se già loggato
    }
  }, [user, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegMessage("");

    try {
      const newUser = {
        id: crypto.randomUUID(),
        name: regName,
        avatar: regAvatar,
        birthdate: regBirthdate,
        password: regPassword,
        articlesIds: regArticlesId,
        createdAt: new Date().toISOString(),
      };

      const created = await Api.createUser(newUser);
      setRegMessage(`✅ Utente creato con ID: ${created.id}`);

      setRegName("");
      setRegAvatar("");
      setRegBirthdate("");
      setRegPassword("");
      setRegArticlesId("");
    } catch (error) {
      setRegMessage("⚠️ Errore durante la creazione");
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white-600 via-[#C19A6B] to-[#d6bfa9]">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">📝 Registrazione</h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Nome"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2B280]"
          />
          <input
            type="url"
            placeholder="Avatar URL"
            value={regAvatar}
            onChange={(e) => setRegAvatar(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2B280]"
          />
          <input
            type="password"
            placeholder="Password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2B280]"
          />
          <input
            type="date"
            value={regBirthdate}
            onChange={(e) => setRegBirthdate(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2B280]"
          />
          <input
            type="text"
            placeholder="Articles ID"
            value="0"
            onChange={(e) => setRegArticlesId(e.target.value)}
            required
            className="hidden w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2B280]"
          />
          <button
            type="submit"
            onClick={() => {window.location.href = "/auth/login";}}
            className="w-full bg-[#967969] text-white py-3 rounded-md hover:bg-stone-500 transition"
          >
            Crea Utente
          </button>
        </form>

        {regMessage && (
          <p className="mt-4 text-center text-sm text-gray-700">{regMessage}</p>
        )}

        <p className="mt-6 text-center text-gray-600">
          Hai già un account?{" "}
          <a href="/auth/login" className="text-[#A52A2A] font-semibold hover:underline">
            Accedi
          </a>
        </p>
      </div>
    </div>
  );
}