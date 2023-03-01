import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-image: linear-gradient(
    to left top,
    #b14f1d,
    #b73b3f,
    #ae335e,
    #963979,
    #72448c
  );
`;

export const Title = styled.h1`
  font-size: 4.5rem;
  margin-top: 3rem;
  color: #fff;
  font-family: "Lobster", cursive;
  text-shadow: 2px 2px 2px #818181;
`;
