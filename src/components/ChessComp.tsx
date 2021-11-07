import { ChessType } from '../types/enums';
import './chessComp.css';
import { config } from '../config';

export interface IProps {
  type: ChessType;
  onClick?: () => void;
}

export default function ChessComp(props: IProps) {
  let chess = null;
  if (props.type === ChessType.red) {
    chess = <div className='red-chess chess-item'></div>;
  }
  if (props.type === ChessType.black) {
    chess = <div className='black-chess chess-item'></div>;
  }

  return (
    <div
      className='chess'
      style={{ width: config.size / 3, height: config.size / 3 }}
      onClick={() => {
        if (props.type === ChessType.none && props.onClick) {
          props.onClick();
        }
      }}
    >
      {chess}
    </div>
  );
}
