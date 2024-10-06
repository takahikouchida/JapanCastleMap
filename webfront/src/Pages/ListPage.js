import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import IconButton from "@mui/material/IconButton";
import Link from '@mui/material/Link';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import axios from 'axios';
import { useParams } from "react-router-dom";
import MapIcon from '@mui/icons-material/Map';

import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import ShiroJson from "../asset/shiro.geojson";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {Helmet} from "react-helmet";


export default function ListPage(props) {
    const [shiroList, setShiroList] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(30);
    const { lang } = useParams();

    useEffect(() => {
        axios.get(ShiroJson)
            .then(response => {
                const newShiroList = response.data.features.map(feature => createData(feature));
                setShiroList(newShiroList);
            })
            .catch(error => {
                console.error('Error fetching JSON file:', error);
            });
    }, []);

    function createData(feature) {
        return {
            // thumbnail:feature.properties.thumbnail || '',
            // extract: feature.properties.extract || '',
            title: feature.properties.title || '',
            title_en: feature.properties.title_en || '',
            kuni: feature.properties.kuni || '',
            gun: feature.properties.gun || '',
        };
    }

    const filteredShiroList = shiroList.filter(shiro =>
        shiro.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        shiro.kuni.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        shiro.gun.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        shiro.title_en.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const indexOfLastShiro = page * rowsPerPage;
    const indexOfFirstShiro = indexOfLastShiro - rowsPerPage;
    const currentShiroList = filteredShiroList.slice(indexOfFirstShiro, indexOfLastShiro);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleClick = (title) => {
//        history.push(url);
        window.location.href = `/JapanCastleMap/map/?castle=${title}`
    };

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={(!lang) ? "日本の城を探索しよう！姫路城、松本城、大阪城、熊本城、名古屋城など、日本の代表的な城を詳しく紹介しています。各城の歴史や建築の素晴らしさ、武士文化への深い理解を提供し、城巡りの冒険に役立つ情報をお届けします。当サイトのインタラクティブな地図で、日本の壮大な城郭の秘密を解き明かしましょう。これらの古城の物語に没頭し、日本の文化遺産に触れてみませんか？"
                        : "Discover the captivating world of Japanese castles on our site! Explore the rich history and architectural wonders of iconic castles like Himeji, Matsumoto, Osaka, Kumamoto, and Nagoya. Immerse yourself in feudal Japan as we guide you through the stories behind each castle, providing insights into samurai culture, historical significance, and more. Plan your castle-hopping adventure with our interactive map and unlock the secrets of Japan's majestic fortresses. Join us in unraveling the tales of these ancient strongholds and dive deep into the cultural heritage of Japan."}
                />
                <meta name="keywords"
                      content={(!lang) ? "日本の城, 姫路城, 松本城, 大阪城, 熊本城, 名古屋城, 歴史的な城, 日本の文化遺産, 城巡り, 武士文化, インタラクティブな城地図"
                          :"Japanese castles, Himeji Castle, Matsumoto Castle, Osaka Castle, Kumamoto Castle, Nagoya Castle, historical castles, Japanese cultural heritage, castle exploration, samurai culture, interactive castle map"}
                />
            </Helmet>
            <PrimarySearchAppBar lang={lang}/>
            <Container maxWidth="md" sx={{ mt: 5, mb: 3,pb:5  }}>
                <>
                    <TextField
                        label={(!lang) ?"城、国、郡の名前で検索":"Search by Castle Name"}
                        variant="outlined"
                        fullWidth
                        value={searchKeyword}
                        onChange={(e) => {
                            setPage(1);
                            setSearchKeyword(e.target.value)}
                        }
                        sx={{ mb: 3 }}
                    />

                    <Alert severity="warning" sx={{ mb: 3 }}>国、郡の名前は幕末時点のものです</Alert>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 200 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {/*<TableCell></TableCell>*/}
                                    <TableCell sx={{ width: 60 }} ></TableCell>
                                    <TableCell>{(!lang) ?"城の名前":"Castle Name"}</TableCell>
                                    <TableCell>国の名前</TableCell>
                                    <TableCell>郡の名前</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentShiroList.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {/*<TableCell component="th" scope="row">*/}
                                        {/*    <img src={row.thumbnail}/>*/}
                                        {/*</TableCell>*/}
                                        <TableCell >
                                            <IconButton onClick={()=>{handleClick(row.title)}} aria-label="map">
                                                <MapIcon/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>

                                            {!lang ?
                                                <Link href={`/JapanCastleMap/map/ja/${row.title}`}>
                                                    {row.title}
                                                </Link>
                                                :
                                                <Link href={`/JapanCastleMap/map/en/${row.title}`}>
                                                    {row.title_en}
                                                </Link>
                                            }
                                            {/*{!lang ?*/}
                                            {/*    <Link href={`/JapanCastleMap/map/?castle=${row.title}`}>*/}
                                            {/*        {row.title}*/}
                                            {/*    </Link>*/}
                                            {/*        :*/}
                                            {/*    <Link href={`/JapanCastleMap/map/en/?castle=${row.title}`}>*/}
                                            {/*        {row.title_en}*/}
                                            {/*    </Link>*/}
                                            {/*}*/}
                                        </TableCell>
                                        <TableCell>
                                                {row.kuni}
                                        </TableCell>
                                        <TableCell>
                                            {row.gun}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={Math.ceil(filteredShiroList.length / rowsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        sx={{ mt: 3 , display: 'flex', justifyContent: 'center' }}
                    />
                </>
            </Container>
        </>
    );
}
