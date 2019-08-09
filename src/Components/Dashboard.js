import React, { Component } from 'react';
import { Subscription } from 'react-apollo';
import styled from 'styled-components';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Layout from './Layout';
import Banner from '../images/banner.png';
import { PlayCircleFilledWhite } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { S_GET_TABLEZ, S_GET_MATCHES } from './gql/Hasura';

const S = {};
S.DashBoard = styled.div`
{

  .banner {
    background-image: url(${Banner});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    height: 300px;
    width: 100%;
  }

  .paper {
    margin: 3rem 0 3rem 0;
  }

  .highlight {
    background: #e8f7ff;

    .match_win {
      color: #23692e;
    }

    .match_loss {
      color: #692323;
    }
  }

  .youtube-button {
    color: #df3131;
  }
}
`;

class DashBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected_team_id: null,
    };
  }

  render() {
    return (
      <Layout>
        <S.DashBoard>
          <div className="banner">
          </div>
          <Subscription
            subscription={S_GET_TABLEZ}
          >
            {({ loading, error, data }) => {

              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;

              const { tablez } = data;

              return (
                <Paper className="paper paper-table">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>GF</TableCell>
                        <TableCell>GA</TableCell>
                        <TableCell>Matches</TableCell>
                        <TableCell>Points</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tablez.map((team, i) => (
                        <TableRow
                          key={team.id}
                          hover
                          className="tablez-team"
                          onMouseOver={() => {
                            this.setState({
                              team_id: team.id,
                            });
                          }}
                          onMouseOut={() => {
                            this.setState({
                              team_id: null,
                            });
                          }}
                        >
                          <TableCell>
                            {i + 1}
                          </TableCell>
                          <TableCell>
                            {team.name}
                          </TableCell>
                          <TableCell>
                            {team.goals_for}
                          </TableCell>
                          <TableCell>
                            {team.goals_against}
                          </TableCell>
                          <TableCell>
                            {team.matches_played}
                          </TableCell>
                          <TableCell>
                            {team.points}
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

              const { matches } = data;

              return (
                <Paper className="paper paper-matches">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Hemmalag</TableCell>
                        <TableCell>Bortalag</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {matches.map((match, i) => {

                        let highlight = false;
                        let home_team_win = false;
                        let away_team_win = false;

                        if (match.home_team_id === this.state.team_id || match.away_team_id === this.state.team_id) {
                          highlight = true;
                          if (match.home_team_score > match.away_team_score) {
                            home_team_win = true;
                          } else {
                            away_team_win = true;
                          }
                        }

                        const row_classes = classNames({
                          highlight,
                        });

                        const home_classes = classNames({
                          match_win: home_team_win,
                          match_loss: away_team_win,
                        });

                        const away_classes = classNames({
                          match_win: away_team_win,
                          match_loss: home_team_win,
                        });


                        return (
                          <TableRow
                            key={i}
                            hover
                            className={row_classes}
                          >
                            <TableCell
                              className={home_classes}
                            >
                              {match.home_team_name}
                            </TableCell>
                            <TableCell
                              className={away_classes}
                            >
                              {match.away_team_name}
                            </TableCell>
                            <TableCell>
                              {match.home_team_score} - {match.away_team_score}
                            </TableCell>
                            <TableCell>
                              {match.youtube_key &&
                                <a
                                  href={`https://www.youtube.com/watch?v=${match.youtube_key}`}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  <IconButton size="small" className="youtube-button">
                                    <PlayCircleFilledWhite />
                                  </IconButton>
                                </a>
                              }
                            </TableCell>
                          </TableRow>
                        );
                      })}
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
