import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import MapIcon from '@mui/icons-material/Map';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableRowsIcon from '@mui/icons-material/TableRows';
import TopImage from "../asset/topimage.jpg";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import React from "react";
import {useParams} from "react-router-dom";
import { Button, Typography, List, ListItem, ListItemText, Link } from '@mui/material';
import { Helmet } from 'react-helmet';

export default function TopPage(props) {

    const { lang } = useParams();

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={(!lang) ? "日本全国の城を地図を使い探索しよう！姫路城、松本城、大阪城、熊本城、名古屋城など、日本の代表的な城を詳しく紹介しています。各城の歴史や建築の素晴らしさ、武士文化への深い理解を提供し、城巡りの冒険に役立つ情報をお届けします。当サイトのインタラクティブな地図で、日本の壮大な城郭の秘密を解き明かしましょう。これらの古城の物語に没頭し、日本の文化遺産に触れてみませんか？"
                        : "Discover the captivating world of Japanese castles on our site! Explore the rich history and architectural wonders of iconic castles like Himeji, Matsumoto, Osaka, Kumamoto, and Nagoya. Immerse yourself in feudal Japan as we guide you through the stories behind each castle, providing insights into samurai culture, historical significance, and more. Plan your castle-hopping adventure with our interactive map and unlock the secrets of Japan's majestic fortresses. Join us in unraveling the tales of these ancient strongholds and dive deep into the cultural heritage of Japan."}
                />
                <meta name="keywords"
                      content={(!lang) ? "日本全国の城,昔の地名,古い地図, 姫路城, 松本城, 大阪城, 熊本城, 名古屋城, 歴史的な城, 日本の文化遺産, 城巡り, 武士文化, インタラクティブな城地図"
                        :"Japanese castles, Himeji Castle, Matsumoto Castle, Osaka Castle, Kumamoto Castle, Nagoya Castle, historical castles, Japanese cultural heritage, castle exploration, samurai culture, interactive castle map"}
                    />
            </Helmet>
            <PrimarySearchAppBar lang={lang}/>
            <Paper item lg={12} sm={12} md={12} sx={{
                mt: 8,mb:3,
                height:"200px",
                backgroundImage: `url(${TopImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "0px",
            }}>
            </Paper>
            <Container maxWidth="md" sx={{pb:5}}>
                <Box sx={{mb:5}}>
                    {(!lang)?
                    <Stack spacing={2}>
                        <Typography variant="h4">日本の城マップへようこそ！ 🏯</Typography>

                        <Typography variant="body1">
                            日本の歴史と文化を感じる旅に出発しませんか？「日本の城マップ」は、美しい城々をオンラインで探索し、その歴史や建築の美しさを体験できるWEBアプリです。
                        </Typography>

                        <List>
                            <ListItem>
                                <Typography>🌍 <strong>全国規模の城巡り:</strong> 北から南まで、日本各地の名城を訪れ、豊かな歴史の香りに触れてください。各城にはその歴史や特徴が詳細に紹介され、まるでタイムトラベルしているかのような感覚が広がります。</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>📷 <strong>写真と情報満載:</strong> 各城の美しい写真や興味深い情報が豊富に揃っています。建物の構造、武将たちのエピソード、戦国時代のエピックな物語など、知識を深めながら視覚的な楽しさも満喫できます。</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>📍 <strong>実際の場所をマッピング:</strong> 各城の実際の場所が地図上にマッピングされています。気になる城を選んでクリックすると、その場所にあるかのように立体的に観覧できます。</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>🌟 <strong>ユーザーフレンドリーなデザイン:</strong> シンプルで使いやすいデザインが特徴です。直感的なナビゲーションで、誰でも簡単に城巡りを楽しむことができます。</Typography>
                            </ListItem>
                        </List>

                        <Typography variant="body1">
                            新しい冒険に出発して、日本の城の美と歴史を体感しましょう。日本の城マップが、あなたを素晴らしい歴史の旅へと誘います。
                        </Typography>
                    </Stack>
                        :
                        <Stack spacing={2}>
                            <Typography variant="h4">Welcome to the Japanese Castle Map! 🏯</Typography>

                            <Typography variant="body1">
                                Embark on a journey to experience the rich history and culture of Japan. "Japanese Castle Map" is a web app that allows you to explore beautiful castles online, immersing yourself in their history and architectural beauty.
                            </Typography>

                            <List>
                                <ListItem>
                                    <Typography>🌍 <strong>Nationwide Castle Tour:</strong> From north to south, visit renowned castles across Japan and immerse yourself in the rich scent of history. Each castle is detailed with its history and features, providing a sensation akin to time travel.</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>📷 <strong>Loaded with Photos and Information:</strong> Abundant with stunning photos and intriguing information. Dive deep into the structure of buildings, the tales of feudal lords, and epic stories from the Warring States period while enjoying a visually captivating experience.</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>📍 <strong>Mapping Actual Locations:</strong> The actual locations of each castle are mapped on the interface. Click on any castle you're interested in, and virtually explore it as if you were standing there.</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>🌟 <strong>User-Friendly Design:</strong> The app features a simple and user-friendly design. With intuitive navigation, everyone can easily enjoy the castle tour.</Typography>
                                </ListItem>
                            </List>

                            <Typography variant="body1">
                                Start a new adventure and immerse yourself in the beauty and history of Japan's castles. The Japanese Castle Map invites you to a fantastic journey through history.
                            </Typography>

                        </Stack>
                    }
                </Box>

                {(!lang)?
                    <>
                        <Stack spacing={2} direction="column">
                            <Button startIcon={<MapIcon/>} variant="outlined" size="large"
                                    href={"/JapanCastleMap/map"}>地図で調べる</Button>
                            <Button startIcon={<TableRowsIcon/>} variant="outlined" size="large"
                                    href={"/JapanCastleMap/list"}>城の一覧を表示</Button>
                        </Stack>
                        <Paper sx={{mt: 5, p: 2, backgroundColor: "#eeeeee"}}>
                            <Stack spacing={2} direction="column">
                                <Typography variant="body1" gutterBottom sx={{fontSize: 11}}>
                                    ＜原典情報＞<br/>
                                    当サイトは以下の情報を利用させていただいております。<br/>
                                    <br/>
                                    ■ 城の位置情報<br/>
                                    <a target="_blank"
                                       href="https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E3%81%AE%E5%9F%8E%E4%B8%80%E8%A6%A7">ウィキペディア:日本の城一覧</a><br/>
                                    <br/>
                                    ■ 郡、国の境界<br/>
                                    <a target="_blank"
                                       href="https://booth.pm/ja/items/3053727">郡地図研究会 / 郡地図</a><br/>
                                    <br/>
                                    ■ 昔の地名<br/>
                                    <a target="_blank"
                                       href="https://geonlp.ex.nii.ac.jp/dictionary/geoshape-nrct/">『日本歴史地名大系』地名項目データセット地名辞書</a><br/>
                                    <br/>
                                    ＜注意事項＞<br/>
                                    2023年1月時点で取得した情報を掲載しております。<br/>
                                    ※当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますので、ご了承ください。
                                </Typography>
                            </Stack>
                        </Paper>
                    </>
                    :
                    <>
                        <Stack spacing={2} direction="column">
                            <Button startIcon={<MapIcon/>} variant="outlined" size="large"
                                    href={"/JapanCastleMap/map/en/"}>Explore on the Map</Button>
                            <Button startIcon={<TableRowsIcon/>} variant="outlined" size="large"
                                    href={"/JapanCastleMap/list/en/"}>Display List of Castles</Button>
                        </Stack>
                        <Paper sx={{mt: 5, p: 2, backgroundColor: "#eeeeee"}}>
                            <Stack spacing={2} direction="column">
                                <Typography variant="body1" gutterBottom sx={{fontSize: 11}}>
                                    ＜Original source information＞<br/>
                                    ■ Location of the Castle<br/>
                                    <a target="_blank"
                                       href="https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E3%81%AE%E5%9F%8E%E4%B8%80%E8%A6%A7">Wikipedia: List of Castles in Japan</a><br/>
                                    <br/>
                                    ■ National Boundaries<br/>
                                    <a target="_blank"
                                       href="https://booth.pm/ja/items/3053727">郡地図研究会 / 郡地図</a><br/>
                                    <br/>
                                    ＜precautions＞<br/>
                                    - Information obtained as of January 2023.<br/>
                                    - Please note that we are not responsible for any damages or other losses caused by the content of this website.
                                </Typography>
                            </Stack>
                        </Paper>
                    </>
                }

            </Container>
        </>
    );
}