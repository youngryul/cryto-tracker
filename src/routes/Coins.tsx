import { Link } from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {fetchCoins} from "../api";

// max-width 와 margin 0 auto를 주면 모바일 화면처럼 가운데에 위치한다.
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

const Loader = styled.span`
    text-align: center;
`;

function Coins() {
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);
    //
    // // useEffect 안에서 함수 즉시 실행 방법
    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // }, []);

    const {isLoading,data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);

    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {
                isLoading ? <Loader>Loading...</Loader> :
                    <CoinsList>
                    {data?.slice(0,100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`} state={coin} >
                                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            }

        </Container>
    );
}
export default Coins;