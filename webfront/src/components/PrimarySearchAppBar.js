import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CastleIcon from "../icon/CastleIcon";
import { Link } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'black',
    color: 'white',
}));

export default function PrimarySearchAppBar(props) {
    const [language, setLanguage] = React.useState((!props.lang)?'ja':props.lang); // 初期言語を日本語として設定

    const handleChangeLanguage = (event) => {
        console.log(event.target.value);
        setLanguage(event.target.value);
        if(event.target.value == 'en') {
            window.location.href = "/JapanCastleMap/en/";
        } else {
            window.location.href = "/JapanCastleMap/";
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="static">
                <Toolbar>
                    <Link to={(language =='ja')?"/":"/en/"} style={{ textDecoration: 'none', color: 'white' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="城"
                            sx={{ mr: 2 }}
                        >
                            <CastleIcon />
                        </IconButton>
                    </Link>
                    <Link to={(language =='ja')?"/":"/en/"} style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                        >
                            {(language =='ja')?<>日本の城マップ</>:<>Japan Castle Explorer</>}
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Select
                        label="言語"
                        value={language}
                        onChange={handleChangeLanguage}
                        style={{ color: 'white' }}
                        IconComponent={() => <LanguageIcon style={{ color: 'white' }} />}
                    >
                        <MenuItem value="ja">日本語</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                    </Select>
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
}
