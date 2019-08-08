import React, { Component } from 'react';
import { Subscription } from 'react-apollo';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Layout from './Layout';

import { S_GET_TABLEZ, S_GET_MATCHES } from './gql/Hasura';

const S = {};
S.DashBoard = styled.div`
{

  .paper {
    margin: 3rem 0 3rem 0;
  }
}
`;

class DashBoard extends Component {
  render() {
    return (
      <Layout>
        <S.DashBoard>
          <Subscription
            subscription={S_GET_TABLEZ}
          >
            {({ loading, error, data }) => {

              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;

              console.log(data);

              const { tablez } = data;

              return (
                <Paper className="paper paper-table">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Points</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tablez.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            {i + 1}
                          </TableCell>
                          <TableCell>
                            {row.name}
                          </TableCell>
                          <TableCell>
                            {row.points}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              );
            }}
          </Subscription>
          <Subscription
            subscription={S_GET_MATCHES}
          >
            {({ loading, error, data }) => {

              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;

              console.log(data);
              const { matches } = data;
              return (
                <Paper className="paper paper-matches">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Hemmalag</TableCell>
                        <TableCell>Bortalag</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {matches.map((match, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            {match.home_team_name}
                          </TableCell>
                          <TableCell>
                            {match.away_team_name}
                          </TableCell>
                          <TableCell>
                            {match.home_team_score} - {match.away_team_score}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              );
            }}
          </Subscription>
        </S.DashBoard>
      </Layout>
    );
  }
}
export default DashBoard;
