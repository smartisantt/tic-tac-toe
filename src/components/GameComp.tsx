import { useState, useEffect } from 'react';
import './GameComp.css';
import BoardComp from './BoardComp';
import GameStatusComp from './GameStatusComp';
import { ChessType, GameStatus } from '../types/enums';

export default function GameComp() {
  const [nextChess, setNextChess] = useState<ChessType.black | ChessType.red>(ChessType.black);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.gaming);
  const [chesses, setChesses] = useState<ChessType[]>([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const arr: ChessType[] = [];
    for (let i = 0; i < 9; i++) {
      arr.push(ChessType.none);
    }
    setChesses(arr);
    setNextChess(ChessType.black);
    setGameStatus(GameStatus.gaming);
  };

  const handleClickChess = (index: number) => {
    const arr: ChessType[] = [...chesses];
    arr[index] = nextChess;
    setGameStatus(getStatus(arr, index));
    setNextChess(nextChess === ChessType.black ? ChessType.red : ChessType.black);
    setChesses(arr);
  };

  function getStatus(chesses: ChessType[], index: number): GameStatus {
    const horMin = Math.floor(index / 3) * 3;
    const verMin = Math.floor(index % 3);
    if (
      (chesses[horMin] === chesses[horMin + 1] && chesses[horMin] === chesses[horMin + 2]) ||
      (chesses[verMin] === chesses[verMin + 3] && chesses[verMin] === chesses[verMin + 6]) ||
      (chesses[4] !== ChessType.none && chesses[0] === chesses[4] && chesses[0] === chesses[8]) ||
      (chesses[4] !== ChessType.none && chesses[2] === chesses[4] && chesses[2] === chesses[6])
    ) {
      if (chesses[index] === ChessType.black) {
        return GameStatus.blackWin;
      }
      return GameStatus.redWin;
    }

    // 平局
    if (!chesses.includes(ChessType.none)) {
      return GameStatus.equal;
    }

    return GameStatus.gaming;
  }

  return (
    <div className='game'>
      <h1>井字棋游戏</h1>
      <GameStatusComp status={gameStatus} next={nextChess} />

      <BoardComp chesses={chesses!} isGameOver={gameStatus !== GameStatus.gaming} onClick={handleClickChess} />
      <button className='btn' onClick={init}>
        重新开始
      </button>
    </div>
  );
}
