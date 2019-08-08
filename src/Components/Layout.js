import React, { Component } from 'react';
import styled from 'styled-components';

const S = {};
S.LayoutMainContainer = styled.div`
{
  display: grid;
  grid-template-columns: [full-start] minmax(3rem, 1fr) [main-start] minmax(min-content, 120rem) [main-end] minmax(3rem, 1fr) [full-end];

  > .main-container {
    grid-column: main;
  }
}
`;

class LayoutMainContainer extends Component {
  render() {
    return (
      <S.LayoutMainContainer>
        <div className="main-container">
          {this.props.children}
        </div>
      </S.LayoutMainContainer>
    );
  }
}

export default LayoutMainContainer;
