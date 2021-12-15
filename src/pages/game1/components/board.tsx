import { Table, TableCell, TableRow } from '@mui/material';
import { IBoard, IDeck } from '../../../App';
import { IPlayer } from './play';

interface Props {
  players: IPlayer[]
  cardsInBoard: IDeck[]
  board: IBoard,
  onSelected: (x: number, y: number) => void
}

function Board({ players, cardsInBoard, board, onSelected }: Props) {

  const heigthList = Array.from(Array(board.y), (_, i) => i + 1)
  const widthList = Array.from(Array(board.x), (_, i) => i + 1)

  return (
    <Table style={{ backgroundImage: "url(https://images.tcdn.com.br/img/img_prod/607564/mural_de_parede_montanhas_1554_2_20180126155300.jpg)" }}>
      {heigthList.map(y => {
        return (
          <TableRow>
            {widthList.map(x => {
              let backgroundColor = ""
              const cell = cardsInBoard.find(h => (h.x === x && h.y === y))
              if (cell) {
                const cellPlayer = players.find(p => p.id === cell.playerId)
                if (cellPlayer) {
                  backgroundColor = cellPlayer.color
                }
              }

              return (
                <TableCell
                  style={{
                    border: "1px solid #ddd",
                    padding: 0,
                    height: 56,
                    width: 56,
                  }}
                  onClick={() => onSelected(x, y)}
                >
                  {backgroundColor &&
                    <div style={{
                      display: "flex", alignItems: "center",
                      border: `3px solid ${backgroundColor}`
                    }}>
                      {cell?.avatar &&
                        <img
                          // draggable={false}
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                          src={cell.avatar}
                          alt="hero"
                        />
                      }
                    </div>
                  }
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </Table>
  );
}

export default Board;
