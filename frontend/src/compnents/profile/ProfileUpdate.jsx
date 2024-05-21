import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/solid';

export default function ProfileUpdate() {
  const [formData, setFormData] = useState({
    password: '',
    name: '',
    email: '',
    gender: '',
    bio: '',
    age: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams(); // Get username from URL parameter

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithFile = new FormData();
      for (const key in formData) {
        formDataWithFile.append(key, formData[key]);
      }
      if (profilePicture) {
        formDataWithFile.append('profilePicture', profilePicture);
      }

      const response = await fetch(`http://localhost:8000/${username}/update-user`, {
        method: 'PUT',
        body: formDataWithFile,
      });
      const data = await response.json();
      console.log('Profile update successful:', data);
      navigate(`/${username}/profile`); // Redirect to profile page after update
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      password: '',
      name: '',
      email: '',
      gender: '',
      bio: '',
      age: '',
    });
    setProfilePicture(null);
  };

    return (
        <div>
            <div className="px-4 sm:px-6 lg:px-8 pt-20 bg-gradient-to-r from-zinc-50 to-red-100">
                <form onSubmit={handleSubmit} className='max-w-3xl mx-auto'>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 text-center mb-8">Signup</h2> {/* Center align and increase font size */}

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 col-span-full">
                            <div className="col-span-full">
                                    <label htmlFor="profilePicture" className="block text-sm font-medium leading-6 text-gray-900">Profile Picture</label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="profilePicture" type="file" onChange={handleFileChange} className="sr-only" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                autoComplete="current-password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                                        About
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            rows={3}
                                            value={formData.bio}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="given-name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                                        Gender
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="gender"
                                            name="gender"
                                            autoComplete="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Non Binary">Non Binary</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                                        Age
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="age"
                                            id="age"
                                            autoComplete="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-x-6"> {/* Center align the buttons */}
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
    )
}
