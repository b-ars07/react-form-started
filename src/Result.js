import React, { useState } from 'react'
import { MainContainer } from './components/MainContainer'
import {  Paper, TableContainer, Table, TableHead, TableRow, Typography, TableCell, TableBody, ListItemText, ListItemIcon, ListItem, List, makeStyles } from '@material-ui/core'
import { useData } from './DataContext'
import { Link } from 'react-router-dom'
import { InsertDriveFile } from '@material-ui/icons'
import { PrimaryButton } from './components/PrimaryButton'
import  Swal  from 'sweetalert2'
import Confetti from 'react-confetti'

const useStyles = makeStyles({
  root: {
    marginBottom: '30px'
  },
  table: {
    marginBottom: '30px'
  }
})

export const Result = () => {
  const [success, setSuccess] = useState(false) 
  const styles = useStyles();
  const {data} = useData()
  const entries = Object.entries(data).filter((item) => item[0] !== "files")
  const { files } = data;
  
  const onSubmit = async () => {
    const formData = new FormData();
    
    if (data.files) {
      data.files.forEach(file => {
        formData.append('files', file, file.name);
      })
    }
    
    entries.forEach(entry => {
      formData.append(entry[0], entry[1])
    })
    
    const res = await fetch('http://localhost:4000', {
      method: "POST",
      body: formData
    })
    
    if (res.status === 200) {
      Swal.fire("Great job!", 'success')
      setSuccess(true)
    }
  }
  
  if (success) {
    return <Confetti/>
  }
  
  return (
    <MainContainer>
      <Typography component='h2' variant = 'h5'>
        Result
      </Typography>
      <TableContainer className={styles.root} component={Paper}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                Field
              </TableCell>
              <TableCell>
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              entries.map((item) => (
                <TableRow key={item[0]}>
                  <TableCell>
                    {item[0]}
                  </TableCell>
                  <TableCell align="right">
                    {item[1].toString()}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer> 
      {
        files && (
          <>
             <Typography component='h2' variant = 'h5'>
              Files
              </Typography>
            <List>
              {
                files.map((file, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <InsertDriveFile />
                    </ListItemIcon>
                    <ListItemText primary={file.name} secondary={file.size} />
                  </ListItem>
                ))
              }
            </List>
          </>
        )
      }
      
    <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
      <Link to="/">Strart over</Link>
    </MainContainer>
  )
}
