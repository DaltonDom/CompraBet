import React from "react";
import styled from "styled-components";
import { View, StyleSheet, Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

const Card = (props) => (
  <Container>
    <ImageContainer>
      <LeftContainer>
        <Image source={props.image1} style={{ flex: 1, resizeMode: "cover" }} />
      </LeftContainer>
      <RightContainer>
        <Image source={props.image2} style={{ flex: 1, resizeMode: "cover" }} />
      </RightContainer>
    </ImageContainer>
    <Content>
      <Date>
        <FullDate>{props.date}</FullDate>
        <FullDate>{props.time}</FullDate>
      </Date>
      <Wrapper>
        <Caption>{props.caption}</Caption>
        <Subtitle>{props.subtitle}</Subtitle>
      </Wrapper>
      <MaterialCommunityIcons
        name="arrow-expand"
        size={27}
        style={{ paddingLeft: 15 }}
      />
    </Content>
  </Container>
);

export default Card;

const Content = styled.View`
  padding-left: 13px;
  padding-right: 13px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const Date = styled.View`
  font-weight: 600;
  font-size: 15px;
`;

const FullDate = styled.Text`
  font-weight: 600;
  font-size: 14px;
`;

const Caption = styled.Text`
  color: #3c4560;
  font-size: 18px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  text-transform: uppercase;
  margin-top: 4px;
`;

const Wrapper = styled.View`
  margin-left: 10px;
`;

const Container = styled.View`
  background: white;
  width: ${screenWidth * 0.9}px;
  height: ${screenHeight * 0.2}px;
  border-radius: 14px;
  margin-left: 20px;
  margin-top: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
  width: 100%;
  height: 200px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 20px;
  width: 170px;
`;

//image container
const ImageContainer = styled(View)`
  flex-direction: row;
  align-items: stretch;
  height: 85px;
  padding-top: 13px;
  padding-right: 13px;
`;

const LeftContainer = styled(View)`
  flex: 1;
  background-color: white;
`;

const RightContainer = styled(View)`
  flex: 1;
  background-color: white;
`;
