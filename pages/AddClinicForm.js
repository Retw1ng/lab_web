import React, { useState } from 'react';
import axios from 'axios';

const AddClinicForm = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/clinics', { name, location });
            alert('Ветеринарная клиника успешно добавлена!');
            setName(name);
            setLocation(location);
        } catch (error) {
            console.error('Ошибка при добавлении ветеринарной клиники:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Название клиники:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Местоположение клиники:
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Добавить клинику</button>
        </form>
    );
};

export default AddClinicForm;