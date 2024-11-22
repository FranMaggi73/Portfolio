<script lang="ts">
  import { onMount } from 'svelte';
  import { pageTitle } from '../../store/titleStore';
  pageTitle.set('Tournament');

  type Player = {
    id: number;
    name: string;
    points: number;
    opponents: number[];
    opponentDifficulty: number;
    victories: number;
    draws: number;
    tieBreaker?: boolean;
  };

  type Match = {
    player1: Player;
    player2: Player | null;
    result: 'win' | 'loss' | 'draw' | '';
  };

  const maxRounds = 5;
  let roundNumber = 1;
  let byesCount = 0;
  let players: Player[] = [];
  let playerName = '';
  let tournamentStarted = false;
  let currentMatches: Match[] = [];
  let isModalOpen = false;

  onMount(() => {
    const storedPlayers = localStorage.getItem('players');
    const storedRoundNumber = localStorage.getItem('roundNumber');
    const storedByesCount = localStorage.getItem('byesCount');
    const storedTournamentStarted = localStorage.getItem('tournamentStarted');
    const storedCurrentMatches = localStorage.getItem('currentMatches');

    if (storedPlayers) {
      players = JSON.parse(storedPlayers);
    }
    if (storedRoundNumber) {
      roundNumber = parseInt(storedRoundNumber, 10);
    }
    if (storedByesCount) {
      byesCount = parseInt(storedByesCount, 10);
    }
    if (storedTournamentStarted) {
      tournamentStarted = storedTournamentStarted === 'true';
    }
    if (storedCurrentMatches) {
      currentMatches = JSON.parse(storedCurrentMatches);
    }
  });

  function saveStateToLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('players', JSON.stringify(players));
      localStorage.setItem('roundNumber', roundNumber.toString());
      localStorage.setItem('byesCount', byesCount.toString());
      localStorage.setItem('tournamentStarted', tournamentStarted.toString());
      localStorage.setItem('currentMatches', JSON.stringify(currentMatches));
    }
  }

  function OpenModal() {
    isModalOpen = true;
  }

  function CloseModal() {
    isModalOpen = false;
  }

  function addPlayer() {
    if (!playerName.trim()) {
      alert('Player name cannot be empty.');
      return;
    }

    const existingPlayer = players.find(
      (player) => player.name.toLowerCase() === playerName.trim().toLowerCase()
    );

    if (existingPlayer) {
      alert('Player name already exists. Please choose a different name.');
      playerName = '';
      return;
    }

    const newPlayer: Player = {
      id: players.length + 1,
      name: playerName.trim(),
      points: 0,
      opponents: [],
      opponentDifficulty: 0,
      victories: 0,
      draws: 0
    };

    players = [...players, newPlayer];
    playerName = '';
    saveStateToLocalStorage();
  }

  function deletePlayer(playerId: number) {
    if (confirm('Are you sure you want to delete this player?')) {
      players = players.filter((player) => player.id !== playerId);
      saveStateToLocalStorage();
    }
  }

  function pairPlayers(players: Player[]): Match[] {
    players.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.victories !== a.victories) return b.victories - a.victories;
      if (b.draws !== a.draws) return b.draws - a.draws;
      return b.opponentDifficulty - a.opponentDifficulty;
    });

    const pairs: Match[] = [];
    const availablePlayers = [...players];

    while (availablePlayers.length > 1) {
      let player1 = availablePlayers.shift()!;
      let player2: Player | undefined;

      for (let i = 0; i < availablePlayers.length; i++) {
        const potentialOpponent = availablePlayers[i];
        if (!player1.opponents.includes(potentialOpponent.id)) {
          player2 = potentialOpponent;
          availablePlayers.splice(i, 1);
          break;
        }
      }

      if (player2) {
        pairs.push({
          player1: player1,
          player2: player2,
          result: ''
        });

        player1.opponents.push(player2.id);
        player2.opponents.push(player1.id);
      } else {
        pairs.push({ player1: player1, player2: null, result: '' });
      }
    }

    if (availablePlayers.length === 1) {
      const lastPlayer = availablePlayers.pop()!;
      pairs.push({ player1: lastPlayer, player2: null, result: '' });
    }

    return pairs;
  }

  function pairPlayersRandomly(players: Player[]): Match[] {
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    return pairPlayers(shuffledPlayers);
  }

  function startNextRound() {
    if (roundNumber >= maxRounds) {
      byesCount = 2;
    }
    players.forEach((player) => {
      player.tieBreaker = false;
    });

    if (roundNumber === 1) {
      currentMatches = pairPlayersRandomly([...players]);
    } else {
      currentMatches = pairPlayers([...players]);
    }

    currentMatches.forEach((match) => {
      if (match.player1 && match.player2) {
        match.player1.opponentDifficulty = calculateOpponentDifficulty(match.player1);
        match.player2.opponentDifficulty = calculateOpponentDifficulty(match.player2);
      }
    });

    saveStateToLocalStorage();
  }

  function startTournament() {
    if (players.length < 2) {
      alert('You need at least 2 players to start the tournament.');
      return;
    }
    tournamentStarted = true;
    startNextRound();
  }

  function submitResults() {
    const allResultsSet = currentMatches.every(
      (match) => match.result !== '' || match.player2 === null
    );

    if (!allResultsSet) {
      alert('Please select a result for each match before submitting.');
      return;
    }

    currentMatches.forEach((match) => {
      if (match.player2 === null) {
        match.player1.points += 2;
        match.player1.victories += 1;
        match.player1.opponents.push(-1);
      } else {
        if (match.result === 'win') {
          match.player1.points += 2;
          match.player1.victories += 1;
        } else if (match.result === 'loss') {
          match.player2.points += 2;
          match.player2.victories += 1;
        } else if (match.result === 'draw') {
          match.player1.points += 1;
          match.player2.points += 1;
          match.player1.draws += 1;
          match.player2.draws += 1;
        }

        match.player1.opponents.push(match.player2.id);
        match.player2.opponents.push(match.player1.id);
      }
    });
    roundNumber++;

    players.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.victories !== a.victories) return b.victories - a.victories;
      return b.draws - a.draws;
    });

    players = breakTies(players);
    saveStateToLocalStorage();

    startNextRound();
  }

  function breakTies(players: Player[]): Player[] {
    return players.sort((a, b) => {
      if (a.points === b.points) {
        if (b.opponentDifficulty > a.opponentDifficulty) {
          b.tieBreaker = true;
          return 1;
        } else if (a.opponentDifficulty > b.opponentDifficulty) {
          a.tieBreaker = true;
          return -1;
        }

        const aWins = a.opponents.filter((opponentId) => {
          const opponent = players.find((p) => p.id === opponentId);
          return opponent && opponent.points < a.points;
        }).length;

        const bWins = b.opponents.filter((opponentId) => {
          const opponent = players.find((p) => p.id === opponentId);
          return opponent && opponent.points < b.points;
        }).length;

        if (bWins > aWins) {
          b.tieBreaker = true;
          return 1;
        } else if (aWins > bWins) {
          a.tieBreaker = true;
          return -1;
        }

        return 0;
      }
      return 0;
    });
  }
  function endTournament() {
    players = [];
    roundNumber = 1;
    byesCount = 0;
    currentMatches = [];
    CloseModal();
    saveStateToLocalStorage();
    tournamentStarted = false;
  }

  function calculateOpponentDifficulty(player: Player): number {
    const difficulty = player.points + player.victories * 2 - player.draws * 0.5;
    return difficulty;
  }
</script>

<div class="container mx-auto p-4">
  {#if !tournamentStarted}
    <div
      class="mb-4 text-3xl flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
    >
      <input
        type="text"
        bind:value={playerName}
        placeholder="Enter player name"
        class="input input-bordered w-full sm:w-auto"
        on:keydown={(event) => {
          if (event.key === 'Enter') addPlayer();
        }}
      />
      <button on:click={addPlayer} class="btn btn-primary w-full sm:w-auto">Add Player</button>
      <button on:click={startTournament} class="btn btn-success w-full sm:w-auto"
        >Start Tournament</button
      >
    </div>
    <div class="overflow-x-auto w-full sm:w-3/4 lg:w-1/2 mx-auto rounded shadow">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th class="w-2/12">ID</th>
            <th class="text-start">Name</th>
            <th class="w-2/12">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each players as player (player.id)}
            <tr>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>
                <button
                  class="btn btn-circle btn-error btn-sm p-2"
                  on:click={() => deletePlayer(player.id)}
                >
                  <svg
                    class="w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  {#if tournamentStarted}
    <div class="text-center text-lg font-bold mb-4">
      Round: {roundNumber}
    </div>
    <div
      class="flex flex-col sm:flex-row justify-between items-start space-y-8 sm:space-y-0 sm:space-x-8 m-4"
    >
      <div class="flex flex-col gap-4 w-full sm:w-1/3">
        {#if byesCount >= 2}
          <h3 class="text-3xl mb-4 text-center sm:text-left">Tournament <br />Finished</h3>
        {:else}
          <h3 class="text-3xl mb-4 text-center sm:text-left">Tournament <br />In Progress</h3>
        {/if}
        {#each currentMatches as match (match.player1.id)}
          <div>
            {#if byesCount < 2}
              <div class="text-lg">
                {match.player1.name} vs {match.player2 ? match.player2.name : 'No Opponent (Bye)'}
              </div>
              <div class="mt-2">
                <select
                  disabled={match.player2 === null}
                  bind:value={match.result}
                  class="select select-bordered w-full"
                >
                  <option value="" disabled>Select Result</option>
                  <option value="win">Win {match.player1.name}</option>
                  <option value="draw">Draw</option>
                  <option value="loss"
                    >Win {match.player2 ? match.player2.name : 'No Opponent'}</option
                  >
                </select>
              </div>
            {/if}
          </div>
        {/each}
        <div class="mt-4 flex flex-col sm:flex-row gap-4">
          {#if byesCount < 2}
            <button on:click={submitResults} class="btn btn-primary w-full sm:w-auto"
              >Submit Results</button
            >
          {/if}
          <button class="btn btn-error" on:click={OpenModal}>End Tournament</button>
          {#if isModalOpen}
            <dialog id="endTournamentModal" class="modal modal-open">
              <div class="modal-box">
                <h3 class="text-lg font-bold">Are you sure?</h3>
                <p class="py-4">
                  Do you really want to end the tournament? This action cannot be undone.
                </p>
                <div class="modal-action">
                  <button class="btn btn-error" on:click={endTournament}>Yes, End</button>
                  <button class="btn btn-primary" on:click={CloseModal}>Cancel</button>
                </div>
              </div>
            </dialog>
          {/if}
        </div>
      </div>

      <div class="overflow-x-auto w-full sm:w-2/3 rounded shadow">
        <table class="table table-zebra w-full border-2">
          <thead>
            <tr>
              <th class="w-1">ID</th>
              <th>Name</th>
              <th>Points</th>
              <th>Victories</th>
              <th>Draws</th>
              <th>Tie Breaker</th>
            </tr>
          </thead>
          <tbody>
            {#each breakTies(players) as player, index}
              <tr>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.points}</td>
                <td>{player.victories}</td>
                <td>{player.draws}</td>
                <td>{player.tieBreaker ? 'YES' : 'NO'}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}
</div>
