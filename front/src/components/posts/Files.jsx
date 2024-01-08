import React from "react";

export default function Files({ files }) {
    return (
        <>
            <hr/>
            <h6 className="ms-2 text-secondary">Автор поделился файлами:</h6>
            <ul>
                {files.map((file, index) => <li key={index}><a
                    href={`http://localhost:8080/download?filename=${file.file_path}`}>{file.filename}</a></li>)}
            </ul>
        </>
    )
}