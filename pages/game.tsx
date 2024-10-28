import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Input, Label, Card, CardContent } from "@/components/ui"; // Adjust based on your UI library

export default function GamePage() {
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [roundWinners, setRoundWinners] = useState<string[]>([]);
  const [round, setRound] = useState(1);
  const prompt = localStorage.getItem("prompt") || "Win this round!";
  const totalRounds = 3;
  const router = useRouter();

  useEffect(() => {
    const savedPlayers = localStorage.getItem("players");
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
      setChoices(Array(players.length).fill(null));
    }
  }, []);

  const makeChoice = (choice: string) => {
    const updatedChoices = [...choices];
    updatedChoices[currentPlayer] = choice;
    setChoices(updatedChoices);

    if (currentPlayer < players.length - 1) {
      setCurrentPlayer(currentPlayer + 1);
    } else {
      determineRoundWinners(updatedChoices);
    }
  };

  const determineRoundWinners = (currentChoices: string[]) => {
    const uniqueChoices = new Set(currentChoices);
    let roundWinner: string[] = [];

    if (uniqueChoices.size === 1) {
      roundWinner = players; // All chose the same
    } else {
      // Determine winner based on rules
      if (currentChoices.includes("rock") && currentChoices.includes("scissors")) {
        roundWinner = currentChoices.filter((choice, index) => choice === "rock");
      } else if (currentChoices.includes("scissors") && currentChoices.includes("paper")) {
        roundWinner = currentChoices.filter((choice, index) => choice === "scissors");
      } else if (currentChoices.includes("paper") && currentChoices.includes("rock")) {
        roundWinner = currentChoices.filter((choice, index) => choice === "paper");
      }
    }

    setRoundWinners(roundWinner);
    setRound(round + 1);
    setCurrentPlayer(0);
    setChoices(Array(players.length).fill(null)); // Reset choices for the next round

    if (round >= totalRounds) {
      // Finish game logic (show final winner)
      router.push("/result");
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
                Round {round}
              </h1>
              <h2 className="text-lg font-semibold mb-4">{players[currentPlayer]}'s Turn:</h2>
              <div className="flex justify-around">
                {["rock", "paper", "scissors"].map((choice) => (
                  <Button key={choice} onClick={() => makeChoice(choice
