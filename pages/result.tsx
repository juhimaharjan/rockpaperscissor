import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ResultPage() {
  const [players, setPlayers] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedPlayers = localStorage.getItem("players");
    if (savedPlayers) {
      const playerData = JSON.parse(savedPlayers);
      const scores = playerData.reduce((acc: any, player: string) => {
        acc[player] = acc[player] ? acc[player] + 1 : 1; // Dummy scoring logic
        return acc;
      }, {});
      const finalWinner = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
      );
      setPlayers(playerData);
      setWinner(finalWinner);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">Game Over!</h1>
        <h2 className="text-lg font-semibold text-center mb-4">Winner: {winner}</h2>
        <h3 className="text-md text-center">Thanks for playing!</h3>
      </div>
    </div>
  );
}
