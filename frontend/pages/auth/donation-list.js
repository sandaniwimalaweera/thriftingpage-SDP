import { useEffect, useState } from "react";
import axios from "axios";

export default function DonationList() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/donations")
      .then(response => setDonations(response.data))
      .catch(error => console.error("Error fetching donations:", error));
  }, []);

  return (
    <div>
      <h1>Donations</h1>
      <ul>
        {donations.map((donation) => (
          <li key={donation.id}>
            <strong>{donation.productName}</strong> - {donation.donor_name} ({donation.donor_email})
          </li>
        ))}
      </ul>
    </div>
  );
}
