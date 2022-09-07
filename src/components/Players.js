import React from 'react';
import infoBasketApi from '../utils/infoBasketApi';
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import {
  ChevronRight,
  LastPage,
  FirstPage,
  Clear,
  Search,
  ArrowDownward,
  ChevronLeft } from "@material-ui/icons";

const tableIcons = {
  SortArrow: React.forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  Search: React.forwardRef((props, ref) => <Search {...props} ref={ref} />),
  ResetSearch: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  FirstPage: React.forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: React.forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: React.forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />)
};

function Players () {

  const [playersData, setPlayersData] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);

  //эффекты при мортировании
  React.useEffect (()=>{
    //запрос данных с InfoBasket
    infoBasketApi.getTeamStats()
    .then(data=>{
      const players = [];
      data.Stats.forEach(team=>{
        players.push(...team.Players.map(player=>{
          player.teamId = team.TeamId;
          player.teamName = team.TeamName;
          return player;
        }));
      })
      setPlayersData(players);
      setTableData (players.map(player=>{
        return {
          id: player.PersonInfo.PersonID,
          name: player.PersonInfo.PersonFullNameRu && player.PersonInfo.PersonFullNameRu,
          age: player.PersonInfo.Age && player.PersonInfo.Age,
          height: player.PersonInfo.PersonHeight && player.PersonInfo.PersonHeight,
          weight: player.PersonInfo.PersonWeight && player.PersonInfo.PersonWeight,
          country: player.PersonInfo.Country && player.PersonInfo.Country.CountryNameRu,
          position: player.PersonInfo.Players[0].Position && player.PersonInfo.Players[0].Position.PosNameRu,
          team: player.teamName.CompTeamNameRu
        }
      }));
    })
    .catch(err => {
      console.log(err);
    });
  },[]);

  const defaultMaterialTheme = createTheme();

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        title="Players"
        data={tableData}
        icons={tableIcons}
        columns={
        [
          { title: "", field: "photoUrl",
            render: rowData => <img
                src={infoBasketApi.getPersonPhotoUrl(rowData.id)}
                className='players-item__photo'/>
          },
          { title: "Имя", field: "name" },
          { title: "Возраст",  field: "age" },
          { title: "Рост", field: "height" },
          { title: "Вес", field: "weight" },
          { title: "Страна", field: "country" },
          { title: "Позиция", field: "position" },
          { title: "Команда", field: "team" }
        ]}
        options={{
          pageSize: 10,
        }}
    />
    </ThemeProvider>
  )
}

export default Players;
