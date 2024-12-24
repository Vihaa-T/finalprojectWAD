import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  // State to store user data fetched from the API
  const [userData, setUserData] = useState(null);
  // State to handle errors that may occur during data fetching
  const [error, setError] = useState(null);
  // State to handle loading state while fetching user data
  const [isLoading, setIsLoading] = useState(true);
  // Router object to handle navigation
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (!token) {
      // If no token is found, redirect the user to the login page
      router.push('/loginpage'); // Redirect to login if no token is found
    } else {
      // If token exists, fetch user data
      fetchUserData(token);
    }
  }, [router]); // Dependency on router to re-run when router changes

  /**
   * Fetches user data from the server using the provided token.
   * @param {string} token - The authentication token from localStorage.
   */
  const fetchUserData = async (token) => {
    try {
      setIsLoading(true); // Set loading to true while fetching data
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Send token as a Bearer token in the Authorization header
        },
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        // If the response is successful, set the user data in state
        setUserData(data); // Set the user data if successful
        setIsLoading(false); // Set loading to false once data is fetched
      } else {
        // If the response is not successful, set an error message and redirect to login
        setError(data.message || 'An error occurred while fetching data'); // Set error if something goes wrong
        setIsLoading(false); // Set loading to false
        router.push('/loginpage'); // Redirect to login if error occurs
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error(error);
      setError('Failed to fetch user data. Please try again later.'); // Set a generic error message
      setIsLoading(false); // Set loading to false
      router.push('/loginpage'); // Redirect to login in case of failure
    }
  };

  // Render the component
  return (
    <div>
      {error && <p>{error}</p>} {/* Display error message if exists */}
      {isLoading ? (
        <p>Loading...</p> // Display loading message while data is being fetched
      ) : (
        userData && (
          <div>
            <h1>Welcome, {userData.name}</h1>
            <p>Email: {userData.email}</p>
            {/* You can add other user data here */}
          </div>
        )
      )}
    </div>
  );
};

export default Dashboard;
