import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MyCard: React.FC<{ name: string, callBack: () => void }> = ({ name, callBack }) => {
  return (
    <div className='m-4 mx-auto'>
        <Card sx={{ maxWidth: 500, minWidth: 300 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="error" onClick={callBack}>
                    Remove
                </Button>
            </CardActions>
        </Card>
    </div>
  );
}

export default MyCard