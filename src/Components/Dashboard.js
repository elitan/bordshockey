import React, { Component } from 'react';
import { Subscription } from 'react-apollo';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { S_GET_TABLEZ } from './gql/Hasura';

const S = {};
S.DashBoard = styled.div`
{

}
`;

class DashBoard extends Component {
  render() {
    return (
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
              <Paper>
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
      </S.DashBoard>
    );
  }
}
export default DashBoard;
