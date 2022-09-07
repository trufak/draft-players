import React from 'react';
import infoBasketApi from '../utils/infoBasketApi';
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';

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
        players.push(...team.Players);
      })
      setPlayersData(players);
      setTableData (players.map(player=>{
        return {
          id: player.PersonInfo.PersonID,
          //photoUrl: infoBasketApi.getPersonPhotoUrl(player.PersonInfo.PersonID),
          name: player.PersonInfo.PersonFullNameRu && player.PersonInfo.PersonFullNameRu,
          age: player.PersonInfo.Age && player.PersonInfo.Age,
          height: player.PersonInfo.PersonHeight && player.PersonInfo.PersonHeight,
          weight: player.PersonInfo.PersonWeight && player.PersonInfo.PersonWeight,
          country: player.PersonInfo.Country && player.PersonInfo.Country.CountryNameRu,
          position: player.PersonInfo.Players[0].Position && player.PersonInfo.Players[0].Position.PosNameRu
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
        columns={
        [
          { title: "", field: "photoUrl",
            render: rowData => <img
                src={`https://org.infobasket.su/Widget/GetPersonPhoto/${rowData.id}?d=1`}
                className='players-item__photo'/>
          },
          { title: "Name", field: "name" },
          { title: "Age",  field: "age" },
          { title: "Height", field: "height" },
          { title: "Weight", field: "weight" },
          { title: "Country", field: "country" },
          { title: "Position", field: "position" }
        ]}
        options={{
          pageSize: 10
        }}
    />
    </ThemeProvider>
  )
}

export default Players;
