import React from "react";
import styled from "styled-components";
import resource_strings from "./resource_strings";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Book = gql`
  {
    books {
      title
      author
    }
  }
`;

const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 400px;
  margin: 50px;
`;

const Title = styled.h1`
  margin-bottom: 25px;
`;
const Description = styled.p``;

function Hero() {
  const { loading, error, data } = useQuery(Book);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log("data: ", data);

  const { image, title, description } = resource_strings;

  return (
    <Wrapper>
      {image && <Image {...image} />}
      {title && <Title>{title}</Title>}
      {description && <Description>{description}</Description>}
      {"Hihi..."}
      {data.books.map(({ title, author }, k) => (
        <div key={k}>
          <p>
            {title} - {author}
          </p>
        </div>
      ))}
    </Wrapper>
  );
}

export default Hero;
