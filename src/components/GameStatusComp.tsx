import { ChessType, GameStatus } from '../types/enums';
import './GameStatusComp.css';

interface IProps {
  status: GameStatus;
  next: ChessType.red | ChessType.black;
}

export default function GameStatusComp(props: IProps) {
  const { status, next } = props;
  let content: JSX.Element;
  if (props.status === GameStatus.gaming) {
    if (next === ChessType.black) {
      content = <div className='black '>黑方落子</div>;
    } else {
      content = <div className='red '>红方落子</div>;
    }
  } else {
    if (status === GameStatus.redWin) {
      content = <div className='win red'>红方胜利</div>;
    } else if (status === GameStatus.blackWin) {
      content = <div className='win black'>黑方胜利</div>;
    } else {
      content = <div className='win equal'>平局</div>;
    }
  }
  return <div className='status'>{content}</div>;
}
