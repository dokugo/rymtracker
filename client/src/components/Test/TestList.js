import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

const TestList = ({ dataStorage }) => {
  // const TestList = () => {
  // const [dataStorage, setDataStorage] = useState(null);
  const [fakeData, setFakeData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9000/test`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setFakeData(res);
      });
  }, []);

  if (dataStorage) {
    console.log(
      '%cReduced data arrived.',
      'color: darkred; font-weight: 700; font-size: 14px'
    );
  }

  // const data = dataStorage;
  const data = fakeData;

  const elements = data
    ? data.map((item, index) => {
        return (
          <Item key={index}>
            {
              <>
                <Artists>
                  {item.artists.map((item, index, arr) => {
                    return (
                      <div key={index}>
                        <Link
                          artist
                          key={index}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.text}
                        </Link>
                        <Ampersand>
                          {index === arr.length - 1 ? null : '&'}
                        </Ampersand>
                      </div>
                    );
                  })}
                </Artists>
                <Link
                  album
                  href={item.album.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.album.text}
                </Link>
              </>
            }
          </Item>
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

const Ampersand = styled.span`
  padding: 0 5px;
  font-size: 22px;
`;

const Link = styled.a`
  text-decoration: none;
  width: fit-content;
  color: ${({ artist, album }) =>
    (artist && 'rgba(130, 209, 255, 0.65)') || (album && 'rgb(130, 209, 255)')};
  font-size: ${({ artist, album }) => (artist && '22px') || (album && '22px')};
  &:hover {
    text-decoration: underline;
  }
`;
