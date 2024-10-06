import React, { useState } from 'react';
import './BottomSheet.css'; // スタイリングのためのCSSファイルをインポート


const BottomSheet = ({isOpen, onClose}) => {

    return (
        <div>
            {isOpen && (
                <div className={`bottom-sheet ${isOpen ? 'show' : ''}`}>
                    <div className="bottom-sheet-content">
                        <h2>Bottom Sheet Content</h2>
                        <p>Add your content here.</p>
                        <button onClick={onClose}>Close Bottom Sheet</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BottomSheet;
