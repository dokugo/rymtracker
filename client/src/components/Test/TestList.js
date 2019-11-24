import React, { useState, useEffect } from 'react';
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
              <Artists>
                {item.artists.map((item, index, arr) => {
                  return (
                    <Artist key={index}>
                      <Link
                        artist
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.text}
                      </Link>
                      <Ampersand>
                        {index === arr.length - 1 ? null : '&'}
                      </Ampersand>
                    </Artist>
                  );
                })}
              </Artists>
              <Album>
                <Link
                  album
                  href={item.album.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.album.text}
                </Link>
              </Album>
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
  background-color: rgba(32, 34, 37, 0.3);
  margin-bottom: 10px;
  border-radius: 5px;
`;

const Item = styled.article`
  width: 640px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: rgba(32, 34, 37, 0.3);
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 10px 20px;
  @media (max-width: 670px) {
    width: 100%;
  }
`;

const Artists = styled.div`
  display: flex;
`;

const Artist = styled.span``;

const Album = styled.div``;

const Ampersand = styled.span`
  padding: 0 5px;
  font-size: 22px;
  /* font-style: normal; */
`;

const Link = styled.a`
  text-decoration: none;
  width: fit-content;
  color: ${({ artist, album }) =>
    (artist && 'rgba(175, 225, 255, 0.8)') || (album && 'rgb(175, 225, 255)')};
  font-size: ${({ artist, album }) => (artist && '22px') || (album && '24px')};
  font-weight: ${({ artist, album }) => (artist && '300') || (album && '400')};
  &:hover {
    text-decoration: underline;
  }
`;
