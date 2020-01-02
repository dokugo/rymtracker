import React /* , { useState, useEffect } */ from 'react';
import styled from 'styled-components/macro';

const TestList = ({ dataStorage }) => {
  // const TestList = () => {

  // const [dataStorage, setDataStorage] = useState(null);

  /*   const [fakeData, setFakeData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9000/test`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setFakeData(res);
      });
  }, []); */

  /*   if (dataStorage) {
    console.log(
      '%cReduced data has arrived.',
      'color: darkred; font-weight: 700; font-size: 14px'
    );
  } */

  // const data = fakeData;
  const data = dataStorage;

  const releaseDate = (prevDate, currDate, nextDate) => {
    return currDate === nextDate && currDate !== prevDate ? (
      <ReleaseDate>{currDate}</ReleaseDate>
    ) : currDate !== nextDate && currDate !== prevDate ? (
      <ReleaseDate>{currDate}</ReleaseDate>
    ) : null;
  };

  const elements = data
    ? data.map((item, index, arr) => {
        let prevDate = arr[index - 1] && arr[index - 1].date;
        let currDate = item.date;
        let nextDate = arr[index + 1] && arr[index + 1].date;
        return (
          <React.Fragment key={index}>
            {releaseDate(prevDate, currDate, nextDate)}
            <Item>
              <div className="artists">
                {item.artists.map((item, index, arr) => {
                  return (
                    <span className="artist" key={index}>
                      <Link
                        type={'artist'}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.text}
                      </Link>
                      <Ampersand>
                        {index === arr.length - 1 ? null : '&'}
                      </Ampersand>
                    </span>
                  );
                })}
              </div>
              <div className="albums">
                <Link
                  type={'album'}
                  href={item.album.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.album.text}
                </Link>
              </div>
            </Item>
          </React.Fragment>
        );
      })
    : null;

  return <List>{elements}</List>;
};

export default TestList;

const List = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReleaseDate = styled.time`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.card.date};
  margin-bottom: 10px;
  border-radius: 5px;
`;

const Item = styled.article`
  width: 640px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.card.background};
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 10px 20px;
  @media (max-width: 670px) {
    width: 100%;
  }
`;

const Ampersand = styled.span`
  padding: 0 5px;
  font-size: 22px;
`;

const Link = styled.a`
  text-decoration: none;
  width: fit-content;
  font-size: ${({ type }) =>
    type === 'artist' ? '22px' : type === 'album' ? '24px' : null};
  font-weight: ${({ type }) =>
    type === 'artist' ? '300' : type === 'album' ? '400' : null};
  color: ${({ type, theme }) =>
    type === 'artist'
      ? theme.card.artist
      : type === 'album'
      ? theme.card.album
      : null};
  &:hover {
    text-decoration: underline;
  }
`;
