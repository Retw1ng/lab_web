import React, { useEffect, useState } from 'react';
import Mapp from './Map';
import AddClinicForm from './AddClinicForm';
import axios from 'axios';

export default function Home() {
    const apiKey = 'c8e6b5c9-a3f4-4661-b3cf-19a98a30f154';
    const [clinics, setClinics] = useState([]);

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const response = await axios.get('/api/clinics');
                setClinics(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке данных о клиниках:', error);
            }
        };
        fetchClinics();
    }, []);

    return (
        <div>
            <h1 style={{paddingLeft:'400px'}}>Ветеринарные клиники</h1>
            <Mapp apiKey={apiKey} clinics={clinics}/>
        </div>
    );
}