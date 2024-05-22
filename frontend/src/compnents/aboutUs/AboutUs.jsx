import React from 'react';
import Navbar from '../navbar/Navbar';

const AboutUs = () => {
  return (
    <>
    <Navbar />
    <section class="bg-gray-900 mt-20 h-screen w-screen">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400 mt-24">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">MEET THE TEAM!</h2>
            <p class="mb-4">
            Hello everyone,

I'm Manan Hingorani, currently in my third year at Netaji Subhas University of Technology. 
My passion lies in Machine Learning, the MERN Stack, and I've developed numerous projects in these domains.
 Additionally, I have a keen interest in Competitive Programming, with profiles available on LinkedIn. <br></br>
 <br></br>
 I am a third-year student pursuing Information Technology at Indira Gandhi Delhi Technical University for Women. 
 I am currently developing my basics and DSA skills in C++ and python, along with working on Machine Learning and Artificial Intelligence.
                </p>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-24">
            <img class="w-full rounded-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhF_yha2uIHNK0ASOVl9-YSjO3GxRURLJDrVkDRptLOQ&s" alt="office content 1" />
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://media.licdn.com/dms/image/D4D03AQHNveWmqg3ScA/profile-displayphoto-shrink_800_800/0/1691382068333?e=2147483647&v=beta&t=xWKGao8_bC1HZNz9YaBXG_qTXpv6vb7Vtcu7oNVkGYc" alt="office content 2" />
        </div>
    </div>
</section>
</>
  )
}

export default AboutUs;