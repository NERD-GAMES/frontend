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
import { useState } from "react";
import HeroTransform from "../../../components/HeroTransform";
import { IDeckItem, IHero } from "../../../types";
import { IPlayer } from "../GamePlay";
interface Props {
  players: IPlayer[];
  cardsInBoard: IDeckItem[];
  size?: string;
  onSelected: (x: number, y: number, e: any) => void;
  anchorEl: null | HTMLElement;
  setAnchorEl: any;
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
  size,
  onSelected,
  anchorEl,
  setAnchorEl,
}: Props) {
  const sizes = getSize(size);

  const heigthList = Array.from(Array(sizes.y), (_, i) => i + 1);
  const widthList = Array.from(Array(sizes.x), (_, i) => i + 1);
  return (
    <>
      <TableContainer style={{ maxWidth: "98vw" }}>
        <Table
          size="small"
          style={{
            backgroundImage:
              "url(https://images.tcdn.com.br/img/img_prod/607564/mural_de_parede_montanhas_1554_2_20180126155300.jpg)",
          }}
        >
          {heigthList.map((y) => {
            return (
              <TableRow>
                {widthList.map((x) => {
                  let backgroundColor = "#CCC";
                  const cell = cardsInBoard.find((h) => h.x === x && h.y === y);
                  if (cell) {
                    const cellPlayer = players.find(
                      (p) => p.id === cell.userId
                    );
                    if (cellPlayer) {
                      backgroundColor = `${cellPlayer.color}`;
                    }
                  }

                  return (
                    <TableCell
                      key={`cell-${x}-${y}`}
                      style={{
                        height: "56px",
                        width: "56px",
                        minWidth: "56px",
                        padding: 2,
                        border: `2px solid ${backgroundColor}`,
                      }}
                      onClick={(e) => onSelected(x, y, e)}
                    >
                      <>
                        {/* {x === 1 && (
                      <div style={{ position: "absolute", marginLeft: -30 }}>
                      {y}
                      </div>
                      )}
                      {y === 1 && (
                        <div style={{ position: "absolute", marginTop: -50 }}>
                        {x}
                        </div>
                      )} */}
                        {/* 
                      {cell?.tipo && (
                        <Tooltip title={cell?.tipo}>
                        <Avatar
                        style={{ width: "2vw", height: "2vw" }}
                        variant="square"
                        src={`/frontend/img/${cell?.tipo}.png`}
                        imgProps={{
                          draggable: false,
                        }}
                        />
                        </Tooltip>
                      )} */}

                        {backgroundColor !== "#CCC" && (
                          <Tooltip arrow title={cell?.name || "Sem tipo"}>
                            <div
                              style={{
                                cursor: "pointer",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <HeroTransform hero={cell as IHero} />
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

export default Board;
