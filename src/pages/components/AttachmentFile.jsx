import { Box, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
const AttachmentFile = ({file}) => {
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    setFileUrl(file.url ? file.url : '');
  }, [])
  const handleDownload = () => {
    window.open(fileUrl, '_blank');
  }
  return (
    <Box sx={{ border: 0, p: 1, borderRadius: 2, boxShadow: 1, backgroundColor: "white", display: 'flex', flexDirection: 'row', width: "400px", alignItems: 'center', justifyContent: 'space-between' }}>
      <Button sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", color: "black"}} onClick={() => handleDownload}>
        <Typography variant='h5' component='h5' sx={{ }}>
          {file.title}
        </Typography>
      
        <DownloadIcon />
      </Button>
    </Box>
  )
}

export default AttachmentFile