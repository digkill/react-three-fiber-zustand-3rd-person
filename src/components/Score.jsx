import useGame from "../stores/useGame.js";

export const Score = () => {
  const coins = useGame((state) => state.score)

    return <div className="points">
        <img width='100px' src='/images/pudge_portainer.jpg' alt='pudge photo' />
        <h1>Meats {coins}</h1>
    </div>
}
