import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { petfinderUrls } from '../../../URLs/petfinderurls';
import { PetFinderAuthContext } from '../../_app';
import IndividualAnimalCarousel from '../../../components/carouselComponents/IndividualAnimalCarousel';
import DisplayOrgContactInformation from '../../../components/pageComponents/organizationPageComponents/DisplayOrgContactInformation';
import pageStyles from '../../../styles/IndividualAnimalPage.module.css';
import ShelterInputField from '../../../components/userInputs/ShelterInputField';

const OrganizationID = () => {
	const token = useContext(PetFinderAuthContext);
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [result, setResult] = useState([]);
	const organizationId = router.query.organizationID;

	// Function to decode HTML entities
	const htmlDecode = (content) => {
		let div = document.createElement('div');
		div.innerHTML = content;
		return div.childNodes.length === 0 ? '' : div.childNodes[0].nodeValue;
	};

	// UseEffect to fetch data when the token or organizationId changes
	useEffect(() => {
		if (!token || !organizationId) return; // Ensuring that token and organizationId are available

		const fetchShelters = async () => {
			try {
				const shelterData = await fetch(
					`${petfinderUrls.organization}${organizationId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`, // Use the token for authorization
						},
					}
				);

				const shelterDataJson = await shelterData.json();
				setResult(shelterDataJson.organization); // Set the data from the API response
				setIsLoading(false); // Once data is fetched, set loading to false
			} catch (error) {
				console.error(error); // Log any errors
			}
		};

		fetchShelters();
	}, [token, organizationId]); // Dependencies: token and organizationId

	// Render the component when loading is complete
	if (!isLoading) {
		return (
			<section className={pageStyles.animalContainer}>
				<ShelterInputField />
				<div>
					<h1
						dangerouslySetInnerHTML={{
							__html: htmlDecode(result.name),
						}}
					/>
					<p
						dangerouslySetInnerHTML={{
							__html: htmlDecode(result.mission_statement),
						}}
					/>
					<IndividualAnimalCarousel result={result} />
				</div>
				<h2>Contact information:</h2>
				<DisplayOrgContactInformation result={result} />
				<div className={pageStyles.internalLink}>
					<Link
						href={{
							pathname: `/animals/[animalParams]`,
							query: {
								organization: `${result.id.toLowerCase()}`,
							},
						}}
					>
						<a className={`${pageStyles.internalLink} ${pageStyles.btn}`}>
							View animals at {result.name}
						</a>
					</Link>
					<a
						className={`${pageStyles.internalLink} ${pageStyles.btn}`}
						href={result.url}
					>
						View this organization on Petfinder
					</a>
				</div>
			</section>
		);
	}

	// Show loading indicator while data is being fetched
	return <p>Loading...</p>;
};

export default OrganizationID;
