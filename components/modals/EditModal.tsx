import useCurrentUser from '@/hooks/useCurrentUser'
import React, { useCallback, useEffect, useState } from 'react'
import useUser from '@/hooks/useUser'
import useEditModal from '../../hooks/useEditModal'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Modal from '../Modal'
import Input from '../Input'
import ImageUpload from '../ImageUpload'

const EditModal = () => {
    const { data: currentUser } = useCurrentUser()
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id)
    const editModal = useEditModal()
    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio)
    }, [currentUser?.profileImage, currentUser?.coverImage, currentUser?.name, currentUser?.bio, currentUser?.username])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            })

            mutateFetchedUser()

            toast.success('Updated')

            editModal.onClose()
        } catch (err) {
            toast.error("Something went wrong.")
        } finally {
            setIsLoading(false)
        }
    }, [name, username, bio, profileImage, coverImage, mutateFetchedUser, editModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload
                onChange={(image) => setProfileImage(image)}
                value={profileImage}
                disabled={isLoading}
                label="Upload profile image"
            />
            <ImageUpload
                onChange={(image) => setCoverImage(image)}
                value={coverImage}
                disabled={isLoading}
                label="Upload cover image"
            />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edit Your Profile"
            actionLabel='Save'
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default EditModal