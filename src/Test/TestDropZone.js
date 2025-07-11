import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

function TestDropZone() {
  const onDrop = useCallback(acceptedFiles => {
    // console.log(acceptedFiles);
    setShowFile(prevVal => prevVal = acceptedFiles[0].name);
  }, [])

  const [ShowFile, setShowFile] = useState('');
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }    
      {
          ShowFile == '' ? '' : <b>Dropped File Is: { ShowFile }</b>
      }
    </div>
  )
}

export default TestDropZone