import { useState } from "react";
import { useRouter } from "next/router";

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const submitPrompt = () => {
    if (prompt.trim()) {
      localStorage.setItem("prompt", prompt); // Save prompt
      router.push("/game"); // Navigate to the game page
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* iMac frame */}
        <div className="bg-[#f2f2f2] rounded-2xl p-4 shadow-xl">
          <div className="bg-white rounded-xl p-2 border border-[#e0e0e0]">
            <div className="bg-white rounded-lg p-4 h-[60vh] overflow-y-auto">
              <h1 className="text-3xl font-bold text-center mb-6">
                Rock Paper Scissors Game
              </h1>
              <label className="block mb-2" htmlFor="prompt">
                Enter a prompt for the winner:
              </label>
              <input
                className="w-full p-2 border rounded-lg mb-4"
                type="text"
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'The winner gets to choose the movie tonight'"
              />
              <button
                className="bg-black text-white px-4 py-2 rounded-lg"
                onClick={submitPrompt}
              >
                Submit Prompt
              </button>
            </div>
          </div>
        </div>
        {/* iMac stand */}
        <div className="bg-[#e0e0e0] h-16 w-24 mx-auto rounded-b-lg"></div>
        <div className="bg-[#d0d0d0] h-2 w-48 mx-auto rounded-b-lg"></div>
      </div>
    </div>
  );
}
