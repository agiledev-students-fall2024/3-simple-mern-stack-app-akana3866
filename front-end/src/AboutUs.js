import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Fetches and displays about us data from an API endpoint.
 * @param {*} props Component properties
 * @returns JSX element
 */
const AboutUs = props => {
  const [abtInfo, setData] = useState(null);
  const [error, setError] = useState('');
  const [isloaded, setisLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about-us`);
        setData(response.data);
        setisLoaded(true);
      } catch (err) {
        setError('Error loading About Us content.');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!isloaded) {
    return <div>Waiting for data...</div>; 
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="AboutUs">
      <h1>{abtInfo ? abtInfo.title : 'Sorry this is taking a while.'}</h1>
      <p>{abtInfo ? abtInfo.description : 'Please wait, loading some cool stuff about me :)'}</p>
      <img src={abtInfo ? abtInfo.imageURL : '#'} alt="About Us" className="about-img" />
    </div>
  );
};

export default AboutUs;
