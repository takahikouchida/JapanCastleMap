import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import MapPage from './Pages/MapPage.js';
import TopPage from './Pages/TopPage.js';
import ListPage from './Pages/ListPage.js';

import './index.css';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter(
    [
        {
            path: '/map/',
            element: <MapPage lang={"ja"}/>,
        },
            {
            path: '/map/:lang',
            element: <MapPage />,
        },
        {
            path: '/map/:lang/:CastleName',
            element: <MapPage />,
        },
        // {
        //     path: '/map/:CastleName',
        //     element: <MapPage />,
        // },
        // {
        //     path: '/map/:CastleName/:lang',
        //     element: <MapPage />,
        // },
        {
            path: '/',
            element: <TopPage />,
        },
        {
            path: '/:lang',
            element: <TopPage />,
        },
        // {
        //     path: '/top',
        //     element: <TopPage />,
        // },
        {
            path: '/list',
            element: <ListPage />,
        },
        {
            path: '/list/:lang',
            element: <ListPage />,
        },

    ],
    {
        basename: '/JapanCastleMap',
    }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();
