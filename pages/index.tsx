import { useState } from "react";
import { useRouter } from "next/router";

export default function PromptPage() {
  const [players, setPlayers] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();

  const addPlayer = () => {
    if (playerName.trim() && players.length < 5) {
      setPlayers([...players, playerName]);
      setPlayerName("");
    }
  };

  const startGame = () => {
    if (players.length >= 2) {
      // Save players in localStorage or context and navigate to the next page
      router.push("/prompt");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* iMac frame */}
        <div className="bg-[#f2f2f2] rounded-2xl p-4 shadow-xl">
          {/* Camera */}
          <div className="w-2 h-2 bg-black rounded-full mx-auto mb-2"></div>
          {/* Screen bezel */}
          <div className="bg-white rounded-xl p-2 border border-[#e0e0e0]">
            {/* Screen content */}
            <div className="bg-white rounded-lg p-4 h-[60vh] overflow-y-auto">
              {/* Rock Paper Scissors Game Header */}
              <h1 className="text-3xl font-bold text-center mb-6">
                Rock Paper Scissors Game
              </h1>
              {/* Player input section */}
              <div className="space-y-4">
                <input
                  className="w-full p-2 border rounded-lg"
                  type="text"
                  value={playerName}
                  placeholder="Enter player name"
                  onChange={(e) => setPlayerName(e.target.value)}
                />
                <button
                  className="bg-black text-white px-4 py-2 rounded-lg"
                  onClick={addPlayer}
                >
                  Add Player
                </button>
              </div>
              {/* Current Players List */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Current Players:</h2>
                <ul className="list-disc list-inside">
                  {players.map((player, index) => (
                    <li key={index}>{player}</li>
                  ))}
                </ul>
              </div>
              {/* Start Game Button */}
              <button
                className="bg-gray-500 text-white mt-4 px-4 py-2 rounded-lg"
                onClick={startGame}
                disabled={players.length < 2}
              >
                Start Game
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
