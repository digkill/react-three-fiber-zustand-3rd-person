import useGame from "../stores/useGame.js";

export const Score = () => {
  const coins = useGame((state) => state.score)

    return <div className="points">
        <h1>Coins {coins}</h1>
    </div>
}
