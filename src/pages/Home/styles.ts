import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 20px;
`;

export const Deck = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 54px;
  }

  p {
    font-weight: 300;
    margin: 10px;
  }

  div {
    border-color: white;
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    overflow: scroll;
    height: 140px;
  }
`;

export const Table = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;

  p {
    font-weight: 700;
  }
`;

export const Hand = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-color: #fff;
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  h3 {
    padding: 10px;
    border-color: #fff;
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
  }
`;

export const Result = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  border-color: #fff;
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  font-weight: 700;

  button {
    padding: 10px;
    margin-left: 20px;
    border-color: #fff;
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    background-color: #fff;
    color: #004400;
  }
`;
