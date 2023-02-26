import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavigationBar from './NavigationBar'

function ProfileUpload() {
    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [relativePath, setRelativePath] = useState('')
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const navigate = useNavigate()

    async function handleFormSubmit(event) {
        event.preventDefault()
        const data = {
            name: username,
            location: location,
            likes: 0,
            description: description,
            PostImage: relativePath,
            date: date
        }
        try {
            const response = await fetch('https://arpit-singh22.github.io/jsonapi/data.json/user', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (response.ok) {
                // Reset the form inputs in success
                setUsername('')
                setLocation('')
                setDescription('')
                setRelativePath('')
                setDate(new Date().toISOString().slice(0, 10))
                // Navigate to the PostView page after successful upload
                navigate('/post-view')
            } else {
                alert('Error uploading data')
            }
        } catch (error) {
            console.log(error.message)
            alert('Error uploading data')
        }
    }

    function handleFileChange(event) {
        const file = event.target.files[0]
        setRelativePath(file.webkitRelativePath)
    }

    function handleUsername(event) {
        setUsername(event.target.value)
    }

    function handlelocation(event) {
        setLocation(event.target.value)
    }

    function handledescription(event) {
        setDescription(event.target.value)
    }

    return (
        <>
            <NavigationBar />
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="image">
                    <input
                        type="text"
                        className="upload-path"
                        value={relativePath}
                        readOnly
                    />
                    <input
                        className="upload-image"
                        type="file"
                        accept="image/*"
                        id="image"
                        onChange={handleFileChange}
                    />
                </label>

                <label htmlFor="username">
                    <input
                        className="upload-name"
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsername}
                        placeholder="Username"
                    />
                </label>
                <label htmlFor="location">
                    <input
                        className="upload-location"
                        type="text"
                        id="location"
                        value={location}
                        onChange={handlelocation}
                        placeholder="Location"
                    />
                </label>
                <label htmlFor="description">
                    <input
                        className="upload-desc"
                        type="text"
                        id="description"
                        value={description}
                        onChange={handledescription}
                        placeholder="Description"
                    />
                </label>
                <button className="upload-btn" type="submit">
                    Post
                </button>
            </form>
        </>
    )
}

export default ProfileUpload
