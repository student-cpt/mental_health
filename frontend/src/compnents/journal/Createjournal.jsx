import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/solid';
import axios from 'axios';


const Createjournal = () => {
    const [formData, setFormData] = useState({
        title: '',
        article: '',
        tags: []
    });

    const [coverPicture, setCoverPicture] = useState(null);

    const { username } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setCoverPicture(e.target.files[0]);
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            article: '',
            tags: []
        });
        setCoverPicture(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            const formDataWithFile = new FormData();
            for (const key in formData) {
                if (key === 'tags') {
                    formDataWithFile.append(key, JSON.stringify(formData[key]));
                } else {
                    formDataWithFile.append(key, formData[key]);
                }
            }
            if (coverPicture) {
                formDataWithFile.append('coverPicture', coverPicture);
            }

            const response = await axios.post(`http://localhost:8000/${username}`, formDataWithFile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'method': 'POST'
                }
            });

            if (!response) {
                throw new Error('Network response was not ok');
            }
            else{
                console.log('Journal successful:', response.data);
                navigate(`/${username}/profile`);
            }

            
        } catch (error) {
            console.error('Error creating journal:', error);
        }
    };


    return (
        <div>
            <div className="px-4 sm:px-6 lg:px-8 pt-20 bg-gradient-to-r from-zinc-50 to-red-100">
                <form className='max-w-3xl mx-auto' onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 text-center mb-8">Create your journal!</h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 col-span-full">
                                <div className="col-span-full">
                                    <label htmlFor="coverPicture" className="block text-sm font-medium leading-6 text-gray-900">Cover Photo</label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="coverPicture" type="file" onChange={handleFileChange} className="sr-only" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="Your journal title"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="article" className="block text-sm font-medium leading-6 text-gray-900">
                                        Your Journal
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="article"
                                            name="article"
                                            rows={10}
                                            value={formData.article}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Write your journal here..."
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Express yourself!</p>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">
                                        Tags
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="tags"
                                                id="tags"
                                                value={formData.tags.join(', ')} // Join array to string for display
                                                onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(', ').map(tag => tag.trim()) })} // Split string back to array
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="e.g., travel, food, lifestyle"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-x-6">
                        <button onClick={handleCancel} type="button" className="text-lg font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Createjournal;


