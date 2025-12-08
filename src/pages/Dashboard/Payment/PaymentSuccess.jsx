import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure()
  const sessionId = searchParams.get("session_id");
  // console.log(sessionId)
  useEffect(() => {
    axiosSecure.post(`/payment-success`, {sessionId})
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h1>Payment Success</h1>
    </div>
  );
};

export default PaymentSuccess;