import React from 'react';
import Head from 'next/head'; // Import Head component for managing the document head
import AboutPage from '../styles/AboutPage.module.css'; // Import custom CSS for styling


/**
 * AboutPage Component
 * This page provides information about the project and the technologies used.
 * It includes links to the project repository, Next.js documentation, and Petfinder API.
 */

const aboutPage = () => {
	return (
		<div className={AboutPage.aboutSection}>
			<Head>
				<title>About Page</title>
				<meta
					name="keywords"
					content="pet adoption, adopt-a-pet, petfinder"
				/>
			</Head>
			<p>
				<a href="https://github.com/FHSS-USJ/final-assessment-group-8">
					 Adopt-A-Pet by Group 8
				</a>
			</p>
			<p>
				<a href="https://nextjs.org/">Created with Next.js</a>
			</p>
			<p>
				<a href="https://www.petfinder.com/developers/">
					Content from Petfinder&apos;s API
				</a>
			</p>
		</div>
	);
};
export default aboutPage;
