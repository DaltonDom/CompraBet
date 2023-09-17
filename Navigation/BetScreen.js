import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Card from "../Components/Card";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../Firebase/firebase-config";
import { SelectCountry } from "react-native-element-dropdown";

function BetScreen({ navigation }) {
  const [gamesData, setGamesData] = useState([]);
  const [copaData, setCopaData] = useState([]);
  const [country, setCountry] = useState("serieA");

  const local_data = [
    {
      value: "serieA",
      lable: "Brasileiro Série A",
      image: {
        uri: "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/85.png",
      },
    },
    {
      value: "brasil",
      lable: "Copa do Brasil",
      image: {
        uri: "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fleaguelogos%2Fsoccer%2F500%2F528.png",
      },
    },
    {
      value: "libert",
      lable: "Copa Libertadores",
      image: {
        uri: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Copa_Libertadores_logo.svg/1200px-Copa_Libertadores_logo.svg.png",
      },
    },
  ];

  useEffect(() => {
    readData();
    readCopaData();
  }, []);

  function readData() {
    const db = getDatabase();
    const dbRef = ref(db, "serieA/");
    onValue(
      dbRef,
      (snapshot) => {
        const data = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          const obj = {
            AwayTeam: childData.AwayTeam,
            ImageAway: childData.AwayTeam.slice(0, -3)
              .toLowerCase()
              .replace(/\s/g, ""),
            Date: childData.Date,
            HomeTeam: childData.HomeTeam,
            ImageHome: childData.HomeTeam.slice(0, -3)
              .toLowerCase()
              .replace(/\s/g, ""),
            Time: childData.Time,
            series: "BRASILEIRÃO SÉRIE A",
          };
          data.push(obj);
        });
        setGamesData(data);
      },
      {
        onlyOnce: true,
      }
    );
  }

  function readCopaData() {
    const db = getDatabase();
    const dbRef = ref(db, "copaDoBrasil/");
    onValue(
      dbRef,
      (snapshot) => {
        const data = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          const obj = {
            AwayTeam: childData.AwayTeam,
            ImageAway: childData.AwayTeam.slice(0, -3)
              .toLowerCase()
              .replace(/\s/g, ""),
            Date: childData.Date,
            HomeTeam: childData.HomeTeam,
            ImageHome: childData.HomeTeam.slice(0, -3)
              .toLowerCase()
              .replace(/\s/g, ""),
            Time: childData.Time,
            series: "COPA DO BRASIL",
          };
          data.push(obj);
        });
        setCopaData(data);
      },
      {
        onlyOnce: true,
      }
    );
  }

  const getImagePathByKey = (key) => {
    const imageObject = imagePaths.find((item) => item.key === key);
    return imageObject ? imageObject.path : null;
  };

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <TitleBar>
          <Title>Bem Vindo,</Title>
          <Name>CompraBet</Name>
          <MaterialCommunityIcons
            name="soccer-field"
            size={53}
            style={{ position: "absolute", right: 20 }}
          />
          <SelectCountry
            style={{
              height: 50,
              width: 213,
              backgroundColor: "#EEEEEE",
              borderRadius: 22,
              paddingHorizontal: 8,
            }}
            selectedTextStyle={{ fontSize: 16, marginLeft: 8 }}
            placeholderStyle={{ fontSize: 16 }}
            imageStyle={{ width: 24, height: 24, borderRadius: 12 }}
            iconStyle={{ width: 20, height: 20 }}
            maxHeight={200}
            value={country}
            data={local_data}
            valueField="value"
            labelField="lable"
            imageField="image"
            placeholder="Select country"
            searchPlaceholder="Search..."
            onChange={(e) => {
              setCountry(e.value);
            }}
          />
        </TitleBar>
        <ScrollView
          style={{ paddingBottom: 30, height: "100%" }}
          showsHorizontalScrollIndicator={false}
        >
          {country === "serieA" && (
            <>
              {gamesData.map((jogo, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("CardDetail", jogo);
                  }}
                  style={{ marginBottom: 14 }}
                >
                  <Card
                    key={index}
                    image1={getImagePathByKey(jogo.ImageHome)}
                    image2={getImagePathByKey(jogo.ImageAway)}
                    date={jogo.Date}
                    time={jogo.Time}
                    caption={`${jogo.HomeTeam.slice(
                      0,
                      -2
                    )} x ${jogo.AwayTeam.slice(0, -2)}`}
                    subtitle={jogo.series}
                  />
                </TouchableOpacity>
              ))}
            </>
          )}
          {country === "brasil" && (
            <>
              {copaData.map((jogo, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("CardDetail", jogo);
                  }}
                  style={{ marginBottom: 14 }}
                >
                  <Card
                    key={index}
                    image1={getImagePathByKey(jogo.ImageHome)}
                    image2={getImagePathByKey(jogo.ImageAway)}
                    date={jogo.Date}
                    time={jogo.Time}
                    caption={`${jogo.HomeTeam.slice(
                      0,
                      -2
                    )} x ${jogo.AwayTeam.slice(0, -2)}`}
                    subtitle={jogo.series}
                  />
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
}

export default BetScreen;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 30px;
  padding-left: 20px;
`;

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
