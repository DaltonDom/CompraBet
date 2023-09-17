import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import styled from "styled-components";
import { Divider } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { getDatabase, ref, onValue } from "firebase/database";
const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

const CardScreen = ({ route }) => {
  const [betData, setBetData] = useState([]);

  useEffect(() => {
    readData();
  }, []);

  const getImagePathByKey = (key) => {
    const imageObject = imagePaths.find((item) => item.key === key);
    return imageObject ? imageObject.path : null;
  };

  const getSourcePathByKey = (key) => {
    const sourceObject = sourcePath.find((item) => item.key === key);
    return sourceObject ? sourceObject.path : null;
  };

  const getSportingBetConverter = (key) => {
    const sourceObject = sportingbetPath.find((item) => item.key === key);
    return sourceObject ? sourceObject.shorten : null;
  };

  const getBetMotionConverter = (key) => {
    const sourceObject = betMotionPath.find((item) => item.key === key);
    return sourceObject ? sourceObject.shorten : null;
  };

  const getBetanoConverter = (key) => {
    const sourceObject = betanoPath.find((item) => item.key === key);
    return sourceObject ? sourceObject.shorten : null;
  };

  const getF12Converter = (key) => {
    const sourceObject = f12Path.find((item) => item.key === key);
    return sourceObject ? sourceObject.shorten : null;
  };

  function readData() {
    const db = getDatabase();
    const dbRef = ref(db);
    onValue(
      dbRef,
      (snapshot) => {
        const data = [];
        const games = snapshot.val();

        games.f12.forEach((game) => {
          if (
            getF12Converter(game.AwayTeam) === route.params.AwayTeam &&
            getF12Converter(game.HomeTeam) === route.params.HomeTeam
          ) {
            const obj = {
              AwayWin: game.AwayWin,
              HomeWin: game.HomeWin,
              Tie: game.Tie,
              Source: "f12",
            };
            data.push(obj);
          }
        });
        /*
        games.betmotion.forEach((game) => {
          if (
            getBetMotionConverter(game.AwayTeam) === route.params.AwayTeam &&
            getBetMotionConverter(game.HomeTeam) === route.params.HomeTeam
          ) {
            const obj = {
              AwayWin: game.AwayWin,
              HomeWin: game.HomeWin,
              Tie: game.Tie,
              Source: "betmotion",
            };
            data.push(obj);
          }
        }); */
        /*
        games.pixbet.forEach((game) => {
          if (
            game.AwayTeam === route.params.AwayTeam &&
            game.HomeTeam === route.params.HomeTeam
          ) {
            const obj = {
              AwayWin: game.AwayWin,
              HomeWin: game.HomeWin,
              Tie: game.Tie,
              Source: "pixbet",
            };
            data.push(obj);
          }
        }); */
        /*
        games.sportingbet.forEach((game) => {
          if (
            getSportingBetConverter(game.AwayTeam) === route.params.AwayTeam &&
            getSportingBetConverter(game.HomeTeam) === route.params.HomeTeam
          ) {
            const obj = {
              AwayWin: game.AwayWin,
              HomeWin: game.HomeWin,
              Tie: game.Tie,
              Source: "sportingBet",
            };
            data.push(obj);
          }
        }); */
        games.betano.forEach((game) => {
          if (
            getBetanoConverter(game.AwayTeam) === route.params.AwayTeam &&
            getBetanoConverter(game.HomeTeam) === route.params.HomeTeam
          ) {
            const obj = {
              AwayWin: game.AwayWin,
              HomeWin: game.HomeWin,
              Tie: game.Tie,
              Source: "betano",
            };
            data.push(obj);
          }
        });
        setBetData(data);
      },
      {
        onlyOnce: true,
      }
    );
  }

  return (
    <View
      key={route.index}
      style={{
        flex: 1,
        marginTop: 50,
      }}
    >
      <Image1 source={getImagePathByKey(route.params.ImageHome)} />
      <Image2 source={getImagePathByKey(route.params.ImageAway)} />
      <JogoContainer>
        <Event>
          {route.params.Date} | {route.params.Time}
        </Event>
        <Game>
          {route.params.HomeTeam} x {route.params.AwayTeam}
        </Game>
        <League>{route.params.series}</League>
      </JogoContainer>
      <HeaderContainer>
        <LeftHeaderContainer>
          <Header>Sites</Header>
        </LeftHeaderContainer>
        <RightHeaderContainer>
          <Header>1</Header>
          <Header>X</Header>
          <HeaderLast>2</HeaderLast>
        </RightHeaderContainer>
      </HeaderContainer>
      <Divider style={{ width: "100%" }} />
      <SitesContainer>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{ height: screenHeight }}
        >
          {betData.map((bets, index) => (
            <LeftSite key={index}>
              <Logo source={getSourcePathByKey(bets.Source)} key={bets.id} />
              <ScoringContainer key={bets.id}>
                <BetOne key={bets.id}>
                  <BetText key={bets.id}>{bets.HomeWin}</BetText>
                </BetOne>
                <BetTie key={bets.id}>
                  <BetText key={bets.id}>{bets.Tie}</BetText>
                </BetTie>
                <BetTwo key={bets.id}>
                  <BetText key={bets.id}>{bets.AwayWin}</BetText>
                </BetTwo>
              </ScoringContainer>
            </LeftSite>
          ))}
        </ScrollView>
      </SitesContainer>
    </View>
  );
};

export default CardScreen;

const SitesContainer = styled.View``;

const ScoringContainer = styled.View`
  margin-top: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BetOne = styled.View`
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding-top: 15px;
  margin-left: 28px;
  width: 55px;
  height: 55px;
`;

const BetTie = styled.View`
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  width: 55px;
  height: 55px;
`;

const BetTwo = styled.View`
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding-top: 15px;
  width: 55px;
  height: 55px;
`;

const BetText = styled.Text`
  font-size: 21px;
  text-align: center;
`;

const LeftSite = styled.View`
  padding-left: 17px;
  align-items: center;
  flex-direction: row;
`;

const Logo = styled.Image`
  width: ${screenWidth * 0.35}px;
  height: ${screenHeight * 0.07}px;
  margin-top: 15px;
  background-size: contain;
  border-radius: 45px;
`;

const JogoContainer = styled.View`
  padding-top: 20px;
  padding-left: 15px;
`;

const Event = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Game = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const League = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 17px;
`;

const LeftHeaderContainer = styled.View`
  flex-direction: row;
`;

const RightHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const Image1 = styled.Image`
  width: ${screenWidth * 0.5}px;
  height: ${screenHeight * 0.2}px;
  position: relative;
  top: 0;
  left: 0;
`;
const Image2 = styled.Image`
  width: ${screenWidth * 0.5}px;
  height: ${screenHeight * 0.2}px;
  position: absolute;
  top: 0;
  right: 0;
`;

const Header = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-top: 20px;
  padding-right: 60px;
  text-transform: uppercase;
`;

const HeaderLast = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-top: 20px;
  margin-right: 20px;
  text-transform: uppercase;
`;

const sourcePath = [
  {
    key: "f12",
    path: require("../assets/bettinglogos/f12bet.png"),
  },
  {
    key: "pixbet",
    path: require("../assets/bettinglogos/pixbet.png"),
  },
  {
    key: "betmotion",
    path: require("../assets/bettinglogos/betmotion.png"),
  },
  {
    key: "sportingBet",
    path: require("../assets/bettinglogos/sportingbet.png"),
  },
  {
    key: "betano",
    path: require("../assets/bettinglogos/betano.png"),
  },
];

const imagePaths = [
  {
    key: "cruzeiro",
    path: require("../assets/teamlogos/cruzeiro.png"),
  },
  {
    key: "atletico",
    path: require("../assets/teamlogos/atletico.png"),
  },
  {
    key: "palmeiras",
    path: require("../assets/teamlogos/palmeiras.png"),
  },
  {
    key: "botafogo",
    path: require("../assets/teamlogos/botafogo.png"),
  },
  {
    key: "gremio",
    path: require("../assets/teamlogos/gremio.png"),
  },
  {
    key: "coritiba",
    path: require("../assets/teamlogos/coritiba.png"),
  },
  {
    key: "santos",
    path: require("../assets/teamlogos/santos.png"),
  },
  {
    key: "flamengo",
    path: require("../assets/teamlogos/flamengo.png"),
  },
  {
    key: "bragantino",
    path: require("../assets/teamlogos/bragantino.png"),
  },
  {
    key: "goias",
    path: require("../assets/teamlogos/goias.png"),
  },
  {
    key: "cuiaba",
    path: require("../assets/teamlogos/cuiaba.png"),
  },
  {
    key: "sãopaulo",
    path: require("../assets/teamlogos/saopaulo.png"),
  },
  {
    key: "fluminense",
    path: require("../assets/teamlogos/fluminense.png"),
  },
  {
    key: "vascodagama",
    path: require("../assets/teamlogos/vascodagama.png"),
  },
  {
    key: "americamineiro",
    path: require("../assets/teamlogos/americamineiro.png"),
  },
  {
    key: "internacional",
    path: require("../assets/teamlogos/internacional.png"),
  },
  {
    key: "bahia",
    path: require("../assets/teamlogos/bahia.png"),
  },
  {
    key: "fortaleza",
    path: require("../assets/teamlogos/fortaleza.png"),
  },
  {
    key: "corinthians",
    path: require("../assets/teamlogos/corinthians.png"),
  },
  // Add more image paths as needed
];

const sportingbetPath = [
  {
    key: "Cruzeiro",
    shorten: "Cruzeiro MG",
  },
  {
    key: "Coritiba PR",
    shorten: "Coritiba PR",
  },
  {
    key: "Botafogo FR RJ",
    shorten: "Botafogo RJ",
  },
  {
    key: "RB Bragantino",
    shorten: "Bragantino SP",
  },
  {
    key: "Fluminense",
    shorten: "Fluminense RJ",
  },
  {
    key: "Flamengo",
    shorten: "Flamengo RJ",
  },
  {
    key: "São Paulo",
    shorten: "São Paulo SP",
  },
  {
    key: "Santos",
    shorten: "Santos SP",
  },
  {
    key: "Fortaleza",
    shorten: "Fortaleza CE",
  },
  {
    key: "Cuiabá",
    shorten: "Cuiaba MT",
  },
  {
    key: "Bahia",
    shorten: "Bahia BA",
  },
  {
    key: "CA Paranaense PR",
    shorten: "Atletico PR",
  },
  {
    key: "Internacional",
    shorten: "Internacional RS",
  },
  {
    key: "Palmeiras",
    shorten: "Palmeiras SP",
  },
  {
    key: "Atletico Mineiro MG",
    shorten: "Atletico MG",
  },
  {
    key: "Goiás",
    shorten: "Goias GO",
  },
  {
    key: "Atlético-MG",
    shorten: "Atletico MG",
  },
  {
    key: "Corinthians",
    shorten: "Corinthians SP",
  },
  {
    key: "Athletico-PR",
    shorten: "Atletico PR",
  },
  {
    key: "América MG",
    shorten: "America Mineiro MG",
  },
  {
    key: "Grêmio",
    shorten: "Gremio RS",
  },
  {
    key: "Vasco",
    shorten: "Vasco da Gama RJ",
  },
];

const betMotionPath = [
  {
    key: "Fluminense RJ",
    shorten: "Fluminense RJ",
  },
  {
    key: "Santos SP",
    shorten: "Santos SP",
  },
  {
    key: "Cruzeiro MG",
    shorten: "Cruzeiro MG",
  },
  {
    key: "Athletico Paranaense PR",
    shorten: "Atletico PR",
  },
  {
    key: "Cuiabá MT",
    shorten: "Cuiaba MT",
  },
  {
    key: "Internacional RS",
    shorten: "Internacional RS",
  },
  {
    key: "Vasco da Gama RJ",
    shorten: "Vasco da Gama RJ",
  },
  {
    key: "Corinthians SP",
    shorten: "Corinthians SP",
  },
  {
    key: "RB Bragantino SP",
    shorten: "Bragantino SP",
  },
  {
    key: "Fortaleza CE",
    shorten: "Fortaleza CE",
  },
  {
    key: "Flamengo RJ",
    shorten: "Flamengo RJ",
  },
  {
    key: "Atlético Mineiro MG",
    shorten: "Atletico MG",
  },
  {
    key: "Bahia BA",
    shorten: "Bahia BA",
  },
  {
    key: "São Paulo SP",
    shorten: "São Paulo SP",
  },
  {
    key: "Palmeiras SP",
    shorten: "Palmeiras SP",
  },
  {
    key: "América MG",
    shorten: "America Mineiro MG",
  },
  {
    key: "Coritiba PR",
    shorten: "Coritiba PR",
  },
  {
    key: "Botafogo RJ",
    shorten: "Botafogo RJ",
  },
  {
    key: "Grêmio RS",
    shorten: "Gremio RS",
  },
  {
    key: "Goiás GO",
    shorten: "Goias GO",
  },
  {
    key: "",
    shorten: "",
  },
  {
    key: "",
    shorten: "",
  },
  {
    key: "",
    shorten: "",
  },
  {
    key: "",
    shorten: "",
  },
];

const betanoPath = [
  {
    key: "Fluminense",
    shorten: "Fluminense RJ",
  },
  {
    key: "Coritiba",
    shorten: "Coritiba PR",
  },
  {
    key: "Santos",
    shorten: "Santos SP",
  },
  {
    key: "Internacional",
    shorten: "Internacional RS",
  },
  {
    key: "Cuiabá",
    shorten: "Cuiaba MT",
  },
  {
    key: "Corinthians",
    shorten: "Corinthians SP",
  },
  {
    key: "Vasco da Gama",
    shorten: "Vasco da Gama RJ",
  },
  {
    key: "Fortaleza",
    shorten: "Fortaleza CE",
  },
  {
    key: "Bragantino",
    shorten: "Bragantino SP",
  },
  {
    key: "Cruzeiro",
    shorten: "Cruzeiro MG",
  },
  {
    key: "Athletico-PR",
    shorten: "Atletico PR",
  },
  {
    key: "Atlético-MG",
    shorten: "Atletico MG",
  },
  {
    key: "Flamengo",
    shorten: "Flamengo RJ",
  },
  {
    key: "São Paulo",
    shorten: "São Paulo SP",
  },
  {
    key: "Bahia",
    shorten: "Bahia BA",
  },
  {
    key: "Botafogo-RJ",
    shorten: "Botafogo RJ",
  },
  {
    key: "Coritiba",
    shorten: "Coritiba PR",
  },
  {
    key: "América-MG",
    shorten: "America Mineiro MG",
  },
  {
    key: "Palmeiras",
    shorten: "Palmeiras SP",
  },
  {
    key: "Grêmio",
    shorten: "Gremio RS",
  },
  {
    key: "Goiás",
    shorten: "Goias GO",
  },
];

const pixbetPath = [
  {
    key: "Cruzeiro EC MG",
    shorten: "Cruzeiro MG",
  },
  {
    key: "Coritiba FBC PR",
    shorten: "Coritiba PR",
  },
  {
    key: "Botafogo FR RJ",
    shorten: "Botafogo RJ",
  },
];

const f12Path = [
  {
    key: "Cruzeiro EC MG",
    shorten: "Cruzeiro MG",
  },
  {
    key: "Coritiba FBC PR",
    shorten: "Coritiba PR",
  },
  {
    key: "Botafogo FR RJ",
    shorten: "Botafogo RJ",
  },
  {
    key: "Fluminense RJ",
    shorten: "Fluminense RJ",
  },
  {
    key: "Santos SP",
    shorten: "Santos SP",
  },
  {
    key: "Internacional RS",
    shorten: "Internacional RS",
  },
  {
    key: "Cuiaba MT",
    shorten: "Cuiaba MT",
  },
  {
    key: "Corinthians SP",
    shorten: "Corinthians SP",
  },
  {
    key: "Vasco da Gama RJ",
    shorten: "Vasco da Gama RJ",
  },
  {
    key: "Fortaleza CE",
    shorten: "Fortaleza CE",
  },
  {
    key: "Bragantino SP",
    shorten: "Bragantino SP",
  },
  {
    key: "Atletico PR",
    shorten: "Atletico PR",
  },
  {
    key: "Cruzeiro MG",
    shorten: "Cruzeiro MG",
  },
  {
    key: "Atletico MG",
    shorten: "Atletico MG",
  },
  {
    key: "Flamengo RJ",
    shorten: "Flamengo RJ",
  },
  {
    key: "São Paulo SP",
    shorten: "São Paulo SP",
  },
  {
    key: "Bahia BA",
    shorten: "Bahia BA",
  },
  {
    key: "Botafogo RJ",
    shorten: "Botafogo RJ",
  },
  {
    key: "Coritiba PR",
    shorten: "Coritiba PR",
  },
  {
    key: "America Mineiro MG",
    shorten: "America Mineiro MG",
  },
  {
    key: "Palmeiras SP",
    shorten: "Palmeiras SP",
  },
  {
    key: "Goias GO",
    shorten: "Goias GO",
  },
  {
    key: "Gremio RS",
    shorten: "Gremio RS",
  },
  {
    key: "",
    shorten: "",
  },
  {
    key: "",
    shorten: "",
  },
  {
    key: "",
    shorten: "",
  },
  {
    key: "",
    shorten: "",
  },
  {
    key: "",
    shorten: "",
  },
];
