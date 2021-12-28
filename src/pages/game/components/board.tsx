import {
  Avatar,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from "@mui/material";
import { connect } from "react-redux";
import HeroTransform from "../../../components/HeroTransform";
import { RootState } from "../../../store";
import { IDeckItem, IHero, IRoom } from "../../../types";
import { IPlayer } from "../GamePlay";
import "./board.css";

interface Props {
  players: IPlayer[];
  cardsInBoard: IDeckItem[];
  onSelected: (x: number, y: number, e: any) => void;
  // anchorEl: null | HTMLElement;
  // setAnchorEl: any;
  room: IRoom;
  currentUser: any;
  heroSelected: IDeckItem | undefined
}

const getSize = (size?: string) => {
  switch (size) {
    case "xs":
      return { x: 10, y: 10 };
    case "sm":
      return { x: 20, y: 20 };
    case "md":
      return { x: 30, y: 30 };
    case "lg":
      return { x: 50, y: 50 };
    case "xl":
      return { x: 80, y: 80 };
    default:
      return { x: 120, y: 120 };
  }
};

function Board({
  players,
  cardsInBoard,
  room,
  onSelected,
  currentUser,
  heroSelected,
}: Props) {
  const sizes = getSize(room.size);

  const housesCavaloWalk = (element: any) => {
    return [
      { x: (element.x || 0) - 2, y: (element.y || 0) - 1 },
      { x: (element.x || 0) - 1, y: (element.y || 0) - 2 },
      { x: (element.x || 0) - 2, y: (element.y || 0) + 1 },
      { x: (element.x || 0) - 1, y: (element.y || 0) + 2 },
      { x: (element.x || 0) + 2, y: (element.y || 0) - 1 },
      { x: (element.x || 0) + 1, y: (element.y || 0) - 2 },
      { x: (element.x || 0) + 2, y: (element.y || 0) + 1 },
      { x: (element.x || 0) + 1, y: (element.y || 0) + 2 },
    ]
  }

  const housesReiWalk = (element: any) => {
    return [
      { x: (element.x || 0) - 1, y: (element.y || 0) - 1 },
      { x: (element.x || 0) - 1, y: element.y || 0 },
      { x: (element.x || 0) - 1, y: (element.y || 0) + 1 },
      { x: element.x || 0, y: (element.y || 0) - 1 },
      { x: element.x || 0, y: (element.y || 0) + 1 },
      { x: (element.x || 0) + 1, y: (element.y || 0) - 1 },
      { x: (element.x || 0) + 1, y: element.y || 0 },
      { x: (element.x || 0) + 1, y: (element.y || 0) + 1 },
    ]
  }

  const housesTorreWalk = (element: any) => {
    const _housesKing = housesReiWalk(element)
    const housesKing = [_housesKing[1], _housesKing[3], _housesKing[4], _housesKing[6]]
    const housesTorre: any[] = []

    housesKing.forEach((element, idx) => {
      let x = element.x
      let y = element.y

      if (idx === 0) {
        while (x > 0) {
          x = x - 1
          housesTorre.push({ x, y })
        }
      } else if (idx === 1) {
        while (y > 0) {
          y = y - 1
          housesTorre.push({ x, y })
        }
      } else if (idx === 2) {
        while (y < sizes.y) {
          y = y + 1
          housesTorre.push({ x, y })
        }
      } else if (idx === 3) {
        while (x < sizes.x) {
          x = x + 1
          housesTorre.push({ x, y })
        }
      }
    })

    return [...housesKing, ...housesTorre]
  }

  const housesPeaoWalk = (element: any) => {
    const _housesKing = housesReiWalk(element)
    const housesPeao = [_housesKing[1], _housesKing[3], _housesKing[4], _housesKing[6]]
    return housesPeao
  }

  const housesRainhaWalk = (element: any) => {
    const bispo = housesBispoWalk(element)
    const torre = housesTorreWalk(element)

    return [...bispo, ...torre]
  }

  const housesBispoWalk = (element: any) => {
    const _housesKing = housesReiWalk(element)
    const housesKing = [_housesKing[0], _housesKing[2], _housesKing[5], _housesKing[7]]
    const housesBispo: any[] = []

    housesKing.forEach((element, idx) => {
      let x = element.x
      let y = element.y

      if (idx === 0) {
        while (x > 0 && y > 0) {
          x = x - 1
          y = y - 1
          housesBispo.push({ x, y })
        }
      } else if (idx === 1) {
        while (x > 0 && y < sizes.y) {
          x = x - 1
          y = y + 1
          housesBispo.push({ x, y })
        }
      } else if (idx === 2) {
        while (y > 0 && x < sizes.x) {
          y = y - 1
          x = x + 1
          housesBispo.push({ x, y })
        }
      } else if (idx === 3) {
        while (y < sizes.y && x < sizes.x) {
          x = x + 1
          y = y + 1
          housesBispo.push({ x, y })
        }
      }
    })

    return [...housesKing, ...housesBispo]
  }


  const heigthList = Array.from(Array(sizes.y), (_, i) => i + 1);
  const widthList = Array.from(Array(sizes.x), (_, i) => i + 1);
  let cellsVisible = [{ x: -1, y: -1 }];
  let cellsToWalk = [{ x: -1, y: -1 }];
  cardsInBoard
    .filter((x) => x.userId === currentUser.id)
    .forEach((element) => {
      cellsVisible = [...cellsVisible, ...housesReiWalk(element)]
    });

  if (heroSelected?.id) {
    if (["rei"].includes(`${heroSelected?.tipo}`)) {
      cellsToWalk = housesReiWalk(heroSelected)
    } else if (["rainha"].includes(`${heroSelected?.tipo}`)) {
      cellsToWalk = housesRainhaWalk(heroSelected)
    } else if (["torre"].includes(`${heroSelected?.tipo}`)) {
      cellsToWalk = housesTorreWalk(heroSelected)
    } else if (["bispo"].includes(`${heroSelected?.tipo}`)) {
      cellsToWalk = housesBispoWalk(heroSelected)
    } else if (["peao"].includes(`${heroSelected?.tipo}`)) {
      cellsToWalk = housesPeaoWalk(heroSelected)
    } else if (["cavalo"].includes(`${heroSelected?.tipo}`)) {
      cellsToWalk = housesCavaloWalk(heroSelected)
    }
  }

  return (
    <>
      <TableContainer style={{
        // transform: "rotate3d(-11, 13, 0, 27deg)",
        maxWidth: "98vw", display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <Table
          size="small"
          style={{
            width: "0px",
            backgroundImage:
              "url(https://images.tcdn.com.br/img/img_prod/607564/mural_de_parede_montanhas_1554_2_20180126155300.jpg)",
          }}
        >
          {heigthList.map((y) => {
            return (
              <TableRow>
                {widthList.map((x) => {
                  let cellWithHero = cardsInBoard.find((h) => h.x === x && h.y === y && h?.userId === currentUser.id);

                  const cellVisible = cellsVisible.find(
                    (h) => h.x === x && h.y === y
                  );

                  const cellToWalk = cellsToWalk.find(
                    (h) => h.x === x && h.y === y
                  );

                  const sty = {
                    backgroundColor: "#8889",
                    border: "2px solid #CCC",
                  };

                  if (cellVisible) {
                    cellWithHero = cardsInBoard.find((h) => h.x === x && h.y === y);
                  }

                  if (cellVisible || cellWithHero) {
                    sty.backgroundColor = ``;
                  }

                  if (room.turn === 1 && cellToWalk) {
                    sty.backgroundColor = `#ffef62BB`;
                    sty.border = `2px solid #FFFF99`;
                  }

                  return (
                    <TableCell
                      key={`cell-${x}-${y}`}
                      style={{
                        height: "56px",
                        width: "56px",
                        minWidth: "56px",
                        maxWidth: "56px",
                        padding: 2,
                        ...sty,
                      }}
                      onClick={(e) => onSelected(x, y, e)}
                    >
                      <>
                        {cellWithHero && (
                          <Tooltip arrow title={cellWithHero?.name || "Sem tipo"}>
                            <div
                              style={{
                                cursor: "pointer",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <HeroTransform size="56px" hero={cellWithHero as IHero} />
                            </div>
                          </Tooltip>
                        )}
                      </>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </Table>
      </TableContainer>
    </>
  );
}

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(Board);
