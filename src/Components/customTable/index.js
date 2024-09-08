import React, { useEffect, useState } from 'react';
import './index.scss'

const CustomTable = ({ headers, data, onDelete, onView, onEdit }) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    {
                        (onDelete||onView||onEdit) && <th>Actions</th>
                    }
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                        {
                            <td>
                            {onView &&<i class="fa-solid fa-eye fa-sm action-icon" onClick={onView}></i>}
                            {onEdit &&<i class="fa-solid fa-pen-to-square fa-sm action-icon" onClick={onEdit}></i>}
                            {onDelete &&<i class="fa-solid fa-trash fa-sm action-icon" onClick={()=>onDelete(row[0])}></i>}
                            </td>
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomTable;
