import Paper from '@mui/material/Paper';
import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import Map from "../components/Map";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { useLocation } from 'react-router-dom';
import {Helmet} from "react-helmet";


export default function MapPage(props) {
    const { lang } = useParams();
    const { CastleName } = useParams();


    const location = useLocation();
    const params = new URLSearchParams(location.search);
//    const CastleName = params.get('castle');
    console.log(CastleName);
    console.log(lang);

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={(lang !== "ja") ? `${CastleName}の表示をします。３D表示にして地形を知ろう。付近を探索し旅行計画を立てませんか？。`
                        : `View ${CastleName} in 3D and get to know the topography. Want to explore the vicinity and plan your trip?`}
                />
                <meta name="keywords"
                      content={(lang !== "ja") ? `${CastleName}のインタラクティブな城地図`
                          :`Interactive castle map of ${CastleName}`}
                />
            </Helmet>
            <PrimarySearchAppBar lang={lang}/>
            <Paper lg={12} sm={12} md={12} sx={{mt: 0,mb:0,pl:0, height: "calc(100% - 64px)",position: "relative"}}>
                <Map CastleName={CastleName} lang={lang}/>
            </Paper>
        </>
    );
}