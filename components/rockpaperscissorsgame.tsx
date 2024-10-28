'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Swords, Trophy } from 'lucide-react';

type Player = {
  id: number;
  name: string;
  choice: string | null;
  score: number;
};

type GameState = 'setup' | 'prompt' | 'playing' | 'roundEnd' | 'matchupEnd' | 'gameEnd';

export default function RockPaperScissorsGame() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [prompt, setPrompt] = useState('');
  const [gameState, setGameState] = useState<GameState>('setup');
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [roundWinners, setRoundWinners] = useState<Player[]>([]);
  const [winner, setWinner] = useState<Player | null>(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [matchups, setMatchups] = useState<Player[][]>([]);

  const addPlayer = (name: string) => {
    if (players.length < 5) {
      setPlayers([...players, { id: players.length, name, choice: null, score: 0 }]);
    }
  };

  const startGame = () => {
    if (players.length >= 2) {
      setGameState('prompt');
    }
  };

  const submitPrompt = () => {
    if (prompt.trim() !== '') {
      setMatchups(createMatchups(players));
      setGameState('playing');
    }
  };

  const createMatchups = (players: Player[]): Player[][] => {
    const shuffled = [...players].sort(() => 0.5 - Math.random());
    const matchups: Player[][] = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      if (i + 1 < shuffled.length) {
        matchups.push([shuffled[i], shuffled[i + 1]]);
      } else {
        matchups.push([shuffled[i]]);
      }
    }
    return matchups;
  };

  const makeChoice = (choice: string) => {
    if (matchups.length === 0 || matchups[0].length === 0) return;

    const updatedPlayers = [...players];
    const currentMatchup = matchups[0];
    const playerIndex = updatedPlayers.findIndex((p) => p.id === currentMatchup[currentPlayer].id);
    if (playerIndex !== -1) {
      updatedPlayers[playerIndex].choice = choice;
    }
    setPlayers(updatedPlayers);

    if (currentPlayer === currentMatchup.length - 1) {
      determineRoundWinners();
    } else {
      setCurrentPlayer(currentPlayer + 1);
    }
  };

  const determineRoundWinners = () => {
    if (matchups.length === 0) return;

    const currentMatchup = matchups[0];
    const choices = currentMatchup.map((p) => p.choice);
    const uniqueChoices = new Set(choices);

    let roundWinners: Player[] = [];

    if (uniqueChoices.size === 1 || uniqueChoices.size === 3 || currentMatchup.length === 1) {
      roundWinners = currentMatchup;
    } else {
      const winningChoice = uniqueChoices.size === 2
        ? choices.includes('rock') && choices.includes('scissors')
          ? 'rock'
          : choices.includes('scissors') && choices.includes('paper')
          ? 'scissors'
          : 'paper'
        : null;
      roundWinners = currentMatchup.filter((p) => p.choice === winningChoice);
    }

    const updatedPlayers = players.map((player) => {
      if (roundWinners.some((winner) => winner.id === player.id)) {
        return { ...player, score: player.score + 1 };
      }
      return player;
    });

    setPlayers(updatedPlayers);
    setRoundWinners(roundWinners);
    setGameState('roundEnd');
  };

  const resetGame = () => {
    setPlayers([]);
    setPrompt('');
    setGameState('setup');
    setCurrentPlayer(0);
    setRoundWinners([]);
    setWinner(null);
    setCurrentRound(1);
    setMatchups([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">Rock Paper Scissors Game</h1>
        <Card>
          <CardContent className="pt-6">
            {gameState === 'setup' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Enter player name"
                    onKeyPress={(e) => e.key === 'Enter' && addPlayer(e.currentTarget.value)}
                  />
                  <Button onClick={() => addPlayer((document.querySelector('input') as HTMLInputElement).value)}>
                    Add Player
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Current Players:</Label>
                  <ul className="list-disc list-inside">
                    {players.map((player) => (
                      <li key={player.id}>{player.name}</li>
                    ))}
                  </ul>
                </div>
                <Button onClick={startGame} disabled={players.length < 2}>
                  Start Game
                </Button>
              </div>
            )}

            {gameState === 'prompt' && (
              <div className="space-y-4">
                <Label htmlFor="prompt">Enter a prompt for the winner:</Label>
                <Input
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'The winner gets to choose the movie tonight'"
                />
                <Button onClick={submitPrompt}>Submit Prompt</Button>
              </div>
            )}
            {/* More game states: playing, roundEnd, matchupEnd, gameEnd... */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}