import React from "react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
const About = () => {
  const teamMembers = [
    {
      name: "MD Abdul Momin Sheikh",
      role: "Project Manager, Developer 1",
      github: "https://github.com/your-github",
      linkedin: "https://linkedin.com/in/your-linkedin",
      website: "https://yourwebsite.com"
    },
    {
      name: "Tonmoy",
      role: "Developer 2",
      github: "https://github.com/tonmoy",
      linkedin: "https://linkedin.com/in/tonmoy",
      website: "https://tonmoysite.com"
    },
    {
      name: "Tur Mohammad Mubtasim",
      role: "Developer 3",
      github: "https://github.com/mubtasim",
      linkedin: "https://linkedin.com/in/mubtasim",
      website: "https://mubtasimsite.com"
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-black p-6 mt-10">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 rounded-2xl p-4 flex flex-col items-center text-center backdrop-blur-md shadow-md hover:scale-105 transition-transform"
          >
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-sm mb-2">{member.role}</p>
            <div className="flex space-x-4 text-xl">
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href={member.website} target="_blank" rel="noopener noreferrer">
                <FaGlobe />
              </a>
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default About;
