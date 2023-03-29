import { Flex, Grid, GridItem, Image, Box } from "@chakra-ui/react";
import { useGame } from "../hooks/useGame";
import Player from "./Player/Player";

// import { DocumentData } from 'firebase/firestore'
//import { useGame } from '../modules/games/queries'

export function Table(): JSX.Element {
  const { game, players: playersData } = useGame();

  if (!game && !playersData) {
    return <div>Loading...</div>;
  }

  const currentPlayers = game?.players;
  const players = currentPlayers.map((id) =>
    playersData?.find((p) => p.id === id)
  );

  console.log(game, playersData, players);

  return (
    <Grid
      gridTemplateColumns={"1fr 155px 155px 155px 155px 155px 155px 1fr"}
      gridTemplateRows={"155px 155px 155px 155px"}
      templateAreas={`"tl-empty player-13 player-9 player-1 player-2 player-10 player-14 tr-empty"
        "mtl-empty player-5 table table table table player-6 mtr-empty"
        "mbl-empty player-7 table table table table player-8 mbr-empty"
        "bl-empty player-15 player-11 player-3 player-4 player-12 player-16 br-empty"
      `}
    >
      {players
        .filter((player: any) => !player.isSpectator)
        .splice(0, 16)
        .map(({ name, points }, i) => {
          return (
            <GridItem area={`player-${i + 1}`} zIndex={1} key={i}>
              <Flex
                h="100%"
                w="100%"
                alignItems="center"
                justifyContent="center"
              >
                <Player
                  playerName={name}
                  points={points}
                  ready={!!points}
                  position={i + 1}
                />
              </Flex>
            </GridItem>
          );
        })}
      <GridItem area={"table"}>
        <Flex h="100%" w="100%" alignItems="center" justifyContent="center">
          <Image src="/assets/table.svg" alt="Table" />
        </Flex>
      </GridItem>
    </Grid>
  );
}
