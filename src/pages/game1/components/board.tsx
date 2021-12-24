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
import { connect } from "react-redux";
import HeroTransform from "../../../components/HeroTransform";
import { RootState } from "../../../store";
import { IDeckItem, IHero } from "../../../types";
import { IPlayer } from "../GamePlay";
import "./board.css";
interface Props {
  players: IPlayer[];
  cardsInBoard: IDeckItem[];
  size?: string;
  onSelected: (x: number, y: number, e: any) => void;
  anchorEl: null | HTMLElement;
  setAnchorEl: any;
  currentUser: any;
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
  currentUser,
}: Props) {
  const sizes = getSize(size);

  const heigthList = Array.from(Array(sizes.y), (_, i) => i + 1);
  const widthList = Array.from(Array(sizes.x), (_, i) => i + 1);
  const cellsVisible = [{ x: -1, y: -1 }];
  cardsInBoard
    .filter((x) => x.userId === currentUser.id)
    .forEach((element) => {
      cellsVisible.push({ x: (element.x || 0) - 1, y: (element.y || 0) - 1 }); // inferior esquerdo
      cellsVisible.push({ x: (element.x || 0) - 1, y: element.y || 0 }); // meio esquerda
      cellsVisible.push({ x: (element.x || 0) - 1, y: (element.y || 0) + 1 }); // superior esquerdo
      cellsVisible.push({ x: (element.x || 0) + 1, y: (element.y || 0) - 1 }); // inferior
      cellsVisible.push({ x: (element.x || 0) + 1, y: element.y || 0 }); // meio direita
      cellsVisible.push({ x: (element.x || 0) + 1, y: (element.y || 0) + 1 }); // superior direita
      cellsVisible.push({ x: element.x || 0, y: (element.y || 0) + 1 }); // superior meio
      cellsVisible.push({ x: element.x || 0, y: (element.y || 0) - 1 }); // inferior maeio
    });
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
                  const sty = {
                    backgroundColor: "#CCC",
                    border: "2px solid #CCC",
                  };
                  const cellVisible = cellsVisible.find(
                    (h) => h.x === x && h.y === y
                  );

                  let cell: IDeckItem | undefined = undefined;
                  if (cellVisible) {
                    cell = cardsInBoard.find((h) => h.x === x && h.y === y);
                  } else {
                    cell = cardsInBoard.find(
                      (h) =>
                        h.x === x && h.y === y && h?.userId === currentUser.id
                    );
                  }
                  if (cell || cellVisible) {
                    sty.backgroundColor = ``;
                    if (cell) {
                      sty.border = `2px solid ${
                        cell?.userId === currentUser.id ? "blue" : "red"
                      }`;
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
                        ...sty,
                      }}
                      onClick={(e) => onSelected(x, y, e)}
                    >
                      <>
                        {cell && (
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

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(Board);
