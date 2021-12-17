import { Table, TableCell, TableRow } from '@mui/material';
import { IBoard, IDeckItem } from '../../../types';
import { IPlayer } from '../GamePlay';

interface Props {
  players: IPlayer[]
  cardsInBoard: IDeckItem[]
  size?: string,
  onSelected: (x: number, y: number) => void
}

const getSize = (size?: string) => {
  switch (size) {
    case "xs":
      return { x: 10, y: 10 }
    case "sm":
      return { x: 20, y: 20 }
    case "md":
      return { x: 30, y: 30 }
    case "lg":
      return { x: 50, y: 50 }
    case "xl":
      return { x: 80, y: 80 }
    default:
      return { x: 120, y: 120 }
  }
}


function Board({ players, cardsInBoard, size, onSelected }: Props) {
  const sizes = getSize(size)
  const heigthList = Array.from(Array(sizes.y), (_, i) => i + 1)
  const widthList = Array.from(Array(sizes.x), (_, i) => i + 1)

  return (
    <Table style={{ backgroundImage: "url(https://images.tcdn.com.br/img/img_prod/607564/mural_de_parede_montanhas_1554_2_20180126155300.jpg)" }}>
      {heigthList.map(y => {
        return (
          <TableRow>
            {widthList.map(x => {
              let backgroundColor = ""
              const cell = cardsInBoard.find(h => (h.x === x && h.y === y))
              if (cell) {
                const cellPlayer = players.find(p => p.id === cell.userId)
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
                      {cell?.photoURL &&
                        <img
                          // draggable={false}
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                          src={cell.photoURL}
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
