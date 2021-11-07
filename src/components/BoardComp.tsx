import React from 'react';
import { ChessType } from '../types/enums';
import ChessComp from './ChessComp';
import './BoardComp.css';
import { config } from '../config';

interface IProps {
  chesses: ChessType[];
  isGameOver: boolean;
  onClick?: (i: number) => void;
}

export default function BoardCom(props: IProps) {
  const chesses = props.chesses.map((type, index) => (
    <ChessComp
      key={index}
      type={type}
      onClick={() => {
        if (props.onClick && !props.isGameOver) {
          props.onClick(index);
        }
      }}
    />
  ));
  return (
    <div className='board' style={{ width: config.size }}>
      {chesses}
    </div>
  );
}
