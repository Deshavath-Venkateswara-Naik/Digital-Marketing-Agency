import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import api from '../../config';
import { ClipLoader } from 'react-spinners';
import './Services.css';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [serviceDetails, setServiceDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${api}/services/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setServiceDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching service details:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="services-item-details-container min-vh-100 text-center">
      <ClipLoader color="#36D7B7" loading={loading} css={override} size={100} />

      {!loading && (
        <>
          <div className="services-details-card-container m-4">
            <h1 className="services-details-card-heading">{serviceDetails.title}</h1>
            <p className="services-details-card-para p-4">{serviceDetails.description}</p>
          </div>

          <div className="request-container-services m-5">
            <h1 className="request-heading-services m-3">Request a free consultation!</h1>
            <div className="request-services-button-container p-3">
              <button type="button" className="btn btn-contact btn-pill btn-blue btn-lg">
                GET IN TOUCH
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceDetailsPage;
